<template lang="html">
    <div class="req">
      <Row>
          <Col span="24">
             <div class="api-head">
               <RadioGroup v-model="pattern">
                 <Radio label="edit"> 
                     <span>输入模式</span>
                 </Radio>
                 <Radio label="jsonEdit">
                     <span>编辑器模式</span>
                 </Radio> 
             </RadioGroup>
             </div>
             <div class="" v-show="pattern == 'edit' ">
                <Row class="req-hd">
                    <Col span="4">名称</Col>
                    <Col span="5">类型</Col>
                    <Col span="4">含义</Col>
                    <Col span="3">是否必须</Col>
                    <Col span="4">默认值</Col>
                    <Col span="4">备注</Col>
                </Row>
                <Row   v-for="(item, index) in data"
                  :key="index" class="req-data">
                  <Row>
                    <Col span="4">
                        <Input type="text" v-model="item.key" placeholder="名称"></Input>
                    </Col>
                    <Col span="5" class='ml10'>
                      <Select v-model="item.typeValue" @on-change='handleChane(item)'>
                          <Option v-for="(item, index) in types" :value="item.typeValue" :key="index">{{ item.typeValue }}</Option>
                      </Select>
                    </Col>
                    <Col span="4" class='ml10'>
                        <Input type="text" v-model="item.content" placeholder="含义"></Input>
                    </Col>
                    <Col span="3" class='ml10'>
                      <Select v-model="item.valueMust">
                          <Option v-for="(item, index) in isMust" :value="item.valueMust" :key="index">{{ item.valueMust }}</Option>
                      </Select>
                    </Col>
                     <Col span="2" class='ml10'>
                         <Input type="text" v-model="item.value" placeholder="默认值" 
                          v-if = "item.typeValue == 'Number' ||  item.typeValue == 'Boolean' || item.typeValue == 'String' || item.typeValue == 'Array[String]' || 
                           item.typeValue == 'Array[Number]' "
                         ></Input>
                         <span class='req-btn' @click="handleReq(index,item)" 
                          v-else
                         >. . .</span>
                    </Col>
                    <Col span="4" class='ml10'>
                        <Input type="text" v-model="item.desc" placeholder="备注"></Input>
                    </Col>
                    <Col span="1" class='ml10' v-if = 'index != 0 '>
                      <Button type="error" small @click="handleReqRemove(index)" icon="trash-a"></Button>
                    </Col>
                     <!--弹窗!--> 
                    <Modal
                        v-model="form.madal"
                        :title="form.title"
                        width='900'
                        @on-ok="ok(item)"
                        @on-cancel="cancel">
                        <reqList :data='form.data' v-if='form.data'></reqList>
                    </Modal>
                  </Row>
                </Row>
                <Row >
                  <Col span="20">
                     <Button  size="large" @click="handleReqAdd">增加</Button>
                     <Button  size="large" @click='handleShow'>范例展示</Button>
                  </Col>
                </Row>
               
            <Row>
                  <Col span="20">
                    <vue-json-editor v-model="editorContent" :showBtns="false"  @json-change="onJsonChange"></vue-json-editor>
                  </Col>
            </Row>  
           
            <!--编辑器!--> 
             </div>
             <div class="" v-show="pattern == 'jsonEdit' ">
                <Row >
                  <Col span="20">
                  <vue-json-editor v-model="editorContent" :showBtns="false" @json-change="onJsonChange"></vue-json-editor>
                  </Col>
                </Row>
             </div>
          </Col>
       </Row>         
    </div>
</template>

<script>
import types from '@/request/type'
import isMust from '@/request/isMust'
import reqList from '@/components/common/reqList'
import vueJsonEditor from 'vue-json-editor'
export default {
  props:['data'],
  components: {
    reqList,
    vueJsonEditor
  },
  data(){
    return{
      pattern: 'edit',
      types:types,
      isMust:isMust,
      editorContent:null,
      form:{
        madal : false,
        title : '',
        data : ''
      },
    }
  },
  mounted(){
    
  },
  methods:{
    onJsonChange (value) {
        console.log('value:', value)
      },
    handleReqAdd(){
      this.data.push({
        key:'',
        typeValue:"String",
        content:'',
        valueMust:"必须",
        desc:'',
        value:null,
        modal:false,
      })
    },
    handleReqRemove(index){
      this.data.splice(index,1)
    },
    /**
     * [handleShow 范围展示]
     * @return {[type]} [description]
     */
    handleShow(){
      let res = this.reducer(this.data)
        this.editorContent = res
    },
    reducer(data,parentKey = {}){
      data.forEach((item)=>{
          let target = item.key 
          if(item.typeValue == 'Object' && target){
            parentKey[target] = {}
            if(item.value.length != 0) this.reducer(item.value,parentKey[target])
          }
          if(item.typeValue == 'String' && target){
              parentKey[target] = item.value || ''
          }
      })
      return parentKey
   }, 
    /**
     * handleReq 打开弹窗 
     */
    handleReq(index,item){
        this.form.madal = true 
        this.form.title = item.key 
        if(item.value == null || {}){
                this.form.data = [{
                key:'',
                typeValue:"String",
                content:'',
                valueMust:"必须",
                desc:'',
                value:null,
                modal:false,
             }]
        }else{
            this.form.data = item.value
        }
    },
    handleChane(item){
       if(item.typeValue == 'Number' || 'String' || 'Boolean')  item.value = '' 
       if(item.typeValue == 'Object') item.value = []
    },
    ok (item) {
        item.value = this.form.data
        console.log(item.value)
        this.$Message.info('创建成功');
    },
    cancel () {
        this.form.madal = false
        this.$Message.info('取消操作');
    }
  }
}
</script>

<style lang="css">
.req-hd{
  background: #ddd;
  height: 30px;
  line-height: 30px;
}
.req-hd .ivu-col{
  padding-left: 15px;
}
.ml10{
  padding-left: 10px;
}
.req-data{
  padding: 5px;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.req-data:last-child{
  border-bottom: 1px solid #ddd;
}
.object{
  background: #87d55b;
  padding-left: 10px;
}
.object-icon{
  font-size: 15px;
  line-height: 2;
}
.array{
  background: #57aef1;
  padding-left: 10px;
}
.req-btn{
    width: 100%;
    color:#000;
    background: #ddd;
    display: inline-block;
    height: 30px;
    border-radius:5px;
    text-align:center;
    font-size:20px;
    cursor:pointer;
}
</style>
