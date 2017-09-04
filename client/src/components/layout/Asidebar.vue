<template>
  <Menu active-name="1" theme="dark" width="auto">
        <div class="layout-logo-left"></div>
        <Menu-item name="1">
             <router-link to="/" activeClass="active" exact><Icon type="home" :size="iconSize"></Icon></router-link>
            <span class="layout-text"> <router-link to="/" activeClass="active" exact>首页</router-link></span>
        </Menu-item>
        <Menu-item name="2">
            <router-link to="/user" activeClass="active"><Icon type="person" :size="iconSize"></Icon></router-link>
            <span class="layout-text"> <router-link to="/user" activeClass="active">用户模块</router-link></span>
        </Menu-item>
        <Menu-item name="5">
            <router-link to="/cate" activeClass="active"><Icon type="social-rss" :size="iconSize"></Icon></router-link>
            <span class="layout-text"> <router-link to="/cate" activeClass="active">分类模块</router-link></span>
        </Menu-item>
        <Menu-item name="3">
            <router-link to="/log" activeClass="active"><Icon type="social-wordpress" :size="iconSize"></Icon></router-link>
            <span class="layout-text"> <router-link to="/news" activeClass="active">新闻模块</router-link></span>
        </Menu-item>
        <Menu-item name="4">
            <router-link to="/upload" activeClass="active"><Icon type="upload" :size="iconSize"></Icon></router-link>
            <span class="layout-text"> <router-link to="/upload" activeClass="active">上传模块</router-link></span>
        </Menu-item>

        <Menu-item name="6">
            <router-link to="/login" activeClass="active"><Icon type="social-github" :size="iconSize"></Icon></router-link>
            <span class="layout-text" @click="exit"> 退出登录</span>
        </Menu-item>
    </Menu>
</template>
<script>
    export default {
        props:['spanLeft','iconSize'],
        methods:{
            exit(){
                this.$store.dispatch("checkLogin",false)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .active{
        color:white!important;
    }
</style>