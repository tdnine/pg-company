const pool = require('../db')

exports.newEmp = async (req, res) => {
    try{        
        //GET BODY DATA
        const {name, age, joining_date, dept_id} = req.body

        //MAKE QUERY
        const query = `INSERT INTO employee(name, age, joining_date, dept_id) 
                            VALUES($1, $2, $3, $4) RETURNING *`        

        //SAVE EMP DATA INTO TABLE
        const newEmployee = await pool.query(query, [name, age, joining_date, dept_id])
                
        res.status(201).json(newEmployee.rows[0])
    }catch(err){
        console.log(err.message)
    }    
}

exports.newAddr = async(req, res) => {
    try{
        //GET BODY DATA
        const {address1, address2, pincode, city, state, country, emp_id} = req.body

        //MAKE QUERY
        const query = `INSERT INTO address(address1, address2, pincode, city, state, country) 
                            VALUES($1, $2, $3, $4, $5, $6) RETURNING *`

        //SAVE ADDR DATA INTO TABLE
        const newAddress = await pool.query(query, [address1, address2, pincode, city, state, country])
        const addressId = newAddress.rows[0].addr_id

        //UPDATE QUERY TO EMPLOYEE TABLE, TO UPDATE ADDR_ID
        const query2 = "UPDATE employee SET addr_id = $1 WHERE emp_id = $2 RETURNING *"

        //SAVE THE UPDATE
        const updatedEmp = await pool.query(query2, [addressId, emp_id])
        console.log(updatedEmp.rows[0])

        res.status(201).json(newAddress.rows[0])
    }catch(err){
        console.log(err.message)
    }
}

exports.getSingleEmp = async (req, res) => {
    try{
        //GET PARAM
        let { id } = req.params

        //MAKE JOIN QUERY
        let query = "SELECT * FROM employee LEFT JOIN address ON address.addr_id = employee.addr_id WHERE emp_id=$1"

        //GET INFO
        const singleEmp = await pool.query(query, [id])

        res.status(200).json(singleEmp.rows[0])
    }catch(err){
        console.log(err.message)
    }
}

exports.filteredEmp = async(req, res) => {
    try{
        //GET QUERIES
        let { from_date, dept } = req.query

        //MAKE QUERY
        let query = "SELECT filtered_emp_details(to_date($1,'YYYY-MM-DD'), $2)"

        //GET INFO
        const filteredEmp = await pool.query(query, [from_date, dept])
        console.log(filteredEmp.rows)
        res.status(200).json(filteredEmp.rows[0].filtered_emp_details)
    }catch(err){
        console.log(err.message)
    }
}

