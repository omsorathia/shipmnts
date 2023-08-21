const db = require('../config/mysqlConnection')

const  operations=  (req, res) => {
    const sql = "SELECT `id`,`question` FROM operations";
    db.query(sql, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while fetching data" });
      } else {
        res.send(data);
      }
    }); 
  }

  const DeleteQuestion = (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM operations WHERE id = ${id}`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while deleting data" });
      } else {
        res.sendStatus(200);
      }
    });
  }

  const UpdateQuestion = (req, res) => {
    const id = req.params.id;
    const { question } = req.body;
    const sql = `UPDATE operations SET question = ? WHERE id = ${id}`;
    db.query(sql, [question], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while updating data" });
      } else {
        res.sendStatus(200);
      }
    });
  }

  const addQuestion = (req, res) => {
    // Extract the data from the request body
    const { question } = req.body;
    const values=[[question]]
    // Perform any necessary validation or processing
  
    // Create the SQL query to insert the data into the admin_login table
    const query = `INSERT INTO operations (question) VALUES ?`;
  
    // Execute the query
    db.query(query,[values], (error, results) => {
      if (error) {
        console.error('Error adding new admin', error);
        res.status(500).json({ message: 'Failed to add new question' });
      } else {
        res.status(200).json({ message: 'New question added successfully' });
      }
    });
  }

  module.exports = {operations, DeleteQuestion,UpdateQuestion,addQuestion}