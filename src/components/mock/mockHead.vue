<template lang="html">
  <div class="">
    <Menu mode="horizontal" theme="dark" active-name="1">
        <div class="layout-logo"></div>
        <div class="layout-nav">
            <MenuItem name="1">
                <Icon type="ios-navigate"></Icon>
                <router-link :to="{ path: '/', params: {} }">我的项目<span></span></router-link>
            </MenuItem>
            <MenuItem name="2">
                <Icon type="ios-navigate"></Icon>
                <router-link :to="{ path: '/', params: {} }">团队项目<span></span></router-link>
            </MenuItem>
            <!-- <MenuItem name="3">
                <Icon type="ios-keypad"></Icon>
                <router-link :to="{ path: '/work', params: {} }">工作台<span></span></router-link>
            </MenuItem> -->
            <MenuItem name="4">
                <Icon type="ios-analytics"></Icon>
                <router-link :to="{ path: '/doc', params: {} }">文档<span></span></router-link>
            </MenuItem>
            <MenuItem name="5">
                <Icon type="ios-paper"></Icon>
                <router-link :to="{ path: '/help', params: {} }">关于我们<span></span></router-link>
            </MenuItem>
        </div>
    </Menu>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.layout-nav{
  margin-left: 400px;
}
</style>
