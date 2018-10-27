<template>
	<el-row>
		<el-col :span="12" :offset="6">
			<el-form :model="addForm" label-width="100px" ref="addForm">
				<el-form-item label="用户名：">
					<span>{{addForm.aName}}</span>
				</el-form-item>
				<el-form-item label="账号：">
					<span>{{addForm.aAccount}}</span>
				</el-form-item>
				<!--<el-form-item label="密码：">-->
					<!--<span>{{addForm.aPassword}}</span>-->
				<!--</el-form-item>-->
				<el-form-item label="角色" >
					<span v-for="item in addForm.roleList">{{item}}</span>
				</el-form-item>
				<el-form-item label="图片：">
					<img :src="addForm.aImg" />
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
                roleList:[],
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
            var aId=this.$route.query.aId;
            this.init(aId);
        },
        methods: {
			init(aId){
                getData.adminDetail(aId).then(res=>{
					this.addForm=res.data.admin;
                    this.$set(this.addForm,'roleList',[]);
                    this.addForm.roleList=res.data.role_name_list;
                    console.log(this.addForm.roleList)
				})
			},
        }
    }

</script>

<style scoped>
	span,img{
		margin-left: 50px;
	}
</style>