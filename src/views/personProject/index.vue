<template lang="html">
  <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
       <Modal
           title="目录管理"
           v-model="modalMenu"
           :mask-closable="false">
           <Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 450px">
                <FormItem
                        v-for="(item, index) in formDynamic.items"
                        :key="menuId"
                        :label="'目录名称'"
                        :prop="'items.' + index + '.value'"
                        :rules="{required: true, message: '当前目录名称不能空', trigger: 'blur'}">
                    <Row>
                        <Col span="16">
                            <Input type="text" v-model="item.value" placeholder="输入目录名称"></Input>
                        </Col>
                        <Col span="2" offset="1" v-if = 'index == 0' >
                          <Button type="dashed" small @click="handleAdd" icon="plus-round"></Button>
                        </Col>
                        <Col span="2" offset="1" v-if = 'index != 0 '>
                          <Button type="error" small @click="handleRemove(index)" icon="trash-a"></Button>
                        </Col>
                    </Row>
                </FormItem>
              </Form>
              <div slot="footer">
                  <Button type="text" size="large" @click="modalMenu = false">取消</Button>
                  <Button type="primary" size="large" @click="handleSubmit('formDynamic')">确定</Button>
              </div>
      </Modal>
      <Modal
          title="接口管理"
          v-model="modalApi"
          :closable="false">
          <Form :model="formItem" :label-width="80" :rules="ruleValidate" ref="formValidate">
            <FormItem label="接口名称" prop="apiName">
                <Input v-model="formItem.apiName" placeholder="请输入项目名称"></Input>
            </FormItem>
            <FormItem label="默认url">
                <Row>
                  <Col span="4">
                      <Input v-model="formItem.url" placeholder="请输入url" disabled></Input>
                  </Col>
                  <Col span="19" offset="1">
                     <Input v-model="formItem.apiUrl" placeholder="请输入url"></Input>
                  </Col>
                </Row>

            </FormItem>
            <FormItem label="选择目录">
              <Select v-model="formItem.modelValue" style="width:200px">
                  <Option v-for="(item, index) in projectAdress" :value="item.menuId" :key="index">{{ item.value }}</Option>
              </Select>
            </FormItem>
            <FormItem label="项目描述">
                <Input v-model="formItem.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
            </FormItem>
          </Form>
        <div slot="footer">
            <Button type="text" size="large" @click="handleReset()">取消</Button>
            <Button type="primary" size="large" @click="handleApiSubmit('formValidate')">确定</Button>
        </div>
      </Modal>
    <!-- 左侧导航 -->
       <Row type="flex">
           <Col :span="spanLeft" class="layout-menu-left">
               <Menu active-name="1" theme="dark" width="auto" @on-select='handleApiClick'>
                   <div class="layout-logo-left"></div>
                   <Submenu :name="index" v-for = '(item,index) in this.formDynamic.items' :key='index' >
                    <template slot="title">
                        <Icon type="ios-paper" :size="iconSize"></Icon>
                        <span class="layout-text">{{item.value}}</span>
                    </template>
                    <!-- <MenuItem :name="index+'-'+ins" v-for = '(child,ins) in item.children' :key='ins'>{{child.apiName}}</MenuItem> -->
                    <MenuItem :name="child._id" v-for = '(child,ins) in item.children' :key='ins'>{{child.apiName}}</MenuItem>
                   </Submenu>
               </Menu>
           </Col>
           <Col :span="spanRight">
               <div class="layout-header">
                   <Button type="text" @click="toggleClick">
                       <Icon type="navicon" size="32"></Icon>
                   </Button>
                   <Button type="text" @click="handleModalMenu()">
                       目录管理
                   </Button>
                   <Button type="text" @click="handleModalApi()">
                       编辑接口
                   </Button>
               </div>
               <div class="layout-content">
                   <div class="layout-content-main">
                        <router-view></router-view>
                   </div>
               </div>
           </Col>
       </Row>
   </div>
</template>


