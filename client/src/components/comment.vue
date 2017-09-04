<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item href="/">首页</Breadcrumb-item>
                <Breadcrumb-item href="/news">新闻模块</Breadcrumb-item>
                <Breadcrumb-item>新闻评论</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <Modal v-model="modal1" title="添加评论">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <Form-item label="用户" prop="name">
                    <Input v-model="formValidate.name" placeholder="用户名"></Input>
                </Form-item>
                <Form-item label="内容" prop="desc">
                    <quill-editor
                            :content="formValidate.desc"
                            @change="onEditorChange($event)">
                    </quill-editor>
                </Form-item>
                <Form-item label="评分" prop="star">
                    <Rate allow-half v-model="formValidate.star"></Rate>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                </Form-item>
            </Form>
        </Modal>
        <Row>
            <Col span="30">
                <div class="btns">
                    <Input v-model="filter.name" style="width: 200px" placeholder="请输入...">
                    <Button slot="append" icon="ios-search" @click="search"></Button>
                    </Input>
                    <Button type="info" @click="addData" style="marginLeft: 10px">添加评论</Button>
                    <Button type="error" @click="removes" style="marginLeft: 10px">删除评论</Button>
                </div>
                <Table border  :columns="columns" :data="list" @on-selection-change="onSelectionChange"></Table>
                <Page :total="filter.total" show-sizer @on-change="onChangePage" :page-size="filter.limit" :page-size-opts="pageSizeOpts" @on-page-size-change="onPageSizeChange"></Page>
            </Col>
        </Row>
    </div>
</template>
<script>
    import {mapGetters,mapActions}  from "vuex";
    import Base from '../common/base.js'
    import { quillEditor } from 'vue-quill-editor'
    export default {
        mixins: [Base],
        components: {
            quillEditor
        },
        computed: {
            ...mapGetters(["username"]),
        },
        methods:{
            onEditorChange({ editor, html, text }) {
                this.formValidate.desc = html
            }
        },
        created(){
          this.formValidate.newsId = this.$route.query._id;
          this.filter.newsId = this.$route.query._id;
          this.getData();
        },
        data() {
            return {
                module:'comment',
                baseData: [],
                filter:{
                    newsId: ''
                },
                formValidate: {
                    dataId:'',
                    name:"",
                    desc: '',
                    star:0,
                    newsId:'',
                    cateId:''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请输入评论', trigger: 'blur' },
                        { type: 'string', min: 20, message: '评论不能少于20字', trigger: 'blur' }
                    ]
                },
                columns: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '评分',
                        key: 'star',
                        render (h,params) {
                            return `${ params.row.star} / 5`
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.editData(params.row)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteData(params.row._id)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ]
            }
        }
    }
</script>
<style scoped>
    .ivu-page{
        margin: 10px 0;
        float: right;
    }
    .btns{
        display:flex;
        padding:10px 0;

    }
</style>