import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
// import AdminNavbar from "../AdminBar/AdminNavbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function createData(id, question, actions) {
  return { id, question, actions};
}

function Operations() {
  const [rows, setRows] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState("");
  const [addingData, setAddingData] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/operations");
      const data = response.data.map((item) =>
        createData(
          item.id,
          item.question,
          <div>
            <Button
              variant="contained"
              size="small"
              sx={{
                marginRight: 1,
                backgroundColor: "#685BC7",
                "&:hover": {
                  backgroundColor: "#584da9",
                },
              }}
              onClick={() => handleEdit(item.id, item.question)}
              >
              <EditIcon />
            </Button>
            <Button variant="contained" size="small" color="error" onClick={() => handleDelete(item.id)}>
              <DeleteIcon />
            </Button>
          </div>
        )
        );
        setRows(data);
      } catch (error) {
        console.error(error);
      }
    };
// console.log(rows)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/question/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id, question) => {
    setEditingId(id);
    setEditedQuestion(question);
  };

  const handleSave = (id) => {
    axios
      .put(`http://localhost:5000/question/${id}`, {

        question: editedQuestion,
      })
      .then(() => {
        setEditingId(null);
        setEditedQuestion("");
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedQuestion("");
  };

  const handleAdd = () => {
    setAddingData(true);
  };

  const handleSaveNew = () => {
    axios
      .post("http://localhost:5000/operations/add", {
        question: newQuestion,
      })
      .then(() => {
        setAddingData(false);
        setNewQuestion("");
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancelAdd = () => {
    setAddingData(false);
    setNewQuestion("");
  };

  return (
    <>
      {/* <AdminNavbar /> */}
      <Box height={80} />
      <Box sx={{ display: "flex", paddingLeft: "50px"}}>
        
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 610 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  {/* <TableCell>Email</TableCell> */}
                  {/* <TableCell align="right">Password</TableCell> */}
                  <TableCell align="right">Question</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((rowc) => (
                  <>
                    <TableRow >
                      <TableCell component="th" scope="row">
                        {editingId === rowc.id ? (
                          <input
                            type="text"
                            value={editedQuestion}
                            onChange={(e) => setEditedQuestion(e.target.value)}
                          />
                        ) : (
                          rowc.question
                        )}
                      </TableCell>


                      <TableCell align="right">
                        {editingId === rowc.id ? (
                          <>
                            <Button onClick={() => handleSave(rowc.id)}>Save</Button>
                            <Button onClick={handleCancel}>Cancel</Button>
                          </>
                        ) : (
                          rowc.actions
                        )}
                      </TableCell>
                    </TableRow>
                    {addingData && rowc.id === rows[rows.length - 1].id && (
                      <TableRow>
                        <TableCell>
                          <input
                            type="text"
                            placeholder="Question"
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                          />
                        </TableCell>


                        <TableCell align="right">
                          <Button onClick={handleSaveNew}>Save</Button>
                          <Button onClick={handleCancelAdd}>Cancel</Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
        sx={{ position:"absolute",marginTop: "20px" ,right:"30px", backgroundColor: "#685BC7",
        "&:hover": {
          backgroundColor: "#584da9",
        },}}
        variant="contained"
        size="small"
        
        onClick={handleAdd}
      >
        <EditIcon /> ADD
      </Button>
        </Box>
        
      </Box>
    </>
  );
}

export default Operations;