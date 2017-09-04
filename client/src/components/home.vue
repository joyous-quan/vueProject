<template>
    <div>
        <div class="myHome">
                <Breadcrumb-item href="#/" >首页</Breadcrumb-item>
        </div>
        <Collapse v-model="value2" accordion>
            <Panel name="1">
                HTML5
                <p slot="content">
                    HTML5是HTML最新的修订版本，2014年10月由万维网联盟（W3C）完成标准制定。
                    <br>HTML5的设计目的是为了在移动设备上支持多媒体。
                </p>
            </Panel>
            <Panel name="2">
                CSS
                <p slot="content">
                    CSS 指层叠样式表 (Cascading Style Sheets)
                    <br>通过使用 CSS 我们可以大大提升网页开发的工作效率！
                    <br>CSS 规则由两个主要的部分构成：选择器，以及一条或多条声明;
                </p>
            </Panel>
            <Panel name="3">
                JavaScript
                <p slot="content">
                    JavaScript 是脚本语言
                    <br> JavaScript 是一种轻量级的编程语言。
                    <br>JavaScript 是可插入 HTML 页面的编程代码。
                    <br>JavaScript 插入 HTML 页面后，可由所有的现代浏览器执行。
                </p>
            </Panel>
            <Panel name="4">
                jQuery
                <p slot="content">
                    jQuery 是一个 JavaScript 库。
                    <br>jQuery 极大地简化了 JavaScript 编程。
                </p>
            </Panel>
            <Panel name="5">
                Vue
                <p slot="content">
                    Vue.js（读音 /vjuː/, 类似于 view） 是一套构建用户界面的渐进式框架。
                    <br>Vue 只关注视图层， 采用自底向上增量开发的设计。
                    <br>Vue 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件。
                </p>
            </Panel>
            <Panel name="6">
                iview
                <p slot="content">
                    iview一套基于 Vue 的高质量 UI 组件库
                    <br>iView 主要服务于 PC 界面的中后台业务，是一套高质量的开源 UI 组件库。
                    <br>特性：<br>使用单文件的 Vue 组件化开发模式；
                            <br>基于 npm + webpack + babel 开发，支持 ES2015；
                            <br>高质量、功能丰富；
                            <br>友好的 API ，自由灵活地使用空间；
                            <br>详细、友好的文档，事无巨细。
                </p>
            </Panel>
        </Collapse>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                value2: '1'
            }
        }
    }
</script>

<style scoped>

    .myHome{
       margin-bottom: 12px;
    }

</style>