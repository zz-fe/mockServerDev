<template>
  <div id="app" class="main">
    <MockHead/>
    <router-view/>
    <MockFooter/>
  </div>
</template>

<script>
import MockHead from '@/components/mock/mockHead'
import MockFooter from '@/components/mock/mockFooter'
export default {
  name: 'app',
  components:{MockHead, MockFooter}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
.main{
  height: 100vh;
}
.layout{
  height: calc(100% - 102px);
}
.ivu-row-flex{
  height: 100%
}
</style>
