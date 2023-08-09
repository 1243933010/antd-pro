import React, { useEffect, useState } from 'react';
import { Button, message, Table, Form, Input, DatePicker, Select, Row, Col, Modal, Tag,Pagination } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { FormInstance } from 'antd/es/form';
import { TablePaginationConfig } from 'antd/lib/table/interface';
import { DataType } from '../CustomTable/interface';
import AddForm from './addForm'


const MaterialLibrary: React.FC = () => {
    const formRef = React.useRef<FormInstance>(null);
    const childRef = React.useRef<any>(null);
    const [materialLibrary, setMaterialLibrary] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dialogType, setDialogType] = useState('classification');
    const [data, setData] = useState([])
    const onFinish = (values:FormInstance) => {
       console.log(values)
    };
    
    useEffect(() => { }, [])
    const handleOk = async () => {
        
    }
    const openDialog=(type:string)=>{
        setDialogType(type);
        setIsModalOpen(true);
    }
    const getData = async (data?: object) => {   //获取table数据
       
    }
    const listenClassification = ()=>{
        
    }
    return (
        <div>
            <Form
                layout='inline'
                ref={formRef}
                name="control-ref"
                onFinish={onFinish}
                
            >
                {/* initialValues={{ workType: '1' }} */}
                <Form.Item name="materialLibrary" label="素材分类" >
                    <Select
                        style={{ width: 180 }}
                        options={[{ value: '1', label: '周任务' }, { value: '2', label: '月任务' }]}
                        onChange={(e) => setMaterialLibrary(e)}
                        allowClear
                        placeholder='选择分类'
                    />
                </Form.Item>
                <Form.Item>
                    <Button onClick={() => openDialog('classification')}>新增分类</Button>
                </Form.Item>
                <Form.Item>
                    <Button onClick={() => openDialog('upload')}>新增图片</Button>
                </Form.Item>
                <Form.Item >
                    <Button type='primary' htmlType="submit">搜索</Button>
                </Form.Item>
            </Form>
            <div></div>
            <Pagination defaultCurrent={6} total={500} />
            <Modal title={dialogType == 'classification' ? '添加分类' : "上传素材"} open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
                <AddForm ref={childRef} listenClassification={listenClassification} materialLibrary={dialogType} />
            </Modal>
            </div>
    )
}


export default MaterialLibrary;