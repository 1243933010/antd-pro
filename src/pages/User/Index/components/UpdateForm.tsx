import {
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ModalForm
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Modal,Image,Button,Pagination } from 'antd';
import React,{useState,useEffect} from 'react';
import { addRule, removeRule, getUserList, updateRule,getImg,createUser } from '@/services/ant-design-pro/api';
export type FormValueType = {
  id?:number;
  name?: string;
  password?: string;
  email?: string;
  access?: string;
  avatar?:string
} ;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: FormValueType;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const [pagination,setPagination] = useState({
    current:1,
    pageSize:10,
    total:10
})
const [data, setData] = useState([])
const [avatarModal,setAvatarModal] = useState<boolean>(false);
const [avatar,setAvatar] = useState<string>('')
const [initialValues,setInitialValues] = useState<FormValueType>({
  id:0,
  name:'',
  password:'',
  email:'',
  access:'',
})

  const getImgFnc = async (data?: object) => {   //获取table数据
    data = data?data:pagination;
    let result = await getImg(data);
    console.log(result);
    if(result.code===0){
        setData(result.data.list);
        setPagination({
         pageSize:10,
         current:pagination.current,
         total:result.data.total
        })
        return
    }

 }
 const paginationChange = (current:number,pageSize:number)=>{
  getImgFnc({ current,pageSize})
 }



 useEffect(()=>{
  setAvatar(props.values.avatar?`${props.values.avatar}`:'')
    setInitialValues({
      id:props.values.id,
      name: props.values.name,
      password: props.values.password,
      email: props.values.email,
      access: props.values.access,
    });
 },[props.values.id])

  return (
    initialValues.id?<div>
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.addUser',
          defaultMessage: 'New rule',
        })}
        width="400px"
        open={props.updateModalOpen}
        onOpenChange={(e)=>{
          if(!e){props.onCancel()}}
        }
        onFinish={async (value:FormValueType) => {
        console.log({...value,avatar,id:props.values.id},'---1')
        props.onSubmit({...value,avatar,id:props.values.id});
         
        }}
        initialValues={initialValues}
      >
        <ProFormText
          label="账号名称"
          name='name'
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="md"
        />
        <ProFormText
          label="密码"
          rules={[
            {
              required: true,
              message:"请输入密码",
            },
          ]}
          width="md"
          name="password"
        />
         <ProFormText
          label="邮箱"
          width="md"
          name="email"
        />
         <ProFormSelect
          request={async () => [
            {
              value: 'admin',
              label: '管理员',
            },
            {
                value: 'test',
                label: '普通测试账号',
              },
          ]}
          width="md"
          name="access"
          label="账号权限"
        />
         {/* <ProFormText
          label="头像"
          width="md"
          name="avatar"
         
        /> */}
        <div>
            <p>头像</p>
            <Image style={{width:100,height:100}} src={IMG_URL+avatar} />
            <Button type='primary' onClick={()=>{setAvatarModal(true);getImgFnc()}}>上传</Button>
        </div>
      </ModalForm>
            <ModalForm
            title="选择头像"
            width="700px"
            open={avatarModal}
            onOpenChange={setAvatarModal}
            onFinish={async (value) => {
                setAvatarModal(false);
            }}
          >
            <div className='img-flex1'>
                    {
                        data.length>0&&data.map((val:{url:string},index)=>(
                                <div className='img-size' key={index}>
                                    <img onClick={()=>setAvatar(val.url)} src={IMG_URL+val.url}/>
                                </div>
                        ))
                    }
                </div>
                <Pagination defaultCurrent={pagination.current} pageSize={pagination.pageSize} total={pagination.total} onChange={paginationChange} />
            </ModalForm>
    </div>:null
  )
};

export default UpdateForm;
