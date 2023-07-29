
import { Button, message, Table, Form, Input, DatePicker, Select, Row, Col,Modal,Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import type { FormInstance } from 'antd/es/form';
import moment from 'moment';
import { workLabel,submitWork,getWork } from '@/services/ant-design-pro/api'
import AddPage from './add'
import { TablePaginationConfig } from 'antd/lib/table/interface';
import {DataType,DialogForm,TableType,TagType,SubmitType} from './interface'

const { RangePicker } = DatePicker;
const columns: ColumnsType<DataType> = [
    { title: '时间', dataIndex: '', key: 'time',render:(text)=>{
     return  text.startTime && text.endTime? <span>{text.startTime}-{text.endTime}</span>:<span>{text.mounthTime}</span>   
    }
},
    { title: '类型', dataIndex: 'workType', key: 'workType',render:(text)=><span>{text=='1'?"周任务":"月任务"}</span> },
    { title: '标签', dataIndex: 'tag', key: 'tag',render:(text)=> 
        text.map((item:TagType)=>(
            <Tag color={item.color} key={item.value} closeIcon >{item.value}</Tag>
        ))
    },

    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <a>查看</a>,
    },
];


export default () => {
    const formRef = React.useRef<FormInstance>(null);
    const childRef = React.useRef<any>(null);
    const [labelOptionList, setLabelOptionList] = useState<{color:string,tag:string,value:string}[]>([])
    const [workType, setWorkType] = useState('1');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [titleText,setTitleText] =useState('add');
    const [pageData,setPageData] = useState<TablePaginationConfig>({
        pageSize:12,
        current:1
    })
    const [data,setData] = useState([])
    const onFinish = (values: DataType) => {
        const { time, mounthTime, ...value } = values;
        let [startTime,endTime]:[string|undefined,string|undefined] = [undefined,undefined];
        if(time?.length){
            [startTime,endTime] = [moment(time[0]).format('YYYY-MM-DD')||'',moment(time[1]).format('YYYY-MM-DD')||''];
        }
        const mounthTimeData =mounthTime? moment(mounthTime).format('YYYY-MM'):undefined;
        getData({ startTime,endTime, mounthTime: mounthTimeData, ...value });
    };
    const getTagList = async () => {
        let data = await workLabel();
        setLabelOptionList(data.data);
    }
    useEffect(() => {
        getTagList();
        getData();
    }, [])

    const handleOk = async()=>{
        let forms:SubmitType = {
            workType: ''
        };
        childRef.current.handleSubmit((form:DialogForm)=>{forms = form;});
        forms.startTime = undefined;
        forms.endTime = undefined;
        if(forms.time?.length){
            [ forms.startTime, forms.endTime] = [moment(forms.time[0]).format('YYYY-MM-DD')||'',moment(forms.time[1]).format('YYYY-MM-DD')||'']
        }
        forms.mounthTime =forms.mounthTime?moment(forms.mounthTime).format('YYYY-MM'):undefined;
        delete forms.time;
        let data = await submitWork(forms);
        message.success({content:data.message})
        if(data.code===0){
            setIsModalOpen(false);
            childRef.current.clearForm()
        }
    }
    
    const getData = async(data?:object)=>{   //获取table数据
        // console.log(formRef.current?.getFieldsValue())
        let obj = {...pageData,...formRef.current?.getFieldsValue()}
        if(data){
            obj = {...pageData,...data};
        }
        let res = await getWork(obj);
        res.data.forEach((val:TableType)=>{
            val.key = val.id;
            val.tag =val.tag?JSON.parse(val.tag):'';
        })
        if(res.code===0){
            setData(res.data);
        }
    }
    const tableChange = (e:TablePaginationConfig)=>{  //分页被点击触发
        setPageData(e);
    }
    return (
        <div>
            <Form
                layout='inline'
                ref={formRef}
                name="control-ref"
                onFinish={onFinish}
                initialValues={{ workType: '1' }}
            >
                <Form.Item name="workType" label="任务类型" >
                    <Select
                        style={{ width: 180 }}
                        options={[{ value: '1', label: '周任务' }, { value: '2', label: '月任务' }]}
                        onChange={(e)=>setWorkType(e)}
                    />
                </Form.Item>
                {
                    workType == '2' && <Form.Item name="mounthTime" label="月份" >
                        <DatePicker picker="month" />
                    </Form.Item>
                }
                {
                    workType == '1' && <Form.Item name="time" label="时间段" >
                        <RangePicker />
                    </Form.Item>
                }

                <Form.Item name="tag" label="label类型"  >
                    <Select
                        mode="multiple"
                        style={{ width: 200 }}
                        optionLabelProp="tag" // 指定显示标签的字段名为 'tag'
                        placeholder="Select a severity level"
                        labelInValue={true}
                    >
                        {labelOptionList.map(item => (
                            <Select.Option key={item.value} value={item.tag}>
                                {item.tag}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button onClick={()=>setIsModalOpen(true)}>新增任务</Button>
                </Form.Item>
                <Form.Item >
                    <Button type='primary' htmlType="submit">搜索</Button>
                </Form.Item>
            </Form>
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender: (record) => 
                    <div style={{paddingLeft:30}}>
                        {
                            record.workList&& record.workList.map((val,index)=>(
                                <div>{index+1}、{val.value}</div>
                            ))
                        }
                    </div>,
                    rowExpandable: (record) => record.time !== 'Not Expandable',
                }}
                onChange={tableChange}
                dataSource={data}
                pagination ={{
                pageSize: pageData.pageSize, // 每页显示条目数
                total: data.length, // 总条目数
                showSizeChanger: true, // 显示可调整每页显示条目数
                showQuickJumper: true, // 显示快速跳转到某页
              }}
                
            />
             <Modal title={titleText=='add'?'添加任务':"编辑任务"}  open={isModalOpen} onOk={handleOk} onCancel={()=>setIsModalOpen(false)}>
                <AddPage ref={childRef}  labelOptionList={labelOptionList} titleText={titleText} />
             </Modal>
        </div>
    );
};