import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { Alert, Card, Typography, List } from 'antd';
import React from 'react';
import { imgClassificationList, getProject } from '@/services/ant-design-pro/api';
import AvatarList from '@/components/AvatarList';

export type Member = {
  avatar: string;
  name: string;
  id: string;
};

interface ListItemDataType {
  id: string;
  owner: string;
  projectName: string;
  avatar: string;
  projectImg: string;
  status: 'normal' | 'exception' | 'active' | 'success';
  label: string;
  logo: string;
  href: string;
  body?: any;
  updatedAt: number;
  createdAt: number;
  richText: string;
  description: string;
  activeUser: number;
  newUser: number;
  star: number;
  like: number;
  message: number;
  content: string;
  members: Member[];
}


const { Paragraph } = Typography;
const getKey = (id: string, index: number) => `${id}-${index}`;
const Admin: React.FC = () => {
  const intl = useIntl();
  const { data, loading, run } = useRequest((values: any) => {
    console.log('form data', values);
    return getProject({});
  });
  const list = data?.list || [];
  const cardList = list && (
    <List<ListItemDataType>
      rowKey="id"
      loading={loading}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <Card hoverable cover={ 
            // style={{width:'200px',height:'200px'}}
            <img style={{height:'250px'}}  alt={item.projectName} src={UPLOAD_IMG_URL+item.projectImg}  />
            }>
            <Card.Meta
              title={<a>{item.projectName}</a>}
              description={
                // <div>{item.label}</div>
                <Paragraph
                  ellipsis={{
                    rows: 5,
                  }}
                >
                  {item.label}
                </Paragraph>
              }
            />
            <div >
              <span>{item.updatedAt}</span>
              <div >
                {
                  item.members && <AvatarList size="small">
                    {item.members.map((member, i) => (
                      <AvatarList.Item
                        key={getKey(item.id, i)}
                        src={member.avatar}
                        tips={member.name}
                      />
                    ))}
                  </AvatarList>
                }
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
  return (
    <PageContainer>
      <div >{cardList}</div>
    </PageContainer>
  );
};

export default Admin;
