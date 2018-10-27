<template>
	<el-row>
		<el-col :span="12" :offset="6">
			<el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
				<el-form-item label="角色名称" prop="roleName">
					<el-input v-model="addForm.roleName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="角色描述" prop="roleDescription">
					<el-input v-model="addForm.roleDescription" ></el-input>
				</el-form-item>
				<el-form-item>
					<el-tree :data="tree"
							 :props="defaultProps"
							 node-key="id"
							 ref="tree"
							 @node-click="handleNodeClick"
							 show-checkbox></el-tree>
				</el-form-item>
			</el-form>
			<div class="footer">
				<el-button type="primary" @click="updaterole">提交</el-button>
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
			return {
                tree:[],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                addForm: {
                    roleId: '',
                    roleName: '',
                    roleDescription: '',
                    aPassword: '',
                    aPasswordAgain: '',
                    aImg: '',
                    tree:[]
                },
                addFormRules: {
                    roleName: [
                        {required: true, message: '请填写名称', trigger: 'blur'}
                    ],
                    roleDescription: [
                        {required: true, message: '请填写描述', trigger: 'blur'}
                    ],
                },
			}
		},
        mounted(){
            var roleId=this.$route.query.roleId;
            this.permissionTree();
            this.init();
		},
		methods: {
            handleNodeClick(data) {
                console.log(data);
            },
            permissionTree(){
                getData.permissionTree().then(res=>{
                    this.tree=res.data.tree;
                })
            },
			init(){
                var roleId=this.$route.query.roleId;
              	getData.roleDetail(roleId).then(res=>{
              	    this.addForm=res.data.role;
              	    console.log(res.data.pIds);
                    this.$refs.tree.setCheckedKeys(res.data.pIds);
				})
			},
            updaterole() {
                this.$refs['addForm'].validate((valid) => {
                    console.log(valid)
                    if (valid) {
                        var roleName = this.addForm.roleName;
                        var roleDescription = this.addForm.roleDescription;
                        var roleId = this.addForm.roleId;
                        var pId = this.$refs.tree.getCheckedKeys();
                        getData.updateRole(roleName,roleDescription, roleId,pId).then(res => {
                            if (res.data.code == 1) {
                                this.$message.success('更新成功!');
                                this.$router.push({path: '/roleList'})
                            }else{
                                this.$message.error('账号重复');
							}
                        })
                    } else {
                        this.$message.error('有字段没有填写完成');
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

		}
	}

</script>

<style scoped>
	.footer{
		margin: 50px 0;
		text-align: center;
	}
</style>