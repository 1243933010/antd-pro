import { QuestionCircleOutlined, BellOutlined } from '@ant-design/icons';
import { SelectLang as UmiSelectLang } from '@umijs/max';
import React from 'react';
import { Avatar, Badge, Space } from 'antd';
export type SiderTheme = 'light' | 'dark';
import { getNotice} from '@/services/ant-design-pro/api';
import {useModel} from 'umi'
export const SelectLang = () => {
  return (
    <UmiSelectLang
      style={{
        padding: 2,
      }}
    />
  );
};

export const Question = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        window.open('https://www.baidu.com');
      }}
    >
      <QuestionCircleOutlined />
    </div>
  );
};

export const Notice = (prop:{num:number}) => {
  return (
    <div>
      <Space size="middle">
        <Badge count={prop.num}>
          <BellOutlined style={{ fontSize: 18 }} />
        </Badge>
      </Space>
    </div>
  )
}

export const requestNotice = async()=>{
  let {token} = useModel('shopToken')
  console.log(token);
  let data = await getNotice({token:''})
  // console.log(data);
  if(data.data.code===0){
    return data.data;
  }
  return [];
}