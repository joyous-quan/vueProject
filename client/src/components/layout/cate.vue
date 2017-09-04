<template>
    <div>
        <Breadcrumb>
            <Breadcrumb-item href="/">首页</Breadcrumb-item>
            <Breadcrumb-item>用户模块</Breadcrumb-item>
        </Breadcrumb>
        <Button-group>
          <Button type="primary" @click="changeType(1)" >日志分类</Button>
          <Button type="primary" @click="changeType(2)" >上传分类</Button>
          <Button type="primary" @click="changeType(3)" >相册分类</Button>
        </Button-group>
        <Tree :data="baseData" @on-select-change="onSelectChange"></Tree>
        
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <Form-item label="名称" prop="title">
                <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
            </Form-item>
            <Form-item>         
              <Button type="success" @click="addRootNode">添加根节点</Button>
              <!-- <Button type="success" @click="addNode">添加节点</Button> -->
              <Button type="warning" @click="editNode">修改节点</Button>
              <Button type="error" @click= "deleteNode">删除节点</Button>
              <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
              <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </Form-item>
        </Form>
    </div>
   
</template>

<script>
    export default {
        data () {
            return {
                baseData: [],
                formValidate: {
                    dataId:null,
                    parentId:null,
                    type:1,
                    title: '',
                    currentParentId:null,
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '节点标题不能为空', trigger: 'blur' }
                    ],  
                }
            }
        },
        methods:{
          onSelectChange(node){
            console.log(node)
            this.formValidate.parentId = node[0]._id;
            this.formValidate.title =  node[0].title;
            this.formValidate.dataId =  node[0]._id;
            this.formValidate.currentParentId = node[0].parentId;
          },
          getData(){
            this.$http.get(`http://localhost:3000/cate/${this.formValidate.type}`).then((res)=>{
                this.baseData = res.data
            })
          },
          addRootNode(){
             this.formValidate.parentId = null;
          },
          // addNode(){

          // },
          editNode(){
              this.formValidate.parentId = this.formValidate.currentParentId;
              console.log(this.formValidate.dataId)
              this.$http.put(`http://localhost:3000/cate/data/${this.formValidate.dataId}`,this.formValidate).then((res)=>{
                    this.$Message.success('提交成功!');
                    var type = this.formValidate.type;
                    Object.assign(this.$data.formValidate,this.$options.data().formValidate)
                    this.formValidate.type = type;
                    this.getData();
              })
          },
          deleteNode(){
            this.$http.delete(`http://localhost:3000/cate/${this.formValidate.dataId}`).then((res)=>{
                 this.$Message.success('提交成功!');
                 var type = this.formValidate.type;
                 Object.assign(this.$data.formValidate,this.$options.data().formValidate)
                 this.formValidate.type = type;
                 this.getData();
            })
          },
          changeType(type){
            this.formValidate.parentId = null;
            this.formValidate.type = type;
            this.getData();
          },
          handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.post('http://localhost:3000/cate/data',this.formValidate).then((res)=>{
                             this.$Message.success('提交成功!');
                             var type = this.formValidate.type;
                             Object.assign(this.$data.formValidate,this.$options.data().formValidate)
                             this.formValidate.type = type;
                             this.getData();
                        })
                       
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        },
        created(){
          this.getData(); 
        }
    }
</script>