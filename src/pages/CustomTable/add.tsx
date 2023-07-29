import { Button, Form, DatePicker, Select,Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import type { FormInstance } from 'antd/es/form';
import AddInput from './addInput';
interface labelOptionType{
    color:string,
    tag:string,
    value:string
}
interface PropsType  {
         labelOptionList:labelOptionType[],
         titleText:string
        //  handleOk:Function
}
interface TagType{
    color:string,
    label:string,
    tag:string
}

export default React.forwardRef((props:PropsType,ref:any) => {
    React.useImperativeHandle(ref,()=>({
        handleSubmit,
        clearForm
    }))
    const { RangePicker } = DatePicker;
    const formRef = React.useRef<FormInstance>(null);
    const addInputRef = React.useRef<any>(null);
    const [workType, setWorkType] = useState('1');
    const [tags,setTags] = useState< any[]>([]);
    const onFinish = (values:FormInstance)=>{
        // console.log(values)
    }
    const changeWorkType = (e: string) => {
        formRef.current?.setFieldValue('time','')
        formRef.current?.setFieldValue('mounthTime','')
        setWorkType(e);
    }
    const preventDefault = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
      };


      const handleSubmit = (fn:Function)=>{
        let form = formRef.current?.getFieldsValue();
        form.workList = addInputRef.current?.getInput();
        form.tag = tags;
        fn(form)
      }

      const clearForm = ()=>{
        formRef.current?.resetFields();
        addInputRef.current?.clearInputs();
      }
    return (
        <div ref={ref}>
            <Form
                ref={formRef}
                name="control-ref"
                onFinish={onFinish}
                initialValues={{ workType: '1' }}
            >
                <Form.Item name="workType" label="任务类型" >
                    <Select
                        style={{ width: 180 }}
                        options={[{ value: '1', label: '周任务' }, { value: '2', label: '月任务' }]}
                        onChange={changeWorkType}
                    />
                </Form.Item>
                {
                    workType == '2' && <Form.Item name="mounthTime" label="月份" >
                        <DatePicker picker="month" />
                    </Form.Item>
                }
                {
                    workType == '1' && <Form.Item name="time" label="时间段" >
                        <RangePicker />
                    </Form.Item>
                }
                <Form.Item name="tag" label="label类型"  >
                    <Select
                        mode="multiple"
                        style={{ width: 200 }}
                        optionLabelProp="tag" // 指定显示标签的字段名为 'tag'
                        placeholder="选择标签"
                        labelInValue={true}
                        
                        onChange={(e,option:any)=> setTags(option)}
                    >
                        {props.labelOptionList.map(item => (
                            <Select.Option key={item.value} color={item.color} value={item.tag} >
                                {item.tag}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                {
                     tags.length>0&&<Form.Item>
                     {
                        tags.map((item)=>(
                             <Tag color={item.color} key={item.value} closeIcon onClose={preventDefault}>{item.value}</Tag>
                         ))
                     }
                     </Form.Item>
                }
            </Form>
            <AddInput ref={addInputRef}  titleText={props.titleText} />
        </div>
    )
})