<template>
    <div>
        <div class="layout-content">
            <h1 @click='modal = true'>新建项目</h1>
            <Modal
              v-model="modal"
              :closable="false"
              :title="init">
              <Form :model="formItem" :label-width="80" :rules="ruleValidate" ref="formValidate">
                <FormItem label="项目名称" prop="projectName">
                    <Input v-model="formItem.projectName" placeholder="请输入项目名称"></Input>
                </FormItem>
                <FormItem label="默认url">
                    <Input v-model="formItem.url" placeholder="请输入url" disabled></Input>
                </FormItem>
                <FormItem label="项目描述">
                    <Input v-model="formItem.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="handleCancel">取消</Button>
                <Button type="primary" size="large" @click="handleSubmit('formValidate')">确定</Button>
            </div>
          </Modal>
            <div class="layout-content-main">
              <Row :gutter="16">
                <Col span="6" v-for="(item,index) in projectList" :key='index'>
                  <Card>
                     <p slot="title">
                         <Icon type="person"></Icon>
                         Classic film
                     </p>
                     <span slot="extra" @click.prevent="handleClickEdit(item._id)" class="icon-edit mr10">
                        <Icon type="edit"></Icon>
                     </span>
                     <span slot="extra" @click.prevent="handleClickDelect(item)" class="icon-err">
                         <Icon type="trash-a"></Icon>
                     </span>
                     <ul class="admin-info" @click='handlePath(item._id)'>
                         <li>
                            <label>项目名称</label>
                            <span>{{item.projectName}}</span>
                         </li>
                         <li >
                            <label>项目描述</label>
                            <span>{{item.desc}}</span>
                         </li>
                         <li >
                            <label>项目时间</label>
                            <span>{{item.createTime}}</span>
                         </li>
                     </ul>
                 </Card>
                </Col>
             </Row>
            </div>
        </div>
    </div>
</template>

<script>
import {getPersonCreate, getPersonUpdate, getPersonList, getPersonDelect, getPersonModify} from '@/server/person'
export default {
  data(){
    let update =  async (rule, value, callback) => {
        let res = await getPersonUpdate({ projectName : value })
        res.code ? callback() : callback(new Error('项目名称已经存在'));
      };
    return{
      modal:false,
      init:'新建项目',
      formItem:{
        projectName: '',
        url:'/api',
        desc: '',
        _id:''
      },
      ruleValidate:{
        projectName: [{ required: true,  validator: update,  trigger: 'blur' }],
      },
      projectList:[]
    }
  },
  mounted(){
    this.getList()
  },
  methods:{
    async getList(){
      let res = await getPersonList() 
      console.log(res)
      res.code ? this.projectList = res.data : this.projectList = []
    },

    /**
     * [handleClickDelect 删除项目]
     * @param  {[type]} id [当前项目id]
     * @return {[type]}    [success]
     */
    handleClickDelect(item){
      let config = {
        title: `确定删除`,
        content: `<p>是否删除${item.projectName}项目</p>`,
         onOk: async () => {
             let res = await getPersonDelect({ _id : item._id })
             if (res.code) {
               this.$Message.success('删除成功');
               this.projectList.forEach((val,index)=>{
                 if (item._id == val._id) {
                   this.projectList.splice(index,1)
                 }
               })
             }

         },
         onCancel: () => {
             this.$Message.info('成功取消');
         }
      }
      this.$Modal.confirm(config)
    },
    /**
     * [handleClickEdit 修改项目]
     * @return {[type]} [description]
     */
    async handleClickEdit(id){
      let res =  await getPersonModify({_id: id})
      if (res.code) {
        this.modal = true
        this.init = '修改项目'
        this.formItem.projectName = res.data.projectName
        this.formItem.desc = res.data.desc
        this.formItem._id = res.data._id
      }

    },
    /**
     * [handleClickAdd 新建项目]
     * @return {[type]} [description]
     */
     handleSubmit(name){
      this.init = '新建项目'
      if(this.formItem.projectName){
        this.$refs[name].validate(async (valid) => {
             if (valid) {
                 let res = await getPersonCreate(this.formItem)
                 res.code ? this.modal = false : this.modal = true
                 this.getList()
             }
        })
      }
    },
    /**
     * [handleCancel 关闭窗口]
     * @return {[type]} [description]
     */
    handleCancel(){
      this.formItem.projectName = ''
      this.formItem.desc = ''
      this.formItem._id = ''
      this.init = '新建项目'
      this.modal = false
    },
    /**
     * [handlePath 跳转页面]
     * @return {[type]} [description]
     */
    handlePath(id){
       this.$router.push({ path: `/personProject/${id}/list`})
    }

  }
}
</script>


<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
    }
    .layout-assistant{
        width: 300px;
        margin: 0 auto;
        height: inherit;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 5px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 5px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    /**
     *
     *  页面信息
     */
    .admin-info {
      font-size: 12px;
      cursor: pointer;
    }
    .admin-info li span{
      margin-left: 15px;
    }
</style>
