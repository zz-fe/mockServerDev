<template lang="html">
  <div class="">
     <Tabs v-if='flag'>
        <TabPane label="api信息" icon="social-apple">
             <apiList :doc='doc'></apiList>
             <div @click="handleClick()">
                保存
             </div>
        </TabPane>
        <TabPane label="请求参数" icon="social-windows">
           <request :data='doc.request' :json='doc.requestJson' @send='send'></request>
        </TabPane>
        <TabPane label="响应结果" icon="social-tux">
           <request :data='doc.response' :json='doc.responseJson' @send='send'></request>
        </TabPane>
    </Tabs>

  </div>
</template>

<script>
import apiList from './apiList'
import request from './request'
import { getPersonApiList,getPersonApiSave } from '@/server/personApi'
export default {
  data(){
    return{
      doc:null,
      flag:false
    }
  },
  components:{
    request,
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
      this.flag = false
       let obj = Object.assign({
        projectId:this.$route.params._id,
        _id: this.$route.params._apiId
      },this.obj)
      let res = await getPersonApiList(obj)
      if (res.code) {
        this.doc = res.data
        this.flag = true
      }
    },
    send(data){
      if(data) this.handleClick()
    },
    async handleClick(){
      let data = Object.assign(this.doc,{_id:this.$route.params._apiId})
      let res = await getPersonApiSave(this.doc)
      if(res.code){
        this.$Message.info('保存成功');
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
