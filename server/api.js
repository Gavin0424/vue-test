const express = require('express');
const router = express.Router();
const mysql = require('./mysql')
const sqlMap = require('./sql')

//测试数据库连接
// let sql = 'select * from user where name = ?'
// let params = ['张三']
// mysql.execute(sql, params).then(res => {
// 	console.log('The result is: ', res);
// })

/**
 * 用户登录
 * @params:username
 * @params:password
 */  
router.get('/login', (req,res) => {
	const sql = sqlMap.user.login
	let username = req.query.username
	let password = req.query.password
	mysql.execute(sql, username, password).then(result => {
		if(result[0].count == 1) {
			console.log('登录成功')
			res.send({
				'code': 0,
				'message': ''
			})
		} else {
			console.log('用户名不存在')
			res.send({
				'code': 1,
				'message': '用户名不存在'
			})
		}
    }).catch(err => {
    	console.log(err)
    })
})

router.post('/login', (req,res) => {
	const sql = sqlMap.user.login
	let params = req.body
	let username = params.username
	let password = params.password
	mysql.execute(sql, username, password).then(result => {
		if(result[0].count == 1) {
			console.log('调用 /login api成功')
			res.send({
				'code': 0,
				'message': ''
			})
		} else {
			console.log('用户名不存在')
			res.send({
				'code': 1,
				'message': '用户名不存在'
			})
		}
    }).catch(err => {
    	console.log(err)
    })
})

/**
 * 查询记录列表
 */  
router.get('/getIncome', (req,res) => {
	const sql = sqlMap.user.getIncome
	let currentPage = req.query.currentPage //当前页码
	let pageSize = req.query.pageSize //每页显示数量
	let param1 = (currentPage-1)*pageSize
	let param2 = +pageSize //参入数字需转化
	mysql.execute(sql,param1,param2).then(result => {
		console.log('查询记录列表成功')
		res.send({
			'code': 0,
			'list': result,
			'message': ''
		})
    }).catch(err => {
    	console.log(err)
    })
})

/**
 * 查询记录数
 */
router.get('/getIncomeCount', (req,res) => {
	const sql = sqlMap.user.getIncomeCount
	mysql.execute(sql).then(result => {
		console.log('查询记录数成功')
		res.send({
			'code': 0,
			'count': result[0].count,
			'message': ''
		})
    }).catch(err => {
    	console.log(err)
    })
})

/**
 * 新增记录
 */  
router.post('/addIncome', (req,res) => {
	const sql = sqlMap.user.addIncome
	let params = req.body
	let date = params.date
	let earning = params.earning
	let pay = params.pay
    let sum = params.sum
	mysql.execute(sql, date, earning, pay, sum).then(result => {
		if(result.affectedRows > 0) {
			console.log('新增记录成功')
			res.send({
				'code': 0,
				'message': ''
			})
		} else {
			console.log('新增记录失败')
			res.send({
				'code': 1,
				'message': '新增记录失败'
			})
		}
    }).catch(err => {
    	console.log(err)
    })
})

/**
 * 更新记录
 */  
router.post('/updateIncome', (req,res) => {
	const sql = sqlMap.user.updateIncome
	let params = req.body
	let date = params.date
	let earning = params.earning
	let pay = params.pay
    let sum = params.sum
    let id = params.id
    let obj = {
    	date: date,
    	earning: earning,
    	pay: pay,
    	sum: sum
    }
	mysql.execute(sql, obj, id).then(result => {
		if(result.affectedRows > 0) {
			console.log('更新记录成功')
			res.send({
				'code': 0,
				'message': ''
			})
		} else {
			console.log('更新记录失败')
			res.send({
				'code': 1,
				'message': '更新记录失败'
			})
		}
    }).catch(err => {
    	console.log(err)
    })
})


/**
 * 删除记录
 */  
router.get('/deleteIncome', (req,res) => {
	const sql = sqlMap.user.deleteIncome
	let id = req.query.id;
	mysql.execute(sql,id).then(result => {
		if(result.affectedRows > 0) {
			console.log('调用 /deleteIncome api成功')
			res.send({
				'code': 0,
				'message': ''
			})
		} else {
			console.log('删除记录失败')
			res.send({
				'code': 1,
				'message': '删除记录失败'
			})
		}
    }).catch(err => {
    	console.log(err)
    })
})

module.exports = router;