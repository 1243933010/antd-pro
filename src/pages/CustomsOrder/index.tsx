import React, { useEffect, useState } from 'react';
import { Button, message, Upload, Avatar, List, Space, Tag, Input, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import {useModel} from 'umi'
import './index.less'
import {getPackageJson} from '@/services/ant-design-pro/api'
const CustomsOrder: React.FC = () => {
    const [token, setToken] = useState<string>('');
    const [list, setList] = useState([]);
    const [filterList, setFilterList] = useState([]);
    let {handleToken} = useModel('shopToken')
    useEffect(() => {
        let token: string = localStorage.getItem('token') || '';
        setToken(token);
        getPackage()
    }, [])


    const getPackage = async()=>{
        let data = await getPackageJson();
        console.log(data)
    }
    const choose = (val: string) => {
        if (!val) {
            setFilterList(list)
            return
        }
        let arr: any = [];
        list.forEach((item) => {
            arr.push(item[val])
        })
        console.log(arr)
        setFilterList(arr)
    }



    const props: UploadProps = {
        name: 'file',
        action: `${UPLOAD_IMG_URL}/api/uploadFile`,
        headers: {
            authorization: `Bearer ${token}`,
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                setList(info.file.response.data.list)
                setFilterList(info.file.response.data.list)
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

   

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const onFinish = (values: any) => {
        handleToken(values.token);
    };
    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };
    return (
        
        <div>
            
            <div>
                <Form
                    name="basic"
                    // labelCol={{ span: 0 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    // initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="token"
                        name="token"
                    >
                        <Input placeholder='输入跨境购token配置' />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </div>


            <div className='flex'>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
                <div>

                </div>
            </div>
            {
                list.length > 0 && <div>
                    <Space size={[0, 8]} wrap>
                        <Tag onClick={() => choose('')}>全部</Tag>
                        {Object.keys(list[0]).map((val, index) => {
                            return <Tag key={index} onClick={() => choose(val)}>{val}</Tag>
                        })}
                    </Space>
                </div>
            }
            {
                filterList.length > 0 && <List
                    itemLayout="horizontal"
                    dataSource={filterList}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                                title={JSON.stringify(item)}
                                description=""
                            />
                            {/* <Button type='primary'>复制</Button> */}
                        </List.Item>
                    )}
                />
            }
        </div>
    )

}

export default CustomsOrder;