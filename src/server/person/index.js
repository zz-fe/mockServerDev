import {baseUrl,axios} from '@/server/config'

/**
 * [getPersonCreate 创建项目]
 * @param  {Object} [obj={}] [description]
 * @return {[type]}          [description]
 */
export const getPersonCreate = ( obj = {} ) => {
  return axios.post(`/person/create`, obj)
};

/**
 * [getPersonList 项目名称重复]
 * @return {[type]} [description]
 */
export const getPersonUpdate = ( obj = {} ) => {
  return axios.post(`/person/update`, obj)
}

/**
 * [getPersonList 获取项目列表]
 * @return {[type]} [description]
 */
export const getPersonList = () => {
  return axios.get(`/person/List`)
}

/**
 * [getPersonDelect 删除项目]
 * @param  {Object} [obj={}] [id]
 * @return {[type]}          [description]
 */
export const getPersonDelect = ( obj = {} ) => {
  return axios.post(`/person/delete`, obj)
}


/**
 * [getPersonDelect 删除项目]
 * @param  {Object} [obj={}] [id]
 * @return {[type]}          [description]
 */
export const getPersonModify = ( obj = {} ) => {
  return axios.post(`/person/modify`, obj)
}
