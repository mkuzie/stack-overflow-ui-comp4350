import axios from "axios";
import dayjs from "dayjs";
import _ from "lodash";
import Question from "@/domain-objects/question";
import comments from "@/services/comments";

let _parseQuestion = function(rawQuestion) {
  return new Question(rawQuestion["question_id"],
                      rawQuestion["title"],
                      rawQuestion["body"],
                      rawQuestion["score"],
                      dayjs.unix(rawQuestion["creation_date"]),
                      undefined
  )
}

let getNewestQuestions = function(tag) {
  // Define query parameters needed by the Stack Exchange API
  let queryParams = {
    params: {
      tagged: tag,
      order: "desc",
      sort: "creation",
      page: 1,
      pageSize: 10,
      site: "stackoverflow"
    }
  }

  // Make a GET request to retrieve the questions
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.VUE_APP_URL + `/questions`, queryParams)
      .then(res => {
        let questions = _.map(res.data.items, (rawQuestion) => (_parseQuestion(rawQuestion)))
        resolve(questions)
      })
      .catch(err => {
        reject(err);
      });
  });
}

let getPopularQuestions = function(tag) {
  // Define query parameters needed by the Stack Exchange API
  let queryParams = {
    params: {
      tagged: tag,
      order: "desc",
      sort: "votes",
      page: 1,
      pageSize: 10,
      fromdate: dayjs().subtract(1, "week").unix(),
      todate: dayjs().unix(),
      site: "stackoverflow"
    }
  }

  // Make a GET request to retrieve the questions
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.VUE_APP_URL + `/questions`, queryParams)
      .then(res => {
        let questions = _.map(res.data.items, (rawQuestion) => (_parseQuestion(rawQuestion)))
        resolve(questions)
      })
      .catch(err => {
        reject(err);
      });
  });
}

let getFullQuestion = function(questionID) {
  // Define query parameters needed by the Stack Exchange API
  let queryParams = {
    params: {
      filter: "withbody",
      site: "stackoverflow"
    }
  }

  // Make a GET request to retrieve the question
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.VUE_APP_URL + `/questions/${questionID}`, queryParams)
      .then(res => {
        // Parse the question
        return _parseQuestion(res.data.items[0])
      })
      .then(question => {
        // Fetch all comments for the question
        comments.getCommentsForQuestion(question["id"]).then(res => {
          question["comments"] = res
        })
        resolve(question)
      })
      .catch(err => {
        reject(err);
      });
  });
}

export default { getNewestQuestions, getPopularQuestions, getFullQuestion }
