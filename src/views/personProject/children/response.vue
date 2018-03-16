<template lang="html">
  <div class="">
    <Row>
      <Col span="2">响应结果</Col>
      <Col span="20">
         <div class="api-head">
           <RadioGroup v-model="doc.responseRadio">
             <Radio label="edit">
                 <!-- <Icon type="social-apple"></Icon> -->
                 <span>输入模式</span>
             </Radio>
             <Radio label="jsonEdit">
                 <!-- <Icon type="social-android"></Icon> -->
                 <span>编辑器模式</span>
             </Radio>
         </RadioGroup>
         </div>
         <div class="" v-if="doc.responseRadio == 'edit' ">
           <Form>
                <FormItem
                        v-for="(item, index) in doc.response"
                        :key="index"  >
                    <Row>
                        <Col span="7">
                            <Input type="text" v-model="item.key" placeholder="输入目录名称"></Input>
                        </Col>
                        <Col span="1"><div class="">——</div></Col>
                        <Col span="7">
                            <Input type="text" v-model="item.value" placeholder="输入目录名称"></Input>
                        </Col>
                        <Col span="1" offset="1" v-if = 'index == 0' >
                          <Button type="dashed" small @click="handleResAdd" icon="plus-round"></Button>
                        </Col>
                        <Col span="1" offset="1" v-if = 'index != 0 '>
                          <Button type="error" small @click="handleResRemove(index)" icon="trash-a"></Button>
                        </Col>
                    </Row>
                </FormItem>
              </Form>
         </div>
         <div class="" v-if="doc.responseRadio == 'jsonEdit' ">
             还没开发完呢！~~~~
         </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import types from '@/request/type'
export default {
  props:[
    'doc'
  ],
  data(){
    return{
      types:types,
      isMust:[
        {
          "label":"必须",
          "value":"必须"
        },
        {
          "label":"不必须",
          "value":"不必须"
        },
      ],
    }
  },
  methods:{
    handleResAdd(){
      this.doc.response.push({
        key:'',
        value:''
      })

    },
    handleResRemove(index){
      this.doc.response.splice(index,1)
    }
  }
}
</script>
</script>

<style lang="css">
</style>
