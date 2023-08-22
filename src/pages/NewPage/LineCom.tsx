import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, DatePicker, Select, Tag ,Input,message} from 'antd';
import type { FormInstance } from 'antd/es/form';
import {echartType,} from '@/services/ant-design-pro/api'
// import { Line } from '@ant-design/charts';
import { Column ,Line} from '@ant-design/plots';
import { DetailData } from './interface'
export default React.forwardRef((props: any, ref: any) => {
    React.useImperativeHandle(ref, () => ({
      
    }))
    let [config,setConfig] =useState<any>( {
      data: props.data,
      height: 400,
      xField: 'time',
      yField: 'masterNum',
      point: {
        size: 5,
        shape: 'diamond',
      },
  })
  const [isShow,setShow] = useState(false)
  const [typeObj,setTypeObj] = useState({});
//  const getType = async()=>{
//   let result = await echartType(props.type);
//   if(result.code!==0){
//     message.error(({content:'数据请求异常'}));
//     return
//   }
//   setTypeObj(result.data)
//  }
      const handleData = async()=>{
        let result = await echartType(props.type);
        if(result.code!==0){
          message.error(({content:'数据请求异常'}));
          return
        }
        let arr:{}[] = [];
        setShow(false);
       
        if([1,2].includes(props.type)){
            props.data.forEach((val:DetailData)=>{
                let obj1:any = {}; let obj2:any = {};
                obj1.name = result.data.masterName;
                obj2.name = result.data.devName;
                obj1.time = val.time,obj2.time = val.time;
                obj1.num = +val.masterNum,obj2.num = +val.devNum;
                // console.log(val)
                arr.push(obj1)
                arr.push(obj2)
            })
            // console.log(arr,'22222')
            setConfig({
              data:arr,
              isGroup: true,
              xField: 'time',
              yField: 'num',
              seriesField: 'name',
          
              /** 设置颜色 */
              //color: ['#1ca9e6', '#f88c24'],
          
              /** 设置间距 */
              // marginRatio: 0.1,
              label: {
                // 可手动配置 label 数据标签位置
                position: 'middle',
                // 'top', 'middle', 'bottom'
                // 可配置附加的布局方法
                layout: [
                  // 柱形图数据标签位置自动调整
                  {
                    type: 'interval-adjust-position',
                  }, // 数据标签防遮挡
                  {
                    type: 'interval-hide-overlap',
                  }, // 数据标签文颜色自动调整
                  {
                    type: 'adjust-color',
                  },
                ],
              },
          }) 
        }else{
          props.data.forEach((val:DetailData)=>{
            let obj:{time:string|undefined,masterNum:number} = {
              time:val.time||'',
              masterNum:val.masterNum||0
            };
            arr.push(obj);
          })
            setConfig({
              data: arr,
              height: 400,
              xField: 'time',
              yField: 'masterNum',
              point: {
                size: 5,
                shape: 'diamond',
                style: {
                  fill: 'white',
                  stroke: '#5B8FF9',
                  lineWidth: 2,
                },
              },
              tooltip: {
                showMarkers: false,
              },
              state: {
                active: {
                  style: {
                    shadowBlur: 4,
                    stroke: '#000',
                    fill: 'red',
                  },
                },
              },
              interactions: [
                {
                  type: 'marker-active',
                },
              ],
          })
        }
        setTimeout(()=>{
          setShow(true);
        },0)
    }
    
    useEffect(()=>{
      
        handleData();
    },[props.type,props.data])
    
    return (
        <div>
            {[1,2].includes(props.type)&&isShow&&<Column {...config} />}

            {[3].includes(props.type)&&props.data.length>0&&isShow&&<Line {...config} />}

        </div>
    )

})