<template>
	<div class='content'>
		<ul style="padding: 0;">
        	<li style="list-style: none;">
            	<el-button type="primary" size="small" icon="el-icon-circle-plus" round @click="addIncome">添加</el-button>
            	<el-button type="primary" size="small" icon="el-icon-search" round @click="searchClick">查询</el-button>
        	</li>
    	</ul>
    	<!-- 列表 -->
		<el-table :data="IncomeList" stripe border align="center"  style="width: 77.5%;" max-height="400">
			<el-table-column v-if='showId' prop="id" label="id" align="center">
    		</el-table-column>
    		<el-table-column prop="date" label="日期" align="center" width="240">
    		</el-table-column>
    		<el-table-column prop="earning" label="收入" align="center" width="120">
    		</el-table-column>
    		<el-table-column prop="pay" label="支出" align="center" width="120">
    		</el-table-column>
    		<el-table-column prop="sum" label="合计" align="center" width="120">
    		</el-table-column>
    		<el-table-column label="操作" align="center" width="300">
      			<template slot-scope="scope">
        			<el-button type="primary" size="small" icon="el-icon-circle-plus" round @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
        			<el-button type="primary" size="small" icon="el-icon-circle-plus" round @click.native.prevent="handleDelete(scope.$index, scope.row)">删除</el-button>
      			</template>
    		</el-table-column>
  		</el-table>
  		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[5,10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="count">
    	</el-pagination>
    	<!-- 弹出框 -->
    	<el-dialog :visible.sync="editFormVisible" :title="showname" :close-on-click-modal="false" :modal-append-to-body='false' :append-to-body='true' center width="350px">
        	<el-form :model="editForm" label-width="80px" :rules="	editFormRules" ref="editForm" size="medium">
        	    <el-form-item label="日期" prop="date">
        	        <el-date-picker type="date" placeholder="选择日期" v-model="editForm.date" @change="getTime"></el-date-picker>
        	    </el-form-item>
        	    <el-form-item label="收入">
        	        <el-input v-model="editForm.earning" auto-complete="off"></el-input>
        	    </el-form-item>
        	    <el-form-item label="支出">
        	        <el-input v-model="editForm.pay"></el-input>
        	    </el-form-item>
        	    <el-form-item label="合计">
        	        <el-input v-model="editForm.sum"></el-input>
        	    </el-form-item>
        	</el-form>
        	<div slot="footer" class="dialog-footer">
        	    <el-button @click.native="editFormVisible = false">取消</el-button>
        	    <el-button type="primary" @click="submitForm('editForm')">提交</el-button>
        	</div>
    	</el-dialog>
	</div>
</template>

<script>
const moment = require('moment')

export default {
    name: 'Income',
    data() {
      return {
      	editForm: {
			date: '',
			earning: 0,
			pay: 0,
			sum: 0
      	},
        IncomeList: [],//列表
        currentPage4: 1,//默认页码
        pageSize: 5,//每页显示记录数
        count: 0,//记录数量
        editFormVisible: false,//是否显示dialog
        showname: '',//dialog标题
        showId: false,
        id: 0,
        selectDate: '',//转化日期
		editFormRules: {//表单验证
			date: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          	]
		}
      }
    },
    mounted: function() {
		this.searchClick()
    },
    methods: {
    	//查询
    	searchClick: async function() {
    		// 先查询数量再查询明细
    		let count = await this.searchCount()
    		this.searchList()
    	},
    	//添加
    	addIncome: function() {
    		this.editFormVisible = true
    		this.showname = '新增'
    		//初始化表单数据
        	this.editForm.date = ''
        	this.editForm.earning = 0
        	this.editForm.pay = 0
        	this.editForm.sum = 0
    	},
    	//编辑
    	handleEdit(index, row) {
			this.editFormVisible = true
    		this.showname = '编辑'
    		//初始化表单数据
    		this.selectDate = row.date
        	this.editForm.date = new Date(row.date)
        	this.editForm.earning = row.earning
        	this.editForm.pay = row.pay
        	this.editForm.sum = row.sum
        	this.id = row.id
      	},
      	//删除
      	handleDelete(index, row) {
      		let url = '/deleteIncome'
			let params = {
				id: row.id
			}
			this.$fetchGet(url,params).then(res => {
				if(res.code == '0') {
					this.searchClick()
				} else {
    				this.$message({
      					showClose: true,
      					message: res.message,
      					type: 'error',
      					duration: 1500
    				});
  				}
			}).catch(err => {
				console.log('err: ' + err)
			})
      	},
    	
        //查询记录
        searchList: function() {
        	let url = '/getIncome'
        	let params = {
        		pageSize: this.pageSize, //每页显示数量
        		currentPage: this.currentPage4 //当前页码
        	}
    		this.$fetchGet(url, params).then(res => {
    			let list = []
				if(res.list.length > 0) {
					for(let item in res.list) {
						let entity = {
							id: res.list[item].id,
							date: moment(res.list[item].date).format('YYYY-MM-DD'),
							earning: res.list[item].earning,
							pay: res.list[item].pay,
							sum: res.list[item].sum
						}
						list.push(entity)
					}
					this.IncomeList = list
				}
    		}).catch(err => {
    			console.log('err: ' + err)
    		})
        },
        //查询数量
        searchCount: function() {
        	let countUrl = '/getIncomeCount'
			let countParams = {}
			this.$fetchGet(countUrl,countParams).then(res => {
				this.count = res.count
				return Promise.resolve(res.count)
			}).catch(err => {
				console.log('err: ' + err)
				return Promise.reject(err)
			})
        },
        //选择日期转化
    	getTime: function(val) {
            const d = new Date(val);
            const year = d.getFullYear()
            const month = d.getMonth() + 1 <= 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
            const day = d.getDate() <= 9 ? '0' + d.getDate() : d.getDate()
            this.selectDate = year + '-' + month + '-' + day
        },
      	//表单提交
      	submitForm(formName) {
      		this.$refs[formName].validate((valid) => {
      			let url,date,earning,pay,sum,id
      			let params = {}
          		if (valid) {
          			if(this.showname == '新增') {
          				url = '/addIncome'
          				params = { 
    						date: this.selectDate,
    						earning: this.editForm.earning,
    						pay: this.editForm.pay,
    						sum: this.editForm.sum
    					}
          			} else {
          				url = '/updateIncome'
          				params = { 
    						date: this.selectDate,
    						earning: this.editForm.earning,
    						pay: this.editForm.pay,
    						sum: this.editForm.sum,
    						id: this.id
    					}
          			}
					this.$fetchPost(url, params).then(res => {
						if(res.code == '0') {
							this.editFormVisible = false
							this.searchClick()
						} else {
            				this.$message({
              					showClose: true,
              					message: res.message,
              					type: 'error',
              					duration: 1500
            				});
          				}
    				}).catch(err => {
        				console.log('err: ' + err)
    				})
          		} else {
            		console.log('error submit!!');
            		return false;
          		}
        	})
      	},
      	//调整每页显示数量
      	handleSizeChange(val) {
        	this.pageSize = val
        	console.log(`每页 ${this.pageSize} 条`)
        	this.searchClick()
      	},
      	//切换页码
      	handleCurrentChange(val) {
        	this.currentPage4 = val
        	console.log(`当前页: ${this.currentPage4}`)
        	this.searchClick()
      	}
    }
  }
</script>

<style>
.content {
    width: 100%;
    height: 100%;
    padding: 0px 20px;
    /*border: 1px solid red;*/
  }
</style>