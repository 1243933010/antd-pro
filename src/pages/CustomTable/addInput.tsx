import React, { useState } from 'react';
import { Input, Button, Space, } from 'antd';
import {PlusCircleTwoTone,CloseCircleTwoTone } from '@ant-design/icons';

interface PropsType{
    titleText:string
}

export default React.forwardRef((props:PropsType,ref:any) => {
    React.useImperativeHandle(ref,()=>({
        getInput,clearInputs,
        getInputs
    }))
    const [inputs, setInputs] = useState([{ value:'' }]);

    const handleAddInput = () => {
        const newInput = { value:'' };
        setInputs(prevInputs => [...prevInputs, newInput]);
    };
    const clearInputs = ()=>{
        setInputs([]);
    }

    const handleRemoveInput = (ind:number) => {
        setInputs(prevInputs => prevInputs.filter((input,index) => index!== ind));
    };

    const changeInput = (value:string,ind:number)=>{
        setInputs(prevInputs =>
            prevInputs.map((input,index) => index=== ind ? { ...input, value } : input )
          );
    }
    const getInput=()=>{
        return inputs
    }
    const getInputs = (arr:{value:string}[])=>[
        setInputs(arr)
    ]
    return (
        <div ref={ref}>
             {<PlusCircleTwoTone onClick={handleAddInput} style={{fontSize: '25px'}}/>}
            {inputs.map((input,index) => (
                <div key={index} style={{ marginBottom: 10 }}>
                    <Space>
                        <span>{index+1}、</span>
                        <Input value={input.value} style={{width:'400px'}} onChange={(e)=>changeInput(e.target.value,index)} />
                        {/* { ( */}
                            <CloseCircleTwoTone onClick={() => handleRemoveInput(index) } style={{fontSize: '25px'}} />
                        {/* )} */}
                        
                    </Space>
                </div>
            ))}
        </div>
    )
})