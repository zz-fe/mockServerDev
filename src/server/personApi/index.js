import {baseUrl,axios} from '@/server/config'


/**
 * [getPersonApiList 查询API]
 * @param  {Object} [obj={}] [项目id,apiId]
 * @return {[type]}          [description]
 */
export const getPersonApiList= ( obj = {} ) => {
  return axios.post(`/personApi/list`, obj)
};

/**
 * [getPersonApiSave 保存API]
 * @param  {Object} [obj={}] [项目id,apiId]
 * @return {[type]}          [description]
 */
export const getPersonApiSave= ( obj = {} ) => {
  return axios.post(`/personApi/save`, obj)
};
