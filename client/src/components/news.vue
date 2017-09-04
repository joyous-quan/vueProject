<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item href="/">首页</Breadcrumb-item>
                <Breadcrumb-item >新闻模块</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <Modal v-model="modal1" title="信息编辑">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <Form-item label="标题" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入标题"></Input>
                </Form-item>
                <Form-item label="副标题" prop="subTitle">
                    <Input v-model="formValidate.subTitle" placeholder="请输入副标题"></Input>
                </Form-item>
                <Form-item label="内容" prop="desc">
                    <quill-editor
                            :content="formValidate.desc"
                            @change="onEditorChange($event)">
                    </quill-editor>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                </Form-item>
            </Form>
        </Modal>
        <div class="conBox">
            <div class="myTree">
            <Tree :data="baseData" @on-select-change="onSelectChange"></Tree>
            </div>

            <Row class="myTable">
                <Col span="30">
                    <div class="btns">
                        <Input v-model="filter.name" style="width: 200px" placeholder="请输入...">
                        <Button slot="append" icon="ios-search" @click="search"></Button>
                        </Input>
                        <Button type="info" @click="addData" style="marginLeft: 10px">添加数据</Button>
                        <Button type="error" @click="removes" style="marginLeft: 10px">删除数据</Button>
                    </div>
                    <Table border  :columns="columns" :data="list" @on-selection-change="onSelectionChange"></Table>
                    <Page :total="filter.total" show-sizer @on-change="onChangePage" :page-size="filter.limit" :page-size-opts="pageSizeOpts" @on-page-size-change="onPageSizeChange"></Page>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
    import {mapGetters,mapActions}  from "vuex"
    import Base from '../common/base.js'
    import { quillEditor } from 'vue-quill-editor'
    export default {
        mixins: [Base],
        components: {
            quillEditor
        },
        data() {
            return {
                module: 'news',
                baseData:[],
                filter:{
                    cateId:null,
                },
                formValidate: {
                    cateId:null,
                    dataId:'',
                    _id: null,
                    name:'',
                    subTitle:'',
                    desc: '',
                    type:4
                },
                ruleValidate: {
                    name:[{
                        required: true,
                        message: '标题不能为空',
                        trigger: 'blur'
                    }],
                    // subTitle: [{
                    //     required: true,
                    //     message: '副标题不能为空',
                    //     trigger: 'blur'
                    // }],
                    desc: [{
                        required: true,
                        message: '内容不能为空',
                        trigger: 'blur'
                    }]
                },
                columns: [
                    {
                        type: 'selection',
                        align: 'center'
                    },
                    {
                        title: '标题',
                        key: 'name'
                    },
                    // {
                    //     title: '副标题',
                    //     key: 'subTitle'
                    // },
                    {
                        title:'评论数目',
                        key:'commentCount'
                    },
                    {
                    	title:'内容',
                    	key:'desc'

                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
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
                                            this.editData(params.row);
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteData(params.row._id);
                                        }
                                    }
                                }, '删除'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({path:'/comment',query:{_id:params.row._id}})
                                        }
                                    }
                                }, '评论区'),
                            ]);
                        }
                    }
                ]
            }
        },
        created(){
            this.getTreeData()
        },
        methods: {
            onEditorChange({ editor, html, text }) {
                this.formValidate.desc = html
            },
            getTreeData(){
                this.$http.get(`http://localhost:3000/cate/${this.formValidate.type}`).then(res =>{
                    this.baseData = res.data;
                })
            },
            onSelectChange(node) {
                this.formValidate.cateId = node[0]._id;
                this.filter.cateId = node[0]._id;
                this.getData()
            },

        }
    }
</script>
<style>
    .btns{
        display: flex;
        padding: 10px 0px;
    }
    .conBox{
        display: flex;
        margin-top:12px;
    }
    .myTree{
        flex: 1;
        text-align: center;

    }
    .conTree{
        margin-left: 5px;
    }
    .myTable{
        flex: 7;
        margin-right: 12px;
    }
</style>