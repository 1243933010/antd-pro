// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function packageJson(params:{token:string}) {
  return request<{
    data: API.ListResult;
  }>('/api/common/packageJson', {
    method: 'POST',
    data:params
  });
}
export async function getPackageJson() {
  return request<{
    data: API.ListResult;
  }>('/api/common/packageJson', {
    method: 'GET',
  });
}

export async function getNotice(params:{token:string}) {
  return request<{
    data: API.ListResult;
  }>('/api/common/notice', {
    method: 'POST',
    data:params
  });
}


/** 获取用户列表 GET /api/user */
export async function getUserList( params: {
  // query
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
},
options?: { [key: string]: any },) {
  return request<API.UserList>('/api/user', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
/** 创建用户 POST /api/user */
export async function createUser(options: { [key: string]: any }) {
  console.log(options,'--')
  return request<API.UserInfo>('/api/user', {
    method: 'POST',
    data:options
  });
}

/** 更新用户信息 POST /api/updateUser */
export async function updateUser(options: { [key: string]: any }) {
  return request<API.UserItem>('/api/user', {
    method: 'PUT',
    data:options
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}



/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 获取标签  /api/user/label */
export async function userLabel() {
  return request<Record<string, any>>('/api/user/label', {
    method: 'GET'
  });
}

/** 获取work标签   /api/work/label */
export async function workLabel() {
  return request<Record<string, any>>('/api/work/tag', {
    method: 'GET'
  });
}


/** 获取work标签   /api/work/label */
export async function submitWork(options?: { [key: string]: any }) {
  console.log(options)
  return request<API.RuleListItem>('/api/work', {
    method: 'POST',
    data:options || {},
  });
}

/** 获取work标签   /api/work/label */
export async function getWork(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/api/work', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加素材分类   /api/classification */
export async function addClassification(
  options?: { [key: string]: any },
) {
  return request<API.ListResult>('/api/classification', {
    method: 'POST',
    ...(options || {}),
  });
}

/** work详情   /api/work */
export async function workDetail(
  id:number ,
) {
  return request<API.ListResult>(`/api/work/${id}`, {
    method: 'GET',
  });
}


/** work详情编辑   /api/work */
export async function workDeit(
  id:number ,
  options?: { [key: string]: any },
) {
  return request<API.ListResult>(`/api/work/${id}`, {
    method: 'PATCH',
    data:options
  });
}

/** work详情编辑   /api/work */
export async function workDelete(
  id:number 
) {
  return request<API.ListResult>(`/api/work/${id}`, {
    method: 'DELETE'
  });
}

/** wechart类型列表   /api/echart/type */
export async function echartType(
  type:number|undefined
) {
  return request<any>(`/api/echart/type/${type}`, {
    method: 'GET'
  });
}


/** echart数据提交   /api/echart */
export async function echartAdd(
  options?: { [key: string]: any }, 
) {
  return request<any>(`/api/echart`, {
    method: 'POST',
    data:options
  });
}



/** echart数据列表   /api/echart */
export async function echartList(
  options?: { [key: string]: any }, 
) {
  return request<any>(`/api/echart`, {
    method: 'GET',
    params:options
  });
}



/** 删除echart数据   /api/echart */
export async function echartDelete(
  id:number|undefined
) {
  return request<any>(`/api/echart/${id}`, {
    method: 'DELETE',
  });
}


/** 修改echart数据   /api/echart */
export async function echartEdit(
  id:number,
  options: { [key: string]: any }, 
) {
  return request<any>(`/api/echart/${id}`, {
    method: 'PATCH',
    data:options
  });
}


/** 素材图片类型列表   /api/classificationList */
export async function imgClassificationList(
) {
  return request<any>(`/api/materiallibrary/label`, {
    method: 'GET',
  });
}

/** 添加图片类型  /api/classificationList */
export async function imgClassificationAdd(
  options: { [key: string]: any }, 
  ) {
    return request<any>(`/api/materiallibrary/label`, {
      method: 'POST',
      data:options
    });
  }
  

  /** 上传图片  /api/upload */
export async function fileUpload(
  options: { [key: string]: any }, 
  ) {
    return request<any>(`/api/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data:options
    });
  }
  
  
  /** 上传图片绑定类型  /api/materiallibrary */
export async function addImg(
  options: { [key: string]: any }, 
  ) {
    return request<any>(`/api/materiallibrary`, {
      method: 'POST',
      data:options
    });
  }
  
    /** 获取图片列表  /api/materiallibrary */
export async function getImg(
  options: { [key: string]: any }, 
  ) {
    return request<any>(`/api/materiallibrary`, {
      method: 'get',
      params:options
    });
  }
  

      /** 删除图片  /api/materiallibrary */
export async function delImg(
  options: { [key: string]: any }, 
  ) {
    return request<any>(`/api/materiallibrary/${options.id}`, {
      method: 'delete'
    });
  }
  

  
      /** 删除图片  /api/materiallibrary */
export async function updateXlsx(
  options: { [key: string]: any }, 
  ) {
    return request<any>(`/api/updateXlsx`, {
      method: 'post',
      data:options
    });
  }
  

 