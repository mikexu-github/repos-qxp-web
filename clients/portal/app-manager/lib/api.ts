import request from './request';

export const fetchAppList = () => {
  return request({
    url: '/api/v1/app-center/adminList',
    method: 'post',
    data: { page: 1, limit: 9999 },
  });
};

export const createdApp = (data: AppInfo) => {
  return request({
    url: '/api/v1/app-center/add',
    method: 'post',
    data,
  });
};

export const updateApp = (data: AppInfo) => {
  return request({
    url: '/api/v1/app-center/update',
    method: 'post',
    data,
  });
};

export const delApp = (id: string) => {
  return request({
    url: '/api/v1/app-center/del',
    method: 'post',
    data: { id },
  });
};

export const updateAppStatus = (data: any) => {
  return request({
    url: '/api/v1/app-center/updateStatus',
    method: 'post',
    data,
  });
};

export const fetchAppDetails = (id: string) => {
  return request({
    url: '/api/v1/app-center/one',
    method: 'post',
    data: { id },
  });
};

export const appAddAdmin = (data: any) => {
  return request({
    url: '/api/v1/app-center/addAdmin',
    method: 'post',
    data,
  });
};

export const fetchAppAdminUsers = (data: any) => {
  return request({
    url: '/api/v1/app-center/adminUsers',
    method: 'post',
    data,
  });
};

export const delAppAdminUsers = (data: any) => {
  return request({
    url: '/api/v1/app-center/delAdmin',
    method: 'post',
    data,
  });
};

export const fetchPageList = (appID: string) => {
  return request({
    url: '/api/v1/structor/menu/list',
    method: 'post',
    data: { appID },
  });
};

export const fetchGroupList = (appID: string) => {
  return request({
    url: '/api/v1/structor/group/list',
    method: 'post',
    data: { appID },
  });
};

export const createPage = (data: PageInfo) => {
  return request({
    url: '/api/v1/structor/menu/create',
    method: 'post',
    data,
  });
};

export const updatePage = (data: PageInfo) => {
  return request({
    url: '/api/v1/structor/menu/update',
    method: 'post',
    data,
  });
};

export const createGroup = (data: any) => {
  return request({
    url: '/api/v1/structor/group/create',
    method: 'post',
    data,
  });
};

export const deleteGroup = (data: any) => {
  return request({
    url: '/api/v1/structor/group/delete',
    method: 'post',
    data,
  });
};

export const deletePage = (data: any) => {
  return request({
    url: '/api/v1/structor/menu/delete',
    method: 'post',
    data,
  });
};

export const movePage = (data: any) => {
  return request({
    url: '/api/v1/structor/menu/transfer',
    method: 'post',
    data,
  });
};

export const saveFormScheme = (data: any) => {
  return request({
    url: '/api/v1/structor/table/create',
    method: 'post',
    data,
  });
};

