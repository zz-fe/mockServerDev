<template lang="html">
    <div class="req">
      <Row>
          <Col span="24">
             <div class="api-head">
               <RadioGroup v-model="doc.requestRadio">
                 <Radio label="edit"> 
                     <span>输入模式</span>
                 </Radio>
                 <Radio label="jsonEdit">
                     <span>编辑器模式</span>
                 </Radio>
             </RadioGroup>
             </div>
             <div class="" v-if="doc.requestRadio == 'edit' ">
                <Row class="req-hd">
                    <Col span="4">名称</Col>
                    <Col span="5">类型</Col>
                    <Col span="4">含义</Col>
                    <Col span="3">是否必须</Col>
                    <Col span="4">默认值</Col>
                    <Col span="4">备注</Col>
                </Row>
                <Row   v-for="(item, index) in doc.request"
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
                          v-if = "item.typeValue == 'Number' ||  item.typeValue == 'Boolean' || item.typeValue == 'String'"
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
                        width='800'
                        @on-ok="ok(item)"
                        @on-cancel="cancel">
                        <reqList :data='form.data' v-if='form.data' @resultInfo='result'></reqList>
                    </Modal>
                  </Row>
                </Row>
                <Row >
                  <Col span="20">
                     <Button  size="large" @click="handleReqAdd">增加</Button>
                     <Button  size="large" @click='handleShow'>范例展示</Button>
                  </Col>
                </Row>
               
                
                <!--编辑器!-->
                <Row >
                  <Col span="20">
                    <editor v-model="content" @init="editorInit();"  lang="html" height="150"  theme="chrome" id='editor'></editor>
                  </Col>
                </Row>
             </div>
             <div class="" v-if="doc.requestRadio == 'jsonEdit' ">
                 还没开发完呢！~~~~
             </div>
          </Col>
       </Row>


         
    </div>
</template>

<script>
import types from '@/request/type'
import reqList from '@/components/common/reqList'
export default {
  props:[
    'doc'
  ],
  components: {
    reqList,
    editor:require('vue2-ace-editor')
  },
  data(){
    return{
      types:types,
      isMust:[
        {
          "label":"必须",
          "valueMust":"必须"
        },
        {
          "label":"不必须",
          "valueMust":"不必须"
        },
      ],
      content:'',
      form:{
        madal : false,
        title : '',
        data : ''
      },
      
    }
  },
  mounted(){
      this.content = this.formatJson({"id":"1","tagName":"apple"})
  },
  methods:{
    handleReqAdd(){
      this.doc.request.push({
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
      this.doc.request.splice(index,1)
    },
    /**
     * [handleShow 范围展示]
     * @return {[type]} [description]
     */
    handleShow(){
      console.log(this.doc)
      let obj = {}
      this.doc.request.forEach((item) => {
          if (!item.key) return false
          obj[item.key] =  ''
      })
      this.content = this.formatJson(obj)
    },
    /**
     * handleReq 打开弹窗 
     */
    handleReq(index,item){
        this.form.madal = true 
        this.form.title = item.key
        this.form.data = item.value  || [{
            key:'',
            typeValue:"String",
            content:'',
            valueMust:"必须",
            desc:'',
            value:null,
            modal:false,
        }]
    },
    handleChane(item){
       if(item.typeValue == 'Number' || 'String' || 'Boolean') item.value = '' 
    },
    ok (item) {
        //this.form.madal = false 
        item.value = this.form.data
        this.$Message.info('Clicked ok');
    },
    cancel () {
        this.form.madal = false
        this.$Message.info('Clicked cancel');
    },
    //子集给父级传递的数据
    result(data){
       console.log(data,'11111111')
    },
    editorInit(){
      require('vue2-ace-editor/node_modules/brace/mode/html');
      require('vue2-ace-editor/node_modules/brace/mode/json');
      require('vue2-ace-editor/node_modules/brace/mode/groovy');
      require('vue2-ace-editor/node_modules/brace/theme/chrome');
    },
    formatJson(json, options){
          var reg = null,
          formatted = '',
          pad = 0,
          PADDING = '';
          options = options || {};
          options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;

          options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;


          if (typeof json !== 'string') {

          json = JSON.stringify(json);
          } else {

          json = JSON.parse(json);
          json = JSON.stringify(json);
          }

          reg = /([\{\}])/g;
          json = json.replace(reg, '\r\n$1\r\n');


          reg = /([\[\]])/g;
          json = json.replace(reg, '\r\n$1\r\n');


          reg = /(\,)/g;
          json = json.replace(reg, '$1\r\n');


          reg = /(\r\n\r\n)/g;
          json = json.replace(reg, '\r\n');


          reg = /\r\n\,/g;
          json = json.replace(reg, ',');


          if (!options.newlineAfterColonIfBeforeBraceOrBracket){
          reg = /\:\r\n\{/g;
          json = json.replace(reg, ':{');
          reg = /\:\r\n\[/g;
          json = json.replace(reg, ':[');
          }
          if (options.spaceAfterColon) {
          reg = /\:/g;
          json = json.replace(reg, ': ');
          }
          json.split('\r\n').forEach(function( node,index){
            var i = 0,
            indent = 0,
            padding = '';
            if (node.match(/\{$/) || node.match(/\[$/)) {
            indent = 1;
            } else if (node.match(/\}/) || node.match(/\]/)) {
            if (pad !== 0) {
              pad -= 1;
            }
            } else {
            indent = 0;
            }

            for (i = 0; i < pad; i++) {
            padding += PADDING;
            }

            formatted += padding + node + '\r\n';
            pad += indent;

          })

          return formatted;
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
