<template lang="html">
    <div class="">
        <Form :label-width="100">
             <FormItem label="API名字">
                 <Input v-model="doc.apiName" placeholder="Enter something..."></Input>
             </FormItem>
              <FormItem label="url">
                <Input v-model="doc.apiUrl">
                    <span slot="prepend">/api</span>
                    <span slot="append">复制</span>
                </Input>
              </FormItem>
              <FormItem label="请求方式">
                <Select v-model="doc.methods" style="width:200px">
                   <Option v-for="item in requestMethods" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
              </FormItem>
              <FormItem label="Content-Type">
                <Select v-model="doc.ContentType" style="width:200px">
                   <Option v-for="item in requestHead" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
              </FormItem>
              <FormItem label="开启mock">
                <RadioGroup v-model="doc.isMock">
                    <Radio label= 0 >否</Radio>
                    <Radio label= 1 >是</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="备注">
                  <Input v-model="doc.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
              </FormItem>
          </Form>
    </div>
</template>

<script>
import head from '@/request/head'
import methods from '@/request/methods'
export default {
    props:['doc'],
    data(){
      return {
        requestHead: head,
        requestMethods:methods,
      }
    }
}
</script>

<style lang="css">
</style>
