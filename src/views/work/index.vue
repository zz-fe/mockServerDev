<template>
    <div class="">
      <div class="">
        <Select style="width:200px" @on-change='handleChange'>
          <Option v-for="item in projectList" :value="item._id" :key="item._id">{{ item.projectName }}</Option>
        </Select>
        <Select style="width:200px" @on-change='handleMenuChange'>
          <Option v-for="item in menuList" :value="item.menuId" :key="item.menuId">{{ item.value }}</Option>
        </Select>
      </div>
      <Table border :columns="columns" :data="data"></Table>
    </div>
</template>
<script>
    import {getPersonList} from '@/server/person'
    import {getWorkList,getWorkMenuList} from '@/server/work'
    export default {
        data () {
            return {
              projectList: [],
              menuList:[],
              form:{
                projectId:'',
                menuId:''
              },
                columns: [
                    {
                        title: 'api名称',
                        key: 'apiName'
                    },
                    {
                        title: 'apiUrl',
                        key: 'apiUrl'
                    },
                    {
                        title: 'methods',
                        key: 'methods'
                    },
                    {
                        title: 'ContentType',
                        key: 'ContentType'
                    },
                    {
                        title: '连接结果',
                        key: 'isMock'
                    },
                    {
                        title: 'desc',
                        key: 'desc'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, 'View'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ],
                data: []
            }
        },
        mounted(){
          this.init()
        },
        methods: {
            async init(){
              //获取项目
              let res = await getPersonList()
              if(res.code){
                this.projectList = res.data
              }
            },
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
            async handleChange(id){
              this.form.projectId = id
              let res = await getWorkMenuList({projectId:id})
              if(res.code){
                this.menuList = res.data.items
              }
            },
            async handleMenuChange(menuId){
              this.form.menuId = menuId
              let res = await getWorkList(this.form)
              this.data = res.data
            }
        }
    }
</script>
