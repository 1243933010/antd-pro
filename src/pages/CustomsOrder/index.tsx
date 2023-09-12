import React, { useEffect, useState } from 'react';
import { Button, message,Upload, Avatar, List, Space, Tag ,Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import './index.less'

const CustomsOrder: React.FC = () => {
    const [token,setToken] = useState<string>('');
    const [list,setList] = useState([]);
    const [filterList,setFilterList] = useState([]);
    useEffect(()=>{
        let token:string = localStorage.getItem('token')||'';
        setToken(token);
    },[])


    const choose = (val:string)=>{
        if(!val){
            setFilterList(list)
            return
        }
        let arr:any = [];
        list.forEach((item)=>{
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
    return (
        <div>
            <div className='flex'>
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
           <div>

           </div>
            </div>
            {
                list.length>0&&<div>
                     <Space size={[0, 8]} wrap>
                     <Tag onClick={()=>choose('')}>全部</Tag>
                        {Object.keys(list[0]).map((val,index)=>{
                            return <Tag key={index} onClick={()=>choose(val)}>{val}</Tag>
                        })}
                     </Space>
                </div>
            }
            {
                filterList.length>0&& <List
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