<script>
import { getPersonProjectCreate, getPersonProjectList, getPersonProjectApi}  from '@/server/personProject'
import Api from './children/api.vue'
export default {
       data () {
           return {
               menuId:0,
               spanLeft: 5,
               spanRight: 19,
               modalMenu: false,
               modalApi: false,
               formDynamic: {
                   items:[]
               },
               projectAdress:[],
               formItem:{
                 apiName: '',
                 url:'/api',
                 desc: '',
                 apiUrl:'',
                 modelValue: '',
               },
               ruleValidate:{
                 apiName: [{ required: true,  message: "不能为空",  trigger: 'blur' }],
               },
               projectId:null,
               doc:''
           }
       },
       async mounted(){
          this.projectId = this.$route.params._id
          let res = await getPersonProjectList({ projectId: this.projectId})
          if(res.data._id){
            this.formDynamic.items = res.data.items
            let LastLength = res.data.items.length
            this.menuId = res.data.items[LastLength -1].menuId
          }

       },
       components:{
         Api
       },
       computed: {
           iconSize () {
               return this.spanLeft === 5 ? 14 : 24;
           }
       },
       filters: {
         codeNum(value){
          return JSON.stringify(value)
         },
       },
       methods: {
           toggleClick () {
               if (this.spanLeft === 5) {
                   this.spanLeft = 2;
                   this.spanRight = 22;
               } else {
                   this.spanLeft = 5;
                   this.spanRight = 19;
               }
           },
           handleSubmit (name) {
                this.$refs[name].validate( async (valid) => {
                    if (valid) {
                        let projectId = this.projectId
                        let params = Object.assign(this.formDynamic,{ projectId })
                        let res = await getPersonProjectCreate(params)
                        if (res.code){
                          this.formDynamic.items = res.data
                          this.$Message.success('Success!');
                          this.modalMenu = false
                        }

                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            /**
             * [handleReset 编辑接口取消]
             */
            handleReset () {
                this.modalApi = false;
                for (let key in this.formItem) {
                  this.formItem[key] = ''
                }
            },
            /**
             * [handleAdd 增加目录]
             * @return {[type]} [description]
             */
            handleAdd () {
                this.menuId ++
                this.formDynamic.items.push({
                    value: '',
                    menuId: this.menuId
                });
            },
            handleRemove (index) {
                this.formDynamic.items.splice(index,1);
            },
            /**
             * [lang 目录管理]
             * @type {String}
             */
            async handleModalMenu(){
                this.modalMenu = true
                let projectId = this.projectId
                let res = await getPersonProjectList({ projectId })
                if (res.data._id) {
                  this.formDynamic.items = res.data.items
                  let LastLength = res.data.items.length
                  this.menuId = res.data.items[LastLength -1].menuId
                }else{
                  this.menuId = 1
                  this.formDynamic.items = [{value:'',menuId:1}]
                }
            },
            /**
             * [handleModalApi 编辑接口]
             * @return {[type]} [description]
             */
            handleModalApi(){
              this.modalApi = true
              this.projectAdress = this.formDynamic.items
            },

            /**
             * [handleApiSubmit 保存接口]
             * @return {[type]} [description]
             */
            handleApiSubmit(name){
              this.$refs[name].validate( async (valid) => {
                  if (valid) {
                      let projectId = this.projectId
                      let params = Object.assign( this.formItem,{ projectId } )
                      let res = await getPersonProjectApi(params)
                      if(res.code){
                        this.formDynamic.items = res.data
                        this.modalApi = false;
                        //数据库生成ID
                        this.handleReset();
                        this.$Message.success('Success!');
                      }

                  } else {
                      this.$Message.error('Fail!');
                  }
              })
            },
            /**
             * [handleApiClick 点击跳转导航]
             * @return {[type]} [description]
             */
             handleApiClick(apiId){
                let obj = new Object({
                  projectId:this.projectId,
                  apiId:apiId
                })
                this.$router.push({path:`/personProject/${obj.projectId}/add/${obj.apiId}`})

            }

       }
   }
</script>

<style lang="css">
.layout-breadcrumb{
    padding: 10px 15px 0;
}
.layout-content{
    min-height: 200px;
    margin: 1px 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
}
.layout-content-main{
    padding: 10px;
}
.layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}
.layout-menu-left{
    background: #464c5b;
}
.layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
}
.layout-ceiling-main a{
    color: #9ba7b5;
}
.layout-hide-text .layout-text{
    display: none;
}
.ivu-col{
    transition: width .2s ease-in-out;
}
</style>
