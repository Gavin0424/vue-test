<template>
    <div class="main">
        <el-container>
            <el-header>个人记账系统</el-header>
            <el-container>
                <el-aside width="200px">
                	<el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @select="handleSelect" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
                    <NavMenu :navMenus="menuData"></NavMenu>
                  </el-menu>
                </el-aside>
                <el-main style="width:100%;">
                  <div class="mainhead">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item v-for="item in breadList" :key="item.title" :to="item.path">{{item.title}}</el-breadcrumb-item>
                      </el-breadcrumb>
                  </div>
                  <div class="mainBody">
                    <Welcome v-if="isShow"></Welcome>
                    <transition v-else>
                      <keep-alive>
                        <router-view></router-view>
                      </keep-alive>
                    </transition>
                  </div>        
                </el-main>
            </el-container>
            <!-- <el-footer>Copyright © 2019 by Gavin. All rights reserved.</el-footer> -->
        </el-container>
    </div>
</template>

<script>
import NavMenu from '../components/NavMenu' //局部引用组件
import Welcome from '@/components/Welcome'

	export default {
    components: { //局部引用组件
        NavMenu,
        Welcome
    },
		data() {
			return {
        activeIndex: '/main',
        menuData: [
        {
          //一级
          entity: {
            id: 1,
            name: "/main",
            icon: "el-icon-first-menu-home",
            alias: "首页"
          }
        },
        {
          //一级
          entity: {
            id: 2,
            name: "/main/shouzhi",
            icon: "el-icon-first-shouzhi1",
            alias: "收支管理"
          },
          //二级
          childs: [
            {
              entity: {
                id: 21,
                name: "/main/shouzhi/earning",
                icon: "el-icon-first-shouru",
                alias: "收入"
              }
            },
            {
              entity: {
                id: 22,
                name: "/main/shouzhi/pay",
                icon: "el-icon-first-zhichu",
                alias: "支出"
              }
            }
          ]
        },
        {
          //一级
          entity: {
            id: 3,
            name: "/main/report",
            icon: "el-icon-document",
            alias: "报表查询"
          },
        },
        {
          //一级
          entity: {
            id: 4,
            name: "/main/permission",
            icon: "el-icon-setting",
            alias: "权限设置"
          },
          //二级
          childs: [
            {
              entity: {
                id: 41,
                name: "/main/permission/user",
                icon: "el-icon-first-geren",
                alias: "用户管理"
              },
              //三级
              childs: [
                {
                  entity: {
                    id: 411,
                    name: "/main/permission/user/userinfo",
                    icon: "el-icon-first-shouji",
                    alias: "联系方式"
                  }
                }
              ]
            }
          ]
        }],
        breadList:[{
            title: '首页'
          }],
        isShow: true
      }
		},
    computed: {
      
    },
		methods: {
      handleSelect(index, indexPath) {
        console.log('index: ' + index);
        if(index == '/main') {
          this.isShow = true
          let list = [{
            title: '首页'
          }]
          this.breadList = list
        } else {
          this.isShow = false
          if(index == '/main/shouzhi/earning') {
            let list = [{
              title: '收支管理'
            },{
              title: '收入'
            }]
            this.breadList = list
          } else if(index == '/main/shouzhi/pay') {
            let list = [{
              title: '收支管理'
            },{
              title: '支出'
            }]
            this.breadList = list
          } else if(index == '/maim/report') {
            let list = [{
              title: '报表查询'
            }]
            this.breadList = list
          } else if(index == '/main/permission/user/userinfo') {
            let list = [{
              title: '权限设置'
            },{
              title: '用户管理'
            },{
              title: '联系方式'
            }]
            this.breadList = list
          }
        }
        // console.log(index, indexPath);
      },
      handleOpen(index, indexPath) {
        console.log(index, indexPath);
      },
      handleClose(index, indexPath) {
        console.log(index, indexPath);
      },
			earning() {
				this.$router.push({path:'/HelloWorld'})
			},
			pay() {
				this.$router.push({path:'/'})
			}
		}
	}
</script>

<style>
  .main {
    width: 100%;
    height: 100%;
  }

  .main > .el-container {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  .el-header {
  	background-color: #1E9FFF;
  	padding-left: 30px;
  	line-height: 60px;
  	font-size: 20px;
  	color: #fff;
  	/*border-bottom: 1px solid #003300;*/
  }

  .el-footer {
    background-color: #CCCCCC;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #545c64;
    color: #333;
    /*text-align: center;*/
    line-height: 200px;
  }
  
  .el-main {
    background-color: #FFFFFF;
    padding: 0;
    margin: 0;
    color: #333;
    /*text-align: center;
    line-height: 160px;*/
  }
  .mainhead {
    border-bottom: 1px solid #ddd;
    /*line-height: 40px;*/
    padding: 0 20px 0;
    text-align: left;
    height: 50px;
    background-color: #f4f6f9;
    position: fixed;
    top: 60px;
    left: 200px;
    width: 1165px;
    /*border: 1px solid red;*/
  }
  .el-breadcrumb {
    float: left;
    height: 30px;
    line-height: 25px;
    font-size: 14px;
    margin: 12.5px 0;
    /*border: 1px solid red;*/
  }
  .mainBody {
    position: fixed;
    top: 110px;
    left: 200px;
    margin: 0;
    width: 1165px;
    height: 100%;
  }
  .show {
    width: 100%;
    height: 100%;
  }
</style>