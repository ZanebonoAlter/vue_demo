<template>
	<el-row>
		<el-col :span="12" :offset="6">
			<el-form :model="addForm" label-width="80px" ref="addForm">
				<el-form-item label="书名：">
					<span>{{addForm.bookName}}</span>
				</el-form-item>
				<el-form-item label="价格：">
					<span>{{addForm.bookPrice}}</span> 元
				</el-form-item>
				<el-form-item label="库存：">
					<span>{{addForm.bookNumber}}</span> 本
				</el-form-item>
				<el-form-item label="图片：">
					<img :src="addForm.bookImg" />
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>

<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import * as getData from '../../api/api';

    export default {
        data() {
            return {
                addForm: {

                },
                addFormRules: {
                    name: [
                        { required: true, message: '请填写书名', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '请填写价格', trigger: 'blur' }
                    ],
                    stock: [
                        { required: true, message: '请填写库存', trigger: 'blur' }
                    ],
                    pic: [
                        { required: true, message: '请选择该书图片', trigger: 'blur' }
                    ]
                },
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
			init(bookId){
                getData.bookDetail(bookId).then(res=>{
					this.addForm=res.data.book;
				})
			},
			init_params(params){
                getData.bookDetail_Params(params).then(res=>{
                    this.addForm=res.data.book;
                })
			}
        }
    }

</script>

<style scoped>
	span,img{
		margin-left: 50px;
	}
</style>