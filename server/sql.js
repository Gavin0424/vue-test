// sql语句
const sql = {
	//用户
	user: {
		login: 'select count(1) as count from user where username=? and password=?',
		getIncome: 'select * from income limit ?,?',
		getIncomeCount: 'select count(1) as count from income',
		addIncome: 'insert into income (date,earning,pay,sum,del_flag) values (?,?,?,?,0)',
		updateIncome: 'update income set ? where id = ?',
		deleteIncome: 'delete from income where id = ?'
	}
	
}

module.exports = sql