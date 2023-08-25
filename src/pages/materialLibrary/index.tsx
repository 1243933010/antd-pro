import React, { useEffect, useState } from 'react';
import { Button, message, Table, Form, Input, DatePicker, Select, Row, Col, Modal, Tag,Pagination } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { FormInstance } from 'antd/es/form';
import { TablePaginationConfig } from 'antd/lib/table/interface';
import { DataType } from '../CustomTable/interface';
import AddForm from './addForm'
import { imgClassificationList,imgClassificationAdd } from '@/services/ant-design-pro/api';

const MaterialLibrary: React.FC = () => {
    const formRef = React.useRef<FormInstance>(null);
    const childRef = React.useRef<any>(null);
    const [materialLibrary, setMaterialLibrary] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dialogType, setDialogType] = useState('classification');
    const [option,setOption] = useState([]);
    const [data, setData] = useState([])
    const onFinish = (values:FormInstance) => {
       console.log(values)
    };
    
    useEffect(() => {
        getLabel();
     }, [])
    const handleOk = async () => {
        let data = childRef.current?.callbackData();
        console.log(data);
        let result;
        if(dialogType==='classification'){
            if(!data.materialLibrary){
                message.error({content:'不能为空'})
                return
            }
            result = await imgClassificationAdd(data);
        }else{

        }
        console.log(result);
        if(result.code===0){
            message.success({content:result.message})
            setIsModalOpen(false);
            getLabel();
            return
        }
        message.error({content:result.message})
        
    }
    const openDialog=(type:string)=>{
        setDialogType(type);
        setIsModalOpen(true);
    }
    const getData = async (data?: object) => {   //获取table数据
       
    }
    const getLabel = async()=>{
        let data = await imgClassificationList();
        console.log(data);
        if(data.code ===0){
            setOption(data.data);
        }
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
                        options={option}
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
                <AddForm option={option} ref={childRef}  materialLibrary={dialogType} />
            </Modal>
            </div>
    )
}


export default MaterialLibrary;