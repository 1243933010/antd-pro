import React, { useEffect, useState } from 'react';
import { Line } from '@ant-design/charts';
import {useModel} from 'umi'
import { InputNumber } from 'antd';
import styles from './index.less'
import {getChart as getChartData} from '@/services/ant-design-pro/api'

const getChart = async()=>{
  try {
    const data = await getChartData({});
    if (data.code === 0) {
      return data.data;
    }
  } catch (error) {
    console.error(error);
    // 处理错误情况
  }
 
}

const NewPage: React.FC = () => {
    const {counter,setNumber} = useModel('inputNumber');
    const {initialState} = useModel('@@initialState')
    const [cgartData,setChartData] = useState<{}[]>([])

    console.log(initialState)
    useEffect(()=>{
      getChart().then((res)=>{
        setChartData(res);
      })
    },[])
 
  const config = {
    data:cgartData,
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