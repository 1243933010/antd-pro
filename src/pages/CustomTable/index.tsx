
import { Button, message, Table, Form, Input, DatePicker, Select,Row,Col } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import type { FormInstance } from 'antd/es/form';
import moment from 'moment';
import {workLabel} from '@/services/ant-design-pro/api'
interface DataType {
    key: React.Key;
    time: string;
    workType: number;
    label: string;
    description: string;
}
const { RangePicker } = DatePicker;
const columns: ColumnsType<DataType> = [
    { title: '时间', dataIndex: 'time', key: 'time' },
    { title: '类型', dataIndex: 'workType', key: 'workType' },
    { title: '标签', dataIndex: 'label', key: 'label' },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <a>查看</a>,
    },
];
const data: DataType[] = [
    {
        key: 1,
        time: 'John Brown',
        workType: 32,
        label: 'New York No. 1 Lake Park',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    }
];
// const [form] = Form.useForm();

const labelOptionList = [
    { value: '1', label: '类型1' }
]

const getTagList = async()=>{
    let data = await workLabel();
    console.log(data)
}


export default () => {
    const formRef = React.useRef<FormInstance>(null);
   const [workType,setWorkType ] = useState('1');
    const onFinish = (values: any) => {
        console.log(values,formRef);
        const {time,mounthTime,...value} = values;
        const timeDta = time?[moment(time[0]||'').format('YYYY-MM-DD'),moment(time[1]||'').format('YYYY-MM-DD')]:[]
        const mounthTimeData = moment(mounthTime).format('YYYY-MM')
        console.log({time:timeDta,mounthTime:mounthTimeData,value})
    };
    
useEffect(()=>{

},[])
    const changeWorkType = (e: string)=>{
        setWorkType(e);
    }
    return (
        <div>
            <Form
                layout='inline'
                ref={formRef}
                name="control-ref"
                onFinish={onFinish}
                initialValues={{workType:'周任务'}}
            >
                <Form.Item name="workType" label="任务类型" >
                    <Select
                        style={{width:180}}
                        options={[{ value: '1', label: '周任务' }, { value: '2', label: '月任务' }]}
                        onChange={changeWorkType}
                    />
                </Form.Item>
               {
                workType=='2'&&<Form.Item name="mounthTime" label="月份" >
                <DatePicker picker="month" />
              </Form.Item>
               }
             {
                workType=='1'&&<Form.Item name="time" label="时间段" >
                <RangePicker />
            </Form.Item>
             }
                
                <Form.Item name="workLabel" label="label类型"  >
                    <Select
                        placeholder="请选择"
                        style={{width:180}}
                        options={[{ value: '1', label: '类型1' }, { value: '2', label: '类型2' }]}
                    />
                </Form.Item>
                <Form.Item>
                  <Button>新增任务</Button>
                </Form.Item>
                <Form.Item >
                  <Button type='primary' htmlType="submit">搜索</Button>
                </Form.Item> 
            </Form>
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                    rowExpandable: (record) => record.time !== 'Not Expandable',
                }}
                dataSource={data}
            />
        </div>
    );
};