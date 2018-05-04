import {baseUrl,axios} from '@/server/config'

/**
 * [getWorkList 获得API列表]
 * @param  {Object} [obj={}] [description]
 * @return {[type]}          [description]
 */
export const getWorkList = ( obj = {} ) => {
  return axios.post(`/personProject/work/list`, obj)
};

/**
 * [getWorkMenuList 获得列表]
 * @param  {Object} [obj={}] [description]
 * @return {[type]}          [description]
 */
export const getWorkMenuList = ( obj = {} ) => {
  return axios.post(`/personProject/list`, obj)
};
