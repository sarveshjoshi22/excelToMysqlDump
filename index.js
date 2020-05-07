var mysql = require("mysql");
const xlsxFile = require("read-excel-file/node");

xlsxFile("D:/Userinfo.xlsx")
  .then((rows) => {
    if (rows.length > 0) {
      // database config
      var con = mysql.createConnection({
        host: "sql12.freemysqlhosting.net",
        user: "sql12337776",
        password: "SflW9Qaty9",
        database: "sql12337776",
      });
      // database connection request
      con.connect(function (err) {
        if (err) throw err;
        console.log("Database Connected!");

        // code to cross check whether table is present in database or not
        let createUserListTable = `create table if not exists userlist(
        id int primary key auto_increment,
        name varchar(255)not null,
        gender varchar(255)not null,
        age varchar(255)not null
      )`;

        con.query(createUserListTable, function (err, results, fields) {
          if (err) {
            console.log(err.message);
          }
          // Query to insert data in database
          const sql = "INSERT INTO userlist (name, gender, age) VALUES ?";
          const values = rows;
          con.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Data Inserted Successfully");
            // Closing the database connection
            console.log("Closing the database connection");            
            con.destroy();
          });
        });
      });
    } else {
      console.log("Xlsx file is empty");
      return;
    }
  })
  .catch((error) => console.log("Error in reading the file"));
