<template>
    <div>
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
                <Col span="5" class='ml10' >
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
                <req-list :data='form.data' v-if='form.data'></req-list>
                </Modal>
             </Row>
        </Row>
       
        <Col span="20">
            <Button  size="large" @click="handleReqAdd">增加</Button>
        </Col>
    </div>
</template>
<script>
import types from '@/request/type'
export default {
       name:"reqList",
       props:['data'] ,
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
            form:{
                madal : false,
                title : '',
                data : ''
            }
        
        }
       },
       methods:{
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
            this.data.request.splice(index,1)
        },
        ok(item) {
            item.value = this.form.data
            this.$Message.info('Clicked ok');
        },
        cancel () {
            this.$Message.info('Clicked cancel');
        },
        handleChane(item){
             if(item.typeValue == 'Number' || 'String' || 'Boolean') item.value = '' 
        },
        handleReq(index,item){
            this.form.madal = true 
            this.form.title = item.key
            this.form.data = item.value || [{
                key:'',
                typeValue:"String",
                content:'',
                valueMust:"必须",
                desc:'',
                value:null,
                modal:false,
            }]
         },
    },
       
}
</script>