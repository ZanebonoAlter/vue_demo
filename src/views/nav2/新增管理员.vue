<template>
    <el-row>
        <el-col :span="12" :offset="6">
            <el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
                <el-form-item label="管理员名称" prop="aName">
                    <el-input v-model="addForm.aName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="账号" prop="aAccount">
                    <el-input v-model="addForm.aAccount" ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="aPassword">
                    <el-input type="password" v-model="addForm.aPassword" ></el-input>
                </el-form-item>
                <el-form-item label="再次输入密码" prop="aPasswordAgain">
                    <el-input type="password" v-model="addForm.aPasswordAgain" ></el-input>
                </el-form-item>
                <el-form-item label="角色" >
                   <el-checkbox-group v-model="addForm.roleList">
                       <el-checkbox v-for="item in roleList" :label='item.roleId' :key="item.roleId">{{item.roleName}}</el-checkbox>
                   </el-checkbox-group>
                </el-form-item>
                <el-form-item label="图片">
                    <el-upload
                            action="/back/file/uploadImg.action"
                            list-type="picture-card"
                            :on-success="successUpload">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
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
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.addForm.aPasswordAgain !== '') {
                        this.$refs.addForm.validateField('aPasswordAgain');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.addForm.aPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                roleList:[],
                addForm: {
                    aId: '',
                    aName: '',
                    aAccount: '',
                    aPassword: '',
                    aPasswordAgain: '',
                    aImg: '',
                    roleList:[]
                },
                addFormRules: {
                    aName: [
                        {required: true, message: '请填写名称', trigger: 'blur'}
                    ],
                    aAccount: [
                        {required: true, message: '请填写账号', trigger: 'blur'}
                    ],
                    aPassword: [
                       {required: true, message: '请填写密码', trigger: 'blur'},
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    aPasswordAgain: [
                       {required: true, message: '请再次填写密码', trigger: 'blur'},
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    aImg: [
                        {required: true, message: '请选择图片', trigger: 'blur'}
                    ]
                },
            }
        },
        methods: {
            getroleList(){
              getData.getAllRoleList().then(res=>{
                  console.log( this.addForm.roleList)
                  this.roleList=res.data.roles;
                  console.log( this.addForm.roleList)
              })
            },
            addadmin() {
                console.log( this.addForm.roleList)
                this.$refs['addForm'].validate((valid) => {
                    if (valid) {
                        var aName = this.addForm.aName;
                        var aAccount = this.addForm.aAccount;
                        var aPassword = this.addForm.aPassword;
                        var aImg = this.addForm.aImg;
                        var roleIds = this.addForm.roleList;
                        getData.addAdmin(aName, aAccount, aPassword, aImg,roleIds).then(res => {
                            if (res.data.code == 1) {
                                this.$message.success('新增成功');
                                this.$router.push({path: '/adminList'})
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
            this.getroleList()
        }
    }

</script>

<style scoped>
    .footer {
        margin: 50px 0;
        text-align: center;
    }
</style>