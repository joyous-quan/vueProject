<template>
	<div>
        <Breadcrumb>
          <Breadcrumb-item href="/">首页</Breadcrumb-item>
          <Breadcrumb-item>用户管理</Breadcrumb-item>
        </Breadcrumb>
		<div class="btns">
			<Input style="width:300px" v-model="filter.name">
		        <span slot="prepend">请输入关键字</span>
		        <Button slot="append" icon="ios-search" @click="search"></Button>
	    	</Input>
	    	<Button type="primary" @click="addData" style="margin-left:5px">添加用户</Button>
			<Button type="error" @click="removes" style="margin-left:5px" >删除选择</Button>
		</div>
		<Table :columns="columns" :data="list" @on-selection-change="onSelectionChange"></Table>
		<Page :total="filter.total" :page-size="filter.limit" @on-change="onChangePage" show-sizer :page-size-opts="pageSizeOpts" @on-page-size-change="onPageSizeChange">
		</Page>
		<Modal
		  v-model="modal1"
		  title="普通的Modal对话框标题"
		  @on-ok="ok"
		  @on-cancel="cancel">
		  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
		  <input type="text" v-model="formValidate.dataId" placeholder="dataId">
		  	<Form-item label="姓名" prop="name">
		        <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
		    </Form-item>
		    <Form-item label="密码" prop="password">
		        <Input v-model="formValidate.password" type="password" placeholder="请输入密码"></Input>
		    </Form-item>
		    <Form-item label="邮箱" prop="mail">
		        <Input v-model="formValidate.mail" placeholder="请输入邮箱"></Input>
		    </Form-item>
		    <Form-item label="城市" prop="city">
		        <Select v-model="formValidate.city" placeholder="请选择所在地">
		            <Option value="beijing">北京市</Option>
		            <Option value="shanghai">上海市</Option>
		            <Option value="shenzhen">深圳市</Option>
		        </Select>
		    </Form-item>
		    <Form-item label="选择日期">
		        <Row>
		            <Col span="11">
		                <Form-item prop="date">
		                    <Date-picker type="date" placeholder="选择日期" v-model="formValidate.date"></Date-picker>
		                </Form-item>
		            </Col>
		            <Col span="2" style="text-align: center">-</Col>
		            <Col span="11">
		                <Form-item prop="time">
		                    <Time-picker type="time" placeholder="选择时间" v-model="formValidate.time"></Time-picker>
		                </Form-item>
		            </Col>
		        </Row>
		    </Form-item>
		    <Form-item label="性别" prop="gender">
		        <Radio-group v-model="formValidate.gender">
		            <Radio label="male">男</Radio>
		            <Radio label="female">女</Radio>
		        </Radio-group>
		    </Form-item>
		    <Form-item label="爱好" prop="interest">
		        <Checkbox-group v-model="formValidate.interest">
		            <Checkbox label="吃饭"></Checkbox>
		            <Checkbox label="睡觉"></Checkbox>
		            <Checkbox label="跑步"></Checkbox>
		            <Checkbox label="看电影"></Checkbox>
		        </Checkbox-group>
		    </Form-item>
		    <Form-item label="介绍" prop="desc">
		        <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
		    </Form-item>
		    <Form-item>
		        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
		        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
		    </Form-item>
		  </Form>
		</Modal>
	</div>
</template>
<script>
	import md5 from 'crypto-js/md5';
    export default {
        data () {
            return {
            	list:[],//表格显示的列表
            	ids:[],
            	pageSizeOpts:[5,10,20,50],
            	filter:{
            		total:0,
            		page:1,
            		pages:0,
            		limit:5,
            		name:""
            	},
                modal1:false,
                columns: [
                	{
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title:'邮箱',
                        key:'mail'
                    },
                    {
                        title:'城市',
                        key:'city'
                    },
                    {
                        title:'性别',
                        key:'gender'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 120,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteData(params.row._id);
                                        }
                                    }
                                }, '删除'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.editData(params.row);
                                        }
                                    }

                                }, '修改')
                            ]);
                        }
                    }
                ],
                formValidate: {
                    dataId:'',
                    name: '',
                    password:'',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
                        { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted(){
          this.getData();
          this.onChangePage();
        },
        computed: {

        },
        methods: {
            getData(){
              this.$http.post('http://localhost:3000/users/list',this.filter).then((res)=>{
                  this.list = res.data.docs;
                  this.filter.total = res.data.total;
                  this.page = res.data.page;
                  this.pages = res.data.pages;
              })
            },
            onChangePage(page){
              this.filter.page=page;
              this.getData();
            },
            onPageSizeChange(pageSize){
            	this.filter.limit=pageSize;
            	this.getData();
            },
            onSelectionChange(selection){
            	console.log(selection)
            	if(selection && selection.length>0){
            		var selectionLen=selection.length;
            		var ids = [];
            		for(let i=0;i<selectionLen;i++){
            			ids.push(selection[i]._id);
            		}
            		this.ids=ids;
            	}
            },
            addData(){
              Object.assign(this.$data.formValidate,this.$options.data().formValidate)
              this.modal1=true;
            },
            deleteData(id){
              this.$http.delete('http://localhost:3000/users/data/'+ id).then(
                (res)=>{
                  this.getData();
              })
            },
            search(){
            	this.getData();
            },
            removes(){
            	if(this.ids.length>0){
            		this.$Modal.confirm({
            			title:"确定删除数据",
            			content:"<b>确定删除数据</b>",
            			onOk:()=>{
            				this.$http.post('http://localhost:3000/users/removes',{ids:this.ids}).then((res)=>{
            					this.$Message.info('成功删除数据');
            					this.getData();
            				})
            			},
            			onCancel:()=>{
            				this.$Message.info('取消删除数据');
            			}
            		})
            	}else{
            		this.$Message.info('请选择删除数据');
            	}

            },
            editData(row){
              //console.log(row)
              Object.assign(this.$data.formValidate,this.$options.data().formValidate)
              this.modal1=true;
              this.formValidate = row;
              this.formValidate.dataId  = row._id;
              this.formValidate.date = new Date(this.formValidate.date)
            },
            ok () {
                this.$Message.info('点击了确定');

            },
            cancel () {
                this.$Message.info('点击了取消');
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                    	this.formValidate.password = md5(this.formValidate.password).toString()
	                    if(this.formValidate.dataId.trim().length > 0){
	                        this.$http.put('http://localhost:3000/users/data/'+this.formValidate.dataId,this.formValidate).then((res)=>{
	                            this.$Message.success('提交成功!');
	                            Object.assign(this.$data.formValidate,this.$options.data().formValidate)
	                        })
	                    }else{
	                        this.$http.post("http://localhost:3000/users/data",this.formValidate).then((res)=>{
	                            this.$Message.success('提交成功!');
	                            Object.assign(this.$data.formValidate,this.$options.data().formValidate)
	                        })
	                    }
                        this.getData();
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
<style>
	.btns{
		display: flex;
	}
</style>