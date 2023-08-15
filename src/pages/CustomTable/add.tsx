import { Button, Form, DatePicker, Select, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import type { FormInstance } from 'antd/es/form';
import AddInput from './addInput';
import { workDetail } from '@/services/ant-design-pro/api'
import { TableType,ConvertTags } from './interface'

interface labelOptionType {
    color: string,
    tag: string,
    value: string
}
interface PropsType {
    labelOptionList: labelOptionType[],
    titleText: string
    //  handleOk:Function
}
interface TagType {
    color: string,
    label: string,
    tag: string
}

export default React.forwardRef((props: PropsType, ref: any) => {
    React.useImperativeHandle(ref, () => ({
        handleSubmit,
        clearForm,
        getWorkDetail,
        getFormData
    }))
    const { RangePicker } = DatePicker;
    const formRef = React.useRef<FormInstance>(null);
    const addInputRef = React.useRef<any>(null);
    
    const [detail, setDetail] = useState<TableType>({
    userId: 0,
    workType: 1,
    })
    const onFinish = (values: FormInstance) => {
        // console.log(values)
    }
    const changeWorkType = (e: number) => {
        formRef.current?.setFieldValue('time', '')
        formRef.current?.setFieldValue('mounthTime', '')
        let {workType,...obj} = detail;
        workType = e;
        setDetail({workType,...obj})
    }
    const preventDefault = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
    };


    const handleSubmit = (fn: Function) => {
        let form = formRef.current?.getFieldsValue();
        form.workList = addInputRef.current?.getInput();
        form.tag = detail.tag;
        fn(form)
    }

    const clearForm = () => {
        formRef.current?.resetFields();
        addInputRef.current?.clearInputs();
        
    }
    const getFormData = ()=>{
         let {id,userId,...obj} = detail;
         let data = {id,userId,...formRef.current?.getFieldsValue()}
         data.workList = addInputRef.current?.getInput();
         return data;
        
    }

    const getWorkDetail = async (obj: TableType) => {
        if (!obj) {
            formRef.current?.resetFields()
            setDetail({userId: 0, workType: 1})
            addInputRef.current?.getInputs([])
            return
        }
        obj.tag = [];
        obj.workTags?.map(val=>{
            let objs:ConvertTags  = {};
            objs.key = val.value;
            objs.value = val.tag;
            objs.children = val.tag;
            objs.color = val.color;
            obj.tag.push(objs)

        })
        formRef.current?.setFieldsValue({ ...obj })
        setDetail(obj)
        addInputRef.current?.getInputs(obj.workList)

    }
    return (
        <div ref={ref}>
            <Form
                ref={formRef}
                name="control-ref"
                onFinish={onFinish}
                initialValues={{ workType: 1, }}
            >
                <Form.Item name="workType" label="任务类型" >
                    <Select
                        style={{ width: 180 }}
                        options={[{ value: 1, label: '周任务' }, { value: 2, label: '月任务' }]}
                        onChange={changeWorkType}
                    />
                </Form.Item>
                {
                    detail.workType == 2 && <Form.Item name="mounthTime" label="月份" >
                        <DatePicker picker="month" format={'YYYY-MM'} />
                    </Form.Item>
                }
                {
                    detail.workType == 1 && <Form.Item name="time" label="时间段" >
                        <RangePicker format={'YYYY-MM-DD'} />
                    </Form.Item>
                }
                <Form.Item name="tag" label="label类型"  >
                    <Select
                        mode="multiple"
                        style={{ width: 200 }}
                        optionLabelProp="tag" // 指定显示标签的字段名为 'tag'
                        placeholder="选择标签"
                        labelInValue={true}

                        onChange={(e, option: any) =>{
                            let {tag,...objs} = detail;
                            tag = option;
                            setDetail({tag,...objs})
                            // setTags(option)
                        } }
                    >
                        {props.labelOptionList.map(item => (
                            <Select.Option key={item.value} color={item.color} value={item.tag} >
                                {item.tag}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                {
                    detail.tag?.length > 0 && <Form.Item>
                        {
                             detail.tag.map((item:any) => (
                                <Tag color={item.color} key={item.value} closeIcon onClose={preventDefault}>{item.value}</Tag>
                            ))
                        }
                    </Form.Item>
                }
            </Form>
            <AddInput ref={addInputRef} titleText={props.titleText} />
        </div>
    )
})