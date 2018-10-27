<template>
    <el-row>
        <el-col :span="12" :offset="6">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="书名" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input-number v-model="addForm.price" :min="0" :max="200"></el-input-number>
                    元
                </el-form-item>
                <el-form-item label="库存" prop="stock">
                    <el-input-number v-model="addForm.stock" :min="0" :max="999"></el-input-number>
                    本
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
                <el-button type="primary" @click="addBook">提交</el-button>
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
                addForm: {
                    id: '',
                    name: '',
                    price: 0,
                    stock: 0,
                    pic: ''
                },
                addFormRules: {
                    name: [
                        {required: true, message: '请填写书名', trigger: 'blur'}
                    ],
                    price: [
                        {required: true, message: '请填写价格', trigger: 'blur', type: 'number'}
                    ],
                    stock: [
                        {required: true, message: '请填写库存', trigger: 'blur', type: 'number'}
                    ],
                    pic: [
                        {required: true, message: '请选择该书图片', trigger: 'blur'}
                    ]
                },
            }
        },
        methods: {
            addBook() {
                this.$refs['addForm'].validate((valid) => {
                    if (valid) {
                        var bookName = this.addForm.name;
                        var bookPrice = this.addForm.price;
                        var bookNumber = this.addForm.stock;
                        var bookImg = this.addForm.pic;

                        getData.addBook(bookName, bookPrice, bookNumber, bookImg).then(res => {
                            if (res.data.message == "success") {
                                this.$message.success('success submit!');
                                this.$router.push({path: '/table'})
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
                this.addForm.pic=response.imgUrl;
            }
        }
    }

</script>

<style scoped>
    .footer {
        margin: 50px 0;
        text-align: center;
    }
</style>