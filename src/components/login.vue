<template>
  <div class="loginbg">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
      style="height: 300px; margin-top:22%;margin-left:43%"
    >
      <el-form-item label="用户名：" prop="username" style="width:380px;">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>

      <el-form-item label="密码：" prop="password" style="width:380px;">
        <el-input v-model="ruleForm.password" show-password></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="showBackDialog()">注册</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="注册" :visible.sync="backDialog" width="550px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="90px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码：" prop="pass">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="registerUser();backDialog = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import {mapState,mapMutations,mapAction } from 'vuex'
    import axios from 'axios'

    export default {
        name: 'login',
        data () {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {

                    callback(new Error('请再次输入密码!'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                backDialog: false,
                userToken:"",
                ruleForm: {
                    username: '',
                    password:'',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            ...mapMutations(['changeLogin']),
            submitForm(){
                let _this=this;
                axios.post('https://api.shisanshui.rtxux.xyz/auth/login', {
                    username: this.ruleForm.username,
                    password: this.ruleForm.password
                })
                    .then(function (response) {
                        //_this.userToken=response.data.data.token;
                        //console.log(response.data.data.token)

                        console.log(_this.userToken)//获取到的token
                        _this.changeLogin({ Authorization:response.data.data.token,UserId:response.data.data.user_id });
                        _this.$router.push({path:'/startinterface'});
                        alert('登陆成功!');

                    })
                    .catch(function (error) {
                        alert('登陆失败!');
                        console.log(error);
                    })
            },
            showBackDialog() {
                this.backDialog = true
            },
            registerUser(){

                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        let _this=this;
                        axios.post('https://api.shisanshui.rtxux.xyz/auth/register', {
                            username: this.ruleForm.username,
                            password: this.ruleForm.password
                        })
                            .then(function (response) {

                                _this.$router.push({path:'/'});
                                alert('注册成功！');

                            })
                            .catch(function (error) {
                                alert('注册失败！');
                                console.log(error);
                            })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }

                })
            }
        }
    }
</script>

<style lang="scss" scoped>
  .loginbg {
    position: absolute;
    width: 100%;
    height: 100%;

    background: url("../pictures/Loginbg.jpg");
    background-size: contain;
    background-repeat: no-repeat;
    -ms-interpolation-mode: bicubic;
    -webkit-background-size: cover;
    -o-background-size: cover;

    .el-input {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
    .el-input el-input--suffix {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
  }
</style>
