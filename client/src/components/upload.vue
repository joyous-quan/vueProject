<template>
  <div>
    <Breadcrumb>
        <Breadcrumb-item href="/">首页</Breadcrumb-item>
        <Breadcrumb-item>上传管理</Breadcrumb-item>
    </Breadcrumb>
    <div class="conBox">
        <div class="myTree">
         	<Tree :data="baseData" @on-select-change="onSelectChange"></Tree>
            <Upload
                ref="upload"
                name="avatar"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="1024"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                type="drag"
                :action="postUrl"
                style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="camera" size="20"></Icon>
                </div>

            </Upload>
        </div>
        <div class="myTable">
            <div class="btns">
                <Input v-model="filter.originalname" style="width: 200px" placeholder="请输入...">
                	<Button slot="append" icon="ios-search" @click="search"></Button>
                </Input>
                <Button type="info" @click="addData" style="marginLeft: 10px">添加数据</Button>
                <Button type="error" @click="removes" style="marginLeft: 10px">删除数据</Button>
            </div>


            <Table border  :columns="columns" :data="list" @on-selection-change="onSelectionChange"></Table>
        </div>
    </div>
    <Page :total="filter.total" show-sizer @on-change="onChangePage" :page-size="filter.limit" :page-size-opts="pageSizeOpts" @on-page-size-change="onPageSizeChange"></Page>
  </div>
</template>
<script>
	import Base from '../common/base.js';
    export default {
    	mixins: [Base],
        data () {
            return {
            	module: 'uploads',
                baseData:[],
                uploadList: [],
                filter:{
                	originalname:null,
                 	cateId:0
                },
                columns: [{
                    type: 'selection',
                    width:100,
                    align: 'center'
                },
                	{
                        title: '原始名称',
                        width:120,
                        key: 'originalname'
                    },
                    {
                        title: '文件大小',
                        width:120,
                        key: 'size'
                    },
                    /*{
                    	title:'文件名称',
                    	key:'filename',
                    	width:120
                    },*/
                    {
                        title: '文件内容',
                        key: 'path',
                        width: 120,
                        render (h,params) {
                            return h('img',{
                                attrs:{
                                    src:`http://localhost:3000/${params.row.filename}`,
                                    width:50,
                                    height:50
                                }
                            });
                        }
                    },
                    {
                        title: '上传时间',
                        key: 'date',
                        width:180,
                        render (h,params) {
                            return `${ new Date(params.row.date).toLocaleString() }`;
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
                                            this.editData(params.row);
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
                                            this.deleteData(params.row._id);
                                        }
                                    }
                                }, '删除')

                            ]);
                        }
                    }
                ]
            }
        },
        methods: {
            handleSuccess (res, file) {
                console.log(res);
                this.getData();
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 1M。'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 5 张图片。'
                    });
                }
                return check;
            },
            getTreeData(){
              this.$http.get(`http://localhost:3000/cate/2`)
              .then(res=>{
                this.baseData = res.data;
              })
            },
            onSelectChange(node){
              this.filter.cateId = node[0]._id;
              this.getData();
            }
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;
        },
        computed:{
          postUrl(){
            // 要把分类的id是不是也要传递过去的？
            return `http://localhost:3000/uploads/filedata/${this.filter.cateId}`
          }
        },
        created(){
          this.getTreeData()
        }
    }
</script>

<style>
    .ivu-page{
        margin: 10px 0;
        float: right;
    }
    .btns{
        display:flex;
        padding:10px 0;
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
