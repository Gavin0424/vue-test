<template>
<div class="Land">
    <div class="topzi">个人记账系统登陆</div>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="name" label="姓名">
            <el-input v-model="ruleForm2.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
  export default {
    data() {
      var checkName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入姓名'));
        } else if(/^[\u4E00-\u9FA5]+$/.test(value) == false) {
          callback(new Error('用户名只能为中文'));
        } else {
          this.username = value;
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          this.password = value;
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          name: ''
        },
        rules2: {
          pass: [
            { required: true,validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true,validator: validatePass2, trigger: 'blur' }
          ],
          name: [
            {required: true,validator: checkName, trigger: 'blur'}
          ]
          // name: [{required: true, message: '不能为空', trigger: 'blur'},
          // {pattern: /^[\u4E00-\u9FA5]+$/, message: '用户名只能为中文', trigger: 'blur'}]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let url = '/login'
            let params = {
                username: this.username,
                password: this.password
              }
            this.$fetchGet(url, params).then(res => {
              if(res.code == '0') {
                this.$router.push({path:'/main'})
              } else {
                this.$message({
                  showClose: true,
                  message: res.message,
                  type: 'error',
                  duration: 1500
                });
              }
            }).catch(err => {
              console.log(err)
            })
        // this.$fetchPost(url, params).then(res => {
        //       if(res.code == '0') {
        //         this.$router.push({path:'/main'})
        //       }
        //     }).catch(err => {
        //       console.log(err)
        //     })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>


<style>
html,body{
  background: url(../assets/img/bg9.jpg) no-repeat;
  background-size: 100% 100%;
}
#app .topzi{
    font-size: 40px;
    margin-bottom: 20px;
}
#app .Land{
  width: 30%;
  position:fixed;
  top:20%;
  left: 0;
  right: 0;
  margin:0 auto;
  border: 1px solid #000;
  padding: 40px;
}
</style>

