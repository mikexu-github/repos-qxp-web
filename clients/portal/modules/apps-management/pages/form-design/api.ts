import request from '@portal/modules/apps-management/lib/request';

export const createFormScheme = (appID: string, data: any) => {
  return request({
    url: `/api/v1/structor/${appID}/m/table/create`,
    method: 'post',
    data,
  });
};

export const fetchFormScheme = (appID: string, tableID: string) => {
  return request({
    url: `/api/v1/structor/${appID}/m/table/getByID`,
    method: 'post',
    data: { tableID },
  });
};

export const updateFormScheme = (appID: string, data: any) => {
  return request({
    url: `/api/v1/structor/${appID}/m/table/update`,
    method: 'post',
    data,
  });
};

export const createPageScheme = (appID: string, data: any) => {
  return request({
    url: `/api/v1/structor/${appID}/m/config/create`,
    method: 'post',
    data,
  });
};

export const createPerGroup = (appID: string, data: RightsCreate) => {
  return request({
    url: `/api/v1/structor/${appID}/m/permission/perGroup/create`,
    method: 'post',
    data,
  });
};

export const fetchRights = (appID: string, formID: string) => {
  return request({
    url: `/api/v1/structor/${appID}/m/permission/perGroup/getList`,
    method: 'post',
    data: { formID },
  });
};

export const deleteRights = (appID: string, data: any) => {
  return request({
    url: `/api/v1/structor/${appID}/m/permission/perGroup/delete`,
    method: 'post',
    data,
  });
};

export const movePerGroup = (appID: string, data: any) => {
  return request({
    url: `/api/v1/structor/${appID}/m/permission/perGroup/move`,
    method: 'post',
    data,
  });
};

export const updatePerGroup = (appID: string, data: Rights) => {
  return request({
    url: `/api/v1/structor/${appID}/m/permission/perGroup/update`,
    method: 'post',
    data,
  });
};

export const fetchOperatePer = (appID: string, perGroupID: string) => {
  return request({
    url: `/api/v1/structor/${appID}/m/permission/operatePer/get`,
    method: 'post',
    data: { perGroupID },
  });
};

export const saveOperatePer = (appID: string, data: any) => {
  return request({
    url: `/api/v1/structor/${appID}/m/permission/operatePer/save`,
    method: 'post',
    data,
  });
};

export const fetchDataAccessPer = (appID: string, perGroupID: string) => {
  return request({
    url: `/api/v1/structor/${appID}/m/permission/dataAccessPer/get`,
    method: 'post',
    data: { perGroupID },
  });
};

export const saveDataAccessPer = (appID: string, data: any) => {
  return request({
    url: `/api/v1/structor/${appID}/m/permission/dataAccessPer/save`,
    method: 'post',
    data,
  });
};

export const fetchFieldFilter = (appID: string, permissionGroupID: string) => {
  return request({
    url: `/api/v1/structor/${appID}/m/filter/get`,
    method: 'post',
    data: { permissionGroupID },
  });
};

export const saveFieldFilter = (appID: string, data: any) => {
  return request({
    url: `/api/v1/structor/${appID}/m/filter/save`,
    method: 'post',
    data,
  });
};
