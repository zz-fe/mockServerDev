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
                <Col span="1" class='ml10' >
                    <Button type="success" small @click="handleReqAdd" v-if = 'index == 0 ' icon="plus-round" ></Button>
                    <Button type="error" small @click="handleReqRemove(index)" v-if = 'index != 0' icon="trash-a"></Button>
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
    </div>
</template>
<script>
import types from '@/request/type'
import isMust from '@/request/isMust'
export default {
       name:"reqList",
       props:['data'] ,
       data(){
        return{
            types:types,
            isMust:isMust,
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
            this.data.splice(index,1)
        },
        ok(item) {
            item.value = this.form.data
            this.$Message.info('创建成功');
        },
        cancel () {
            this.$Message.info('取消操作');
        },
        handleChane(item){
             if(item.typeValue == 'Number' || 'String' || 'Boolean') item.value = '' 
             if(item.typeValue == 'Object') item.value = []
        },
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
    },
       
}
</script>
<style>
    .mt20{
        margin-top:20px;
    }
</style>