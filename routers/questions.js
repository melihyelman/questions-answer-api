const express = require("express");
const Question = require("../models/Question");
const answer = require("./answer");
const {
  getAllQuestions,
  askNewQuestion,
  getSingleQuestions,
  editQuestion,
  deleteQuestion,
  likeQuestion,
  undolikeQuestion,
} = require("../controllers/questions");
//api/questions
const {
  checkQuestionExist,
} = require("../middlewares/database/dataBaseErrorHelpers");
const {
  getAccessToRoute,
  getQuestionOwnerAccess,
} = require("../middlewares/authorization/auth");

const questionQueryMiddleware = require("../middlewares/query/questionQueryMiddleware");
const answerQueryMiddleware = require("../middlewares/query/answerQueryMiddleware");
const router = express.Router();
router.get("/:id/like", [getAccessToRoute, checkQuestionExist], likeQuestion);
router.get(
  "/:id/undo_like",
  [getAccessToRoute, checkQuestionExist],
  undolikeQuestion
);
router.get(
  "/",
  questionQueryMiddleware(Question, {
    population: {
      path: "user",
      select: "name profile_image",
    },
  }),
  getAllQuestions
);
router.get(
  "/:id",
  checkQuestionExist,
  answerQueryMiddleware(Question, {
    population: [
      {
        path: "user",
        select: "name profile_image",
      },
      {
        path: "answers",
        select: "content",
      },
    ],
  }),
  getSingleQuestions
);
router.post("/ask", getAccessToRoute, askNewQuestion);
router.delete(
  "/:id/delete",
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  deleteQuestion
);
router.put(
  "/:id/edit",
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  editQuestion
);
router.use("/:question_id/answers", checkQuestionExist, answer);

module.exports = router;
