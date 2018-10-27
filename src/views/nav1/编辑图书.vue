<template>
	<el-row>
		<el-col :span="12" :offset="6">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="书名" prop="bookName">
					<el-input v-model="addForm.bookName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="价格" prop="bookPrice">
					<el-input-number v-model="addForm.bookPrice" :min="0" :max="200"></el-input-number> 元
				</el-form-item>
				<el-form-item label="库存" prop="bookNumber">
					<el-input-number v-model="addForm.bookNumber" :min="0" :max="999"></el-input-number> 本
				</el-form-item>
				<el-form-item label="图片">
					<img :src="addForm.bookImg" />
					<el-upload
							action="/back/file/uploadImg.action"
							list-type="picture-card"
					 		:on-success="successUpload">
						<i class="el-icon-plus"></i>
					</el-upload>
				</el-form-item>
			</el-form>
			<div class="footer">
				<el-button type="primary" @click="updateBook">提交</el-button>
			</div>
		</el-col>
	</el-row>
</template>

<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import * as getData from '../../api/api';

	export default {
		data() {
            var checkPrice=(rule,value,callback) =>{
					if(value==0){
                        return callback( new Error("价格不允许为0"))
					}else{
					    callback();
					}
                }
			return {
                addForm: {
                    id: 1,
                    bookName: '泰戈尔诗集',
                    bookPrice: 18.00,
                    bookNumber: 999,
                    bookImg: 'http://p7f6eba64.bkt.clouddn.com/book_01.gif'
                },
                addFormRules: {
                    bookName: [
                        { required: true, message: '请填写书名', trigger: 'blur' }
                    ],
                    bookPrice: [
                        { required: true, message: '请填写价格', trigger: 'blur', type: 'number' },
						{validator:checkPrice,trigger:['blur','change']}
                    ],
                    bookNumber: [
                        { required: true, message: '请填写库存', trigger: 'blur', type: 'number' }
                    ],
                    pic: [
                        { required: true, message: '请选择该书图片', trigger: 'blur' }
                    ]
                },
                dialogImageUrl: '',
                dialogVisible: false
			}
		},
        mounted(){
            var bookId=this.$route.query.bId;
            var params = {
                bookId:bookId,
            }
            this.init_params(params);
		},
		methods: {
            init_params(params){
                getData.bookDetail_Params(params).then(res=>{
                    this.addForm=res.data.book;
                })
            },
            updateBook() {
                this.$refs['addForm'].validate((valid) => {
                    console.log(valid)
                    if (valid) {
                        var bookName = this.addForm.bookName;
                        var bookPrice = this.addForm.bookPrice;
                        var bookNumber = this.addForm.bookNumber;
                        var bookImg = this.addForm.bookImg;
						var bookId = this.$route.query.bId;
                        getData.updateBook(bookName, bookPrice, bookNumber, bookImg,bookId).then(res => {
                            if (res.data.message == "更新成功") {
                                this.$message.success('更新成功!');
                                this.$router.push({path: '/table'})
                            }else{
                                this.$message.error('书名重复');
							}
                        })
                    } else {
                        this.$message.error('有字段没有填写完成');
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            successUpload(response, file, fileList){
                this.addForm.bookImg=response.imgUrl;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
		}
	}

</script>

<style scoped>
	.footer{
		margin: 50px 0;
		text-align: center;
	}
</style>