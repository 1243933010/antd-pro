
import React, { useEffect, useState } from 'react';
import type { FormInstance } from 'antd/es/form';
import { Button,Pagination, Input,Form, DatePicker, Select,Tag } from 'antd';
import {propsData} from './interface'
// import {addClassification} from ''
export default React.forwardRef((props:propsData,ref:any) => {
    React.useImperativeHandle(ref,()=>({
    }))
    const formRef = React.useRef<FormInstance>(null);


    const onFinish = (value:FormInstance)=>{
        console.log(value);
    }

    return (
        <div ref={ref}>
            <Form
                ref={formRef}
                name="control-ref"
                onFinish={onFinish}
            >
                {props.materialLibrary=='upload'?<Form.Item name="materialLibrary" label="分类" >
                    <Select
                        style={{ width: 180 }}
                        options={[{ value: '1', label: '周任务' }, { value: '2', label: '月任务' }]}
                        
                    />
                </Form.Item>:<Form.Item name="materialLibrary" label="分类名称" >
                    <Input placeholder='请输入分类名称' />
                </Form.Item>}
                </Form>
                
                
        </div>
    )
})

