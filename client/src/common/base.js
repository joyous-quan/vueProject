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
        }
    },
    mounted(){
      this.getData();
      this.onChangePage();
    },
    methods: {

        getData(){
          this.$http.post(`http://localhost:3000/${this.module}/list`,this.filter).then((res)=>{
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
          // Object.assign(this.$data.formValidate,this.$options.data().formValidate)
          this.modal1=true;
        },
        deleteData(id){
          this.$http.delete(`http://localhost:3000/${this.module}/data/`+ id).then(
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
        				this.$http.post(`http://localhost:3000/${this.module}/removes`,{ids:this.ids}).then((res)=>{
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
          // Object.assign(this.$data.formValidate,this.$options.data().formValidate)
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
                        this.$http.put(`http://localhost:3000/${this.module}/data/`+this.formValidate.dataId,this.formValidate).then((res)=>{
                            this.$Message.success('提交成功!');

                            Object.assign(this.$data.formValidate,this.$options.data().formValidate)
                            this.modal1=false;
                            this.getData();
                        })
                    }else{  
                        if(!this.formValidate.newsId){

                            this.formValidate.newsId = this.filter.newsId;
                        }
                        this.$http.post(`http://localhost:3000/${this.module}/data`,this.formValidate).then((res)=>{
                            this.$Message.success('提交成功!');
                            Object.assign(this.$data.formValidate,this.$options.data().formValidate)
                            this.modal1=false;
                            this.getData();                     
                        })
                    } 
                    
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
