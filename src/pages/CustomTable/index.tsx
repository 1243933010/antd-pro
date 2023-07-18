
import { ProLayout, PageContainer, WaterMark } from '@ant-design/pro-components';
import { Button, message, Space } from 'antd'
import { useState } from 'react';

import {
    ProFormDatePicker,
    ProFormDateRangePicker,
    ProFormSelect,
    ProFormText,
    QueryFilter,
} from '@ant-design/pro-components';

const handleCustomButtonClick = ()=>{
    console.log('1111')
}

const renderFooter = () => {
    return (
      <Button onClick={handleCustomButtonClick}>自定义按钮</Button>
    );
  };
const CustomTable: React.FC = () => {

    return (
        <WaterMark content={'111111'} zIndex={1}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <QueryFilter<{ name: string; } >
                     submitter={false}
                    onFinish={async (values) => {
                        console.log(values);
                    }}
                    collapsed={false}
                   
                >
                    <ProFormText name="name" label="应用名称" rules={[{ required: true }]} />
                    <ProFormText name="creater" label="创建人" />
                    <ProFormSelect
                        name="sex"
                        label="性别"
                        showSearch
                        valueEnum={{
                            man: '男',
                            woman: '女',
                        }}
                    />
                    <ProFormText name="status" label="应用状态" />
                    <ProFormDatePicker name="startdate" label="响应日期" />
                    <Button onClick={handleCustomButtonClick}>自定义按钮</Button>
                    {/* <ProFormDateRangePicker width={150} name="create" label="创建时间" colSize={3} /> */}
                </QueryFilter>
            </div>
        </WaterMark>
    )
}

export default CustomTable;
