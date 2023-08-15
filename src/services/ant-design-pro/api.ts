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

/** 登录接口 POST /api/login/account */
export async function getChart(body: API.LoginParams, options?: { [key: string]: any }) {
  return request('/api/user/chart', {
    method: 'GET',
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