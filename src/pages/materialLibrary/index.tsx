import React, { useEffect, useState } from 'react';
import { Button, message, Form, Select, Modal, Tag,Pagination } from 'antd';
import type { FormInstance } from 'antd/es/form';
import AddForm from './addForm'
import { imgClassificationList,imgClassificationAdd,addImg,getImg,delImg } from '@/services/ant-design-pro/api';
import './index.less'
import { DeleteTwoTone ,DeleteOutlined} from '@ant-design/icons';

const MaterialLibrary: React.FC = () => {
    const formRef = React.useRef<FormInstance>(null);
    const childRef = React.useRef<any>(null);
    const [materialLibrary, setMaterialLibrary] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dialogType, setDialogType] = useState('classification');
    const [option,setOption] = useState([]);
    const [data, setData] = useState([])
    const [pagination,setPagination] = useState({
        current:1,
        pageSize:10,
        total:10
    })
    const [mouseIndex,setMouseIndex] = useState<null|number>(null);
    const [deleteModalOpen,setDeleteModalOpen] = useState(false)
    const onFinish = (values:FormInstance) => {
       console.log(values)
       setPagination({ current:1,
        pageSize:10,
        total:10})
        getData({ current:1,
            pageSize:10,
            total:10});
    };
    
    useEffect(() => {
        console.log(process)
        getLabel();
        getData();

       
     }, [])
    const handleOk = async () => {
        let data = childRef.current?.callbackData();
        console.log(data);
        // return
        let result;
        if(dialogType==='classification'){
            if(!data.materialLibrary){
                message.error({content:'不能为空'})
                return
            }
            result = await imgClassificationAdd(data);
        }else{
            let arr:{}[] = [];
            data.fileList.forEach((val:{url:string})=>{
                arr.push(val.url);
            })
            
            result = await addImg({fileList:arr,labelId:data.materialLibrary});
        }
        console.log(result);
        if(result.code===0){
            message.success({content:result.message})
            childRef.current.resrtData();
            setIsModalOpen(false);
            getLabel();
            getData();
            return
        }
        
        
    }
    const openDialog=(type:string)=>{
        setDialogType(type);
        setIsModalOpen(true);
    }
    const getData = async (data?: object) => {   //获取table数据
       let obj = {materialLibrary:formRef.current?.getFieldValue('materialLibrary')};
       data = data?data:pagination;
       obj = {...obj,...data}
       let result = await getImg(obj);
       console.log(result);
       if(result.code===0){
           setData(result.data.list);
           setPagination({
            pageSize:10,
            current:pagination.current,
            total:result.data.total
           })
           return
       }

    }
    const getLabel = async()=>{   //获取标签列表
        let data = await imgClassificationList();
        console.log(data);
        
        if(data.code ===0){
            data.data.forEach((val:{value:number,id:number})=>{
                val.value = val.id;
            })
            setOption(data.data);
        }
    }
   const deleteImg = async()=>{   //删除图片
     if(typeof mouseIndex =='number'){
        let obj = data[mouseIndex];
        let result = await delImg(obj);
        if(result.code===0){
            message.success({content:result.message})
            getData();
            return
        }
        message.error({content:result.message})
     }
   }
   const paginationChange = (current:number,pageSize:number)=>{
    getData({ current,pageSize})
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
            <div className='img-flex'>
                {
                    data.length>0&&data.map((val:{url:string},index)=>(
                            <div className='img-size' key={index}>
                                <img  onMouseOver={()=>{setMouseIndex(index)}} src={UPLOAD_IMG_URL+val.url}/>
                                {mouseIndex==index&&<div onMouseOut={()=>{setMouseIndex(null)}} onClick={()=>setDeleteModalOpen(true)} className='popup'><DeleteTwoTone style={{fontSize:'30px'}} /></div>}
                            </div>
                    ))
                }
            </div>
            
            <Pagination defaultCurrent={pagination.current} pageSize={pagination.pageSize} total={pagination.total} onChange={paginationChange} />
            <Modal title={dialogType == 'classification' ? '添加分类' : "上传素材"} open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
                <AddForm option={option} ref={childRef}  materialLibrary={dialogType} />
            </Modal>
            <Modal title="提示" open={deleteModalOpen} onOk={deleteImg} onCancel={()=>setDeleteModalOpen(false)}>
                <p>是否删除选择的图片?</p>
            </Modal>
            </div>
    )
}


export default MaterialLibrary;