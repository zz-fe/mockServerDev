import {baseUrl,axios} from '@/server/config'



/**
 * [getPersonProjectCreate 新建目录]
 * @param  {Object} [obj={}] [description]
 * @return {[type]}          [description]
 */
export const getPersonProjectCreate = ( obj = {} ) => {
  return axios.post(`/personProject/create`, obj)
};

/**
 * [getPersonProjectCreate 查看目录]
 * @param  {Object} [obj={}] [description]
 * @return {[type]}          [description]
 */
export const getPersonProjectList = ( obj = {} ) => {
  return axios.post(`/personProject/list`, obj)
};

/**
 * [getPersonProjectCreate 创建接口]
 * @param  {Object} [obj={}] [description]
 * @return {[type]}          [description]
 */

export const getPersonProjectApi = ( obj = {} ) => {
  return axios.post(`/personProject/create/api`, obj)
};
