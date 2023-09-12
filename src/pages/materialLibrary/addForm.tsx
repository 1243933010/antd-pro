
import React, { useEffect, useState } from 'react';
import type { FormInstance } from 'antd/es/form';
import { Button, Pagination, Input, Form, DatePicker, Select, Tag, Upload, Modal } from 'antd';
import { propsData } from './interface'
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { PlusOutlined } from '@ant-design/icons';
import { fileUpload } from '@/services/ant-design-pro/api';
// import {addClassification} from ''

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });


export default React.forwardRef((props: propsData, ref: any) => {
    React.useImperativeHandle(ref, () => ({
        callbackData,resrtData
    }))
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([

    ])
    const [token,setToken] = useState<string>('');
    const handleCancel = () => setPreviewOpen(false);
    const formRef = React.useRef<FormInstance>(null);

    const callbackData = () => {
        let formData = formRef.current?.getFieldsValue();
        console.log(fileList,'---')
        return { ...formData,fileList};
    }
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    useEffect(()=>{
        let token:string = localStorage.getItem('token')||'';
        setToken(token);
    },[])

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const customRequest = async(e:any)=>{
       console.log(e);
        // let formData = new FormData()
        // formData.append('file',e.file);
        // let data = await fileUpload(formData)
        // if(data.code===0){
            // console.log(data,'(((111')
            // const updatedFile = { ...e.file, status: 'done', url: data.data.url };
            // const updatedList = [...fileList, updatedFile];
            // e.file.status = 'done'
            // e.file.url = data.data.url;
            // setFileList(updatedList);
        // }
    }
    const onRemove = (file:any)=>{
        setFileList(fileList => fileList.filter(item => item.uid !== file.uid));
    }
    const resrtData = ()=>{
        formRef.current?.resetFields();
        setFileList([]);
    }
    const handleChange: UploadProps['onChange'] = async({ file,fileList: newFileList }) =>{
        console.log(file,newFileList)
    newFileList = newFileList.map(file => {
      if (file.response) {
        file.url = file.response.data.url;
      }
      return file;
    });
    setFileList(newFileList)
    }
   
    return (
        <div>

            <Form
                ref={formRef}
                name="control-ref"
            >
                {props.materialLibrary == 'upload' ? <div>
                    <Form.Item name="materialLibrary" label="分类" >
                        <Select
                            style={{ width: 180 }}
                            options={props.option}

                        />

                    </Form.Item>
                    {/* action="http://192.168.0.121:8000/api/upload" headers={{'authorization':`Bearer ${token}`}}   onChange={handleChange} customRequest={customRequest}*/}
                    <Upload
                       action={`${UPLOAD_IMG_URL}/api/upload`}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onRemove ={onRemove}
                        onChange={handleChange} 
                        multiple 
                        headers={{'authorization':`Bearer ${token}`}}
                        
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </div>

                    : <Form.Item name="materialLibrary" label="分类名称" rules={[]} >
                        <Input placeholder='请输入分类名称' />
                    </Form.Item>}
            </Form>


        </div>
    )
})

