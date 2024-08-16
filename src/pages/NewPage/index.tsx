import React, { useEffect, useState } from 'react';
import { Line } from '@ant-design/charts';
// import { useModel } from '@/.umi/plugin-model';
import { useModel } from 'umi'
import { InputNumber, Select, Button, Modal, message, Divider, Table, Popconfirm } from 'antd';
import styles from './index.less'
import { echartList, echartType, echartDelete } from '@/services/ant-design-pro/api'
import AddPage from './add'
import { TableDetail } from './interface'
import { echartAdd ,echartEdit} from '@/services/ant-design-pro/api'
import dayjs from 'dayjs';
import LineCom from './LineCom';

const tableType = ['', '私服人数变化', 'gs人数变化', '体重变化']
const NewPage: React.FC = () => {
  const columns: any = [
    {
      title: '时间', dataIndex: 'time', key: 'time', render: (text: any) => {
        return <span>{text}</span>
      }
    },
    { title: '类型', dataIndex: 'type', key: 'type', render: (text: any) => <span>{tableType[text]}</span> },
    { title: '主数据', dataIndex: 'masterNum', key: 'masterNum', render: (text: any) => <span>{text}</span> },
    { title: '副数据', dataIndex: 'devNum', key: 'devNum', render: (text: any) => <span>{text}</span> },
    { title: '主数据备注', dataIndex: 'masterName', key: 'masterName', render: (text: any) => <span>{text}</span> },
    { title: '副数据备注', dataIndex: 'devName', key: 'devName', render: (text: any) => <span>{text}</span> },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (e: TableDetail) => <div>
        <Button size='small' onClick={() =>addData('edit',e)} type="primary">编辑</Button>
        <Divider type="vertical" />
        <Popconfirm
          title="提示"
          description="确定要删除该数据吗?"
          onConfirm={() => deleteItem(e)}
          okText="Yes"
          cancelText="No"
        >
          <Button size='small' type="primary">删除</Button>
        </Popconfirm>

      </div>,
    },
  ];
  // const { counter, setNumber } = useModel('inputNumber');  //在单个页面设置的全局响应式变量
  // setNumber(1)
  const { initialState } = useModel('@@initialState')  //在app.tsx里面设置的全局函数以及变量
  const [type, setType] = useState<number | undefined>(1)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const childRef = React.useRef<any>(null);
  const lineRef = React.useRef<any>(null);
  const [dialogType, setDialogType] = useState<string>('add')
  const [pageData, setPageData] = useState({
    pageSize: 10,
    current: 1
  })
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)


  useEffect(() => {
    getEchartList(undefined)
  }, [])


  const deleteItem = async (e: TableDetail) => {
    console.log(e)
    let result = await echartDelete(e.id)
    message.info(({ content: result.message }));
    if(result.code===0){
      getEchartList(type);
    }
  }

  const getEchartList = async (num: number | undefined) => {
    let types = undefined;
    if (num) {
      types = num;
    }
    let result = await echartType(types);
    if (result.code !== 0) {
      message.error(({ content: '数据请求异常' }));
      return
    }
    let data = await echartList({ type: types });
    if (data.code === 0) {
      data.data.forEach((val: TableDetail, index: number) => {
        val.key = val.id;
        if (num) {
          val.masterName = result.data.masterName;
          val.devName = result.data.devName;

        }
        for (let i = 0; i < result.data.length; i++) {
          if (result.data[i].typeId == val.type) {
            val.masterName = result.data[i].masterName;
            val.devName = result.data[i].devName;
            break;
          }
        }
      })
      setData(data.data)
      // console.log(data.data,'--')
    }

  }
  const onChange = (e: number | undefined) => {
    // console.log(e)
    setType(e);
    getEchartList(e);
    setPageData({
      pageSize: 10,
      current: 1
    })
  }
  const handleOk = async () => {
    let data = childRef.current?.getFormData()
    console.log(data);
    let result;
    if(data.id){
      let {id,...obj} = data;
       result = await echartEdit(id,obj);
    }else{
       result = await echartAdd(data);
    }
    
    console.log(result);
    if (result.code === 0) {
      message.success({ content: result.message })
      setIsModalOpen(false);
      getEchartList(undefined)
      return
    }
    message.error({ content: result.message })
  }

  const addData = (type: string,e:TableDetail|undefined) => {
    setIsModalOpen(true)
    setDialogType(type);
   setTimeout(()=>{
    childRef.current?.resetData(e);
   },0)
  }

  const modalCancel = ()=>{
    childRef.current?.resetData(undefined);
    setIsModalOpen(false)
  }

  return (
    <div>
      {/* <InputNumber min={1}   defaultValue={counter}   onChange={onChange} />
      <div className={styles.globalText}>全局数据：{counter}</div> */}
      {/* <div className={styles.px}>px尺寸</div>
      <div className={styles.rem}>rem尺寸</div>
      <div className={styles.vw}>vw尺寸</div> */}


      <Select
        style={{ width: 180 }}
        options={[{ value: 1, label: '私服人数变化' }, { value: 2, label: 'gs人数变化' }, { value: 3, label: '体重变化' }]}
        allowClear
        defaultValue={type}
        onChange={onChange}
        placeholder='任务类型'
      />
      <Button type='primary' onClick={() => addData('add',undefined)} style={{ marginLeft: 10 }}>新建</Button>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: pageData.pageSize, // 每页显示条目数
          total: total, // 总条目数
          showSizeChanger: true, // 显示可调整每页显示条目数
          showQuickJumper: true, // 显示快速跳转到某页
        }}

      />

      <LineCom type={type} data={data} ref={lineRef} />
      <Modal title={dialogType == 'add' ? '添加' : "编辑"} open={isModalOpen} onOk={handleOk} onCancel={modalCancel}>
        <AddPage ref={childRef} titleText={dialogType} />
      </Modal>
    </div>
  )
};
export default NewPage;