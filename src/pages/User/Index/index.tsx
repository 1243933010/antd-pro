import { addRule, removeRule, getUserList, updateRule,getImg,createUser,updateUser } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
  ProFormSelect,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, Input, message,Image,Pagination, } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import '../../materialLibrary/index.less'


/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateUser({...fields});
    hide();
    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.UserItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.UserItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.UserItem[]>([]);

  const [avatar,setAvatar] = useState<string>('')
  const [avatarModal,setAvatarModal] = useState<boolean>(false);
  const [pagination,setPagination] = useState({
    current:1,
    pageSize:10,
    total:10
})
const [data, setData] = useState([])
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.UserItem>[] = [
    {
        title: (
          <FormattedMessage
            id="pages.searchTable.userId"
            defaultMessage="userId"
          />
        ),
        dataIndex: 'id',
        sorter: true,
        hideInForm: true,
        renderText: (val: string) =>`${val}`,
          search: false
      },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.updateForm.ruleName.name"
          defaultMessage="name"
        />
      ),
      search:{
        title:'账号名称'
      },
      dataIndex: 'name',
      tip: '账号名称',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
      
    },
    {
      title: <FormattedMessage id="pages.searchTable.email" defaultMessage="email" />,
      dataIndex: 'email',
      
    //   valueType: 'textarea',
    },
    
    {
      title: <FormattedMessage id="pages.searchTable.isShow" defaultMessage="isShow" />,
      dataIndex: 'isShow',
      hideInForm: true,
      valueEnum: {
        0: {
          text: (
            <FormattedMessage
              id="pages.searchTable.nameStatus.default"
              defaultMessage="Shut down"
            />
          ),
          status: 'Default',
        },
        1: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.running" defaultMessage="Running" />
          ),
          status: 'Processing',
        },
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.avatar"
          defaultMessage="avatar"
        />
      ),
      dataIndex: 'avatar',
    renderText:(val:string)=>{
        return <Image src={IMG_URL+val} style={{width:100,height:100}} />
    },
    search: false
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            // console.log(updateModalOpen)
            // return
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.searchTable.edit" defaultMessage="Configuration" />
        </a>,
      ],
    },
  ];

//   const chooseAvatar = (url:)=>{

//   }
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
  return (
    <PageContainer>
      <ProTable<API.UserItem, API.PageParams>
        actionRef={actionRef}
        rowKey="id"
        options={false}   
        search={{
          labelWidth: 120,
        }}
        
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={getUserList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.addUser',
          defaultMessage: 'New rule',
        })}
        width="400px"
        
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
        //  console.log(value)
          const success = await createUser({...value,avatar} as API.UserItem);
          if (success&&success.code==0) {
            handleModalOpen(false);
            message.success(success.message)
            if (actionRef.current) {
              actionRef.current.reload();
            }
            return
          }
          message.error(success.message)
        }}
      >
        <ProFormText
          label="账号名称"
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
          name="name"
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
            console.log(value,'---')
            setAvatarModal(false);
        //   const success = await handleAdd(value as API.UserItem);
        //   if (success) {
        //     setAvatarModal(false);
        //     if (actionRef.current) {
        //       actionRef.current.reload();
        //     }
        //   }
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
      <UpdateForm
        onSubmit={async (value:FormValueType) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          setCurrentRow(undefined);
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
