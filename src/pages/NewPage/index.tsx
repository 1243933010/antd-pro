import React from 'react';
import { Line } from '@ant-design/charts';
import {useModel} from 'umi'
import { InputNumber } from 'antd';
import styles from './index.less'

const NewPage: React.FC = () => {
    const {counter,setNumber} = useModel('inputNumber');
    const {initialState} = useModel('@@initialState')
    console.log(initialState)

  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 114.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];
  const config = {
    data,
    height: 400,
    xField: 'year',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };

 

  const onChange = (e:number|null )=>{
    let num:number = e as number;
    setNumber(num);
  }

  return (
    <div>
      <InputNumber min={1}   defaultValue={counter}   onChange={onChange} />
      <div className={styles.globalText}>全局数据：{counter}</div>
    <Line {...config} />;
  </div>
  )
};
export default NewPage;