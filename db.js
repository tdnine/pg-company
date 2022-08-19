const Pool = require('pg').Pool

const herokuConn = {
    host: "ec2-52-3-200-138.compute-1.amazonaws.com",
    database: "d57qp1ge70ejde",
    user: "tqljzaaoxgpyzs",
    password: "3c5c6f4284c84a51ded0aeae64ddf1cc3f7b3523dfdab7220df2f19607ce94f2",
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }    
}

const localConn = {
    user: "postgres",
    password: "N3ud@tabase",
    host: "localhost",
    port: 5432,
    database: "company"
}

//dB config
//const pool = new Pool(localConn)
const pool = new Pool(herokuConn)

module.exports = pool