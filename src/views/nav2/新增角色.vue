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
                <!--<el-form-item>-->
                    <!--<el-button @click="getCheckedKeys">通过 key 获取</el-button>-->
                <!--</el-form-item>-->
            </el-form>
            <div class="footer">
                <el-button type="primary" @click="addadmin">提交</el-button>
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
        methods: {
            handleNodeClick(data) {
                console.log(data);
            },
            getCheckedKeys() {
                console.log(this.$refs.tree.getCheckedKeys());
            },
            permissionTree(){
              getData.permissionTree().then(res=>{
                  this.tree=res.data.tree;
              })
            },
            addadmin() {
                this.$refs['addForm'].validate((valid) => {
                    if (valid) {
                        var roleName = this.addForm.roleName;
                        var roleDescription = this.addForm.roleDescription;
                        var pId = this.$refs.tree.getCheckedKeys();
                        getData.addRole(roleName, roleDescription,pId).then(res => {
                            if (res.data.code == 1) {
                                this.$message.success('新增成功');
                                this.$router.push({path: '/roleList'})
                            }
                        })
                    } else {
                        this.$message.error('error submit!!!');
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            successUpload(response, file, fileList){
                this.addForm.aImg=response.imgUrl;
            }
        },
        mounted(){
            this.permissionTree()
        }
    }

</script>

<style scoped>
    .footer {
        margin: 50px 0;
        text-align: center;
    }
</style>