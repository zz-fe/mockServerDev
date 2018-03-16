<template lang="html">
  <div class="">
     <Tabs v-if='doc'>
        <TabPane label="api信息" icon="social-apple">
             <apiList :doc='doc'></apiList>
        </TabPane>
        <TabPane label="请求参数" icon="social-windows">
           <request :doc='doc'></request>
        </TabPane>
        <TabPane label="响应结果" icon="social-tux">
            <response :doc='doc'></response>
        </TabPane>
    </Tabs>

  </div>
</template>

<script>
import apiList from './apiList'
import request from './request'
import response from './response'
import { getPersonApiList } from '@/server/personApi'
export default {
  data(){
    return{
      doc:null
    }
  },
  components:{
    request,
    response,
    apiList
  },
  watch: {
   "$route.params":'fetchDate'
  },
   mounted(){
     this.fetchDate();
  },
  methods:{
    async fetchDate(){
      let obj = new Object({
        projectId:this.$route.params._id,
        apiId: this.$route.params._apiId
      })
      let res = await getPersonApiList(obj)
      if (res.code) {
        this.doc = res.data
      }
    }
  }
}
</script>

<style lang="css">
.api-head{
  margin-bottom: 20px;
}
</style>
