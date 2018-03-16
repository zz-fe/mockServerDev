import {baseUrl,axios} from '@/server/config'


/**
 * [getPersonApiList 查询API]
 * @param  {Object} [obj={}] [项目id,apiId]
 * @return {[type]}          [description]
 */
export const getPersonApiList= ( obj = {} ) => {
  return axios.post(`/personApi/list`, obj)
};
