
import React, { useEffect, useState } from 'react';
import type { FormInstance } from 'antd/es/form';
import { Button, Pagination, Input, Form, DatePicker, Select, Tag, Upload, Modal } from 'antd';
import { propsData } from './interface'
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { PlusOutlined } from '@ant-design/icons';
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
        callbackData
    }))
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([

    ])
    const handleCancel = () => setPreviewOpen(false);
    const formRef = React.useRef<FormInstance>(null);

    const callbackData = () => {
        let formData = formRef.current?.getFieldsValue();
        return { ...formData };
    }
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

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
                    <Upload
                        action="http://192.168.0.121:8000/api/upload"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
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

