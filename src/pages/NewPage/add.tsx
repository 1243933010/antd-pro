import React, { useEffect, useRef, useState } from 'react';
import { PropData } from './interface';
import { Button, Form, DatePicker, Select, Tag, Input } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { echartType } from '@/services/ant-design-pro/api'
import dayjs from 'dayjs'
import moment from 'moment';
export default React.forwardRef((props: PropData, ref: any) => {
    React.useImperativeHandle(ref, () => ({
        resetData,
        getFormData
    }))
    const [formLabel, setFormLabel] = useState({
        masterName: '主label',
        devName: ''
    })
    const [detail, setDetail] = useState<any | undefined>(undefined)
    const formRef = useRef<FormInstance>(null)

    const onFinish = (values: any): void => {
        throw new Error('Function not implemented.');
    }
    const changeWorkType = async (e: number) => {
        setType();
    }
    const getFormData = () => {
        // console.log(detail,'---', formRef.current?.getFieldsValue())
        // return
        let obj: any = {};
        if (detail) {
            obj.id = detail.id;
        }
        let data = formRef.current?.getFieldsValue();
        data.time = data.time ? moment(data.time).format('YYYY-MM-DD') : ''
        // console.log(moment(data.time).format('YYYY-MM-DD') );
        return { ...obj, ...data };
    }
    const resetData = async (e: any) => {
        setDetail(e);
        formRef.current?.resetFields();
        if (e) {
            let obj = JSON.parse(JSON.stringify(e));
            obj.time = dayjs(obj.time, 'YYYY-MM-DD');
            formRef.current?.setFieldsValue(obj)
        }
        setType();

    }
    const setType = () => {
        let type = formRef.current?.getFieldValue('type');
        echartType(type).then((data) => {
            if (data.code === 0) {
                setFormLabel({ masterName: data.data.masterName || '', devName: data.data.devName || '' })
            }
        })
    }
    useEffect(() => {
        resetData(undefined)
    }, [])
    return (
        <div >
            <Form
                ref={formRef}
                name="control-ref"
                onFinish={onFinish}
                initialValues={{ type: 1, }}
            >

                {
                    props.titleText !== 'edit' && <Form.Item name="type" label="类型" rules={[{ required: true, message: '' }]}>
                        <Select
                            style={{ width: 180 }}
                            options={[{ value: 1, label: '私服人数变化' }, { value: 2, label: 'gs人数变化' }, { value: 3, label: '体重变化' }]}
                            onChange={changeWorkType}
                        />
                    </Form.Item>
                }
                {
                    props.titleText == 'edit' && <Form.Item name="type" label="选择要修改数据" rules={[{ required: true, message: '' }]}>
                        <Select
                            style={{ width: 180 }}
                            options={[{ value: 1, label: '私服人数变化' }, { value: 2, label: 'gs人数变化' }, { value: 3, label: '体重变化' }]}
                            onChange={changeWorkType}
                        />
                    </Form.Item>
                }
                <Form.Item name="time" label="时间" rules={[{ required: true, message: '' }]}>
                    <DatePicker placeholder='请选择时间' format={'YYYY-MM-DD'} />
                </Form.Item>
                <Form.Item rules={[{ required: true, message: '' }]} name="masterNum" label={formLabel.masterName} style={{ width: 200 }} >
                    <Input type='number' />
                </Form.Item>
                {
                    formLabel.devName && <Form.Item rules={[{ required: true, message: '' }]} name="devNum" label={formLabel.devName} style={{ width: 200 }} >
                        <Input type='number' />
                    </Form.Item>
                }

            </Form>
        </div>
    )

})