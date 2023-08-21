const express = require("express");
const router = express.Router();

const {
    operations,
    DeleteQuestion,
    UpdateQuestion,
    addQuestion,
} = require("../controllers/QuestionManagement");

router.get("/operations", operations);

router.delete("/question/:id", DeleteQuestion);

router.put("/question/:id", UpdateQuestion);

router.post("/operations/add", addQuestion);

module.exports = router;

