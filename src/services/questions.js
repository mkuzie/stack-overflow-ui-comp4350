import axios from "axios";
import dayjs from "dayjs";
import _ from "lodash";
import Question from "@/domain-objects/question";

let _getQuestionsByTag = function(queryParams) {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.VUE_APP_URL + `/questions`, queryParams)
      .then(res => {
        let questions = _.map(res.data.items, (rawQuestion) => {
          return new Question(rawQuestion["question_id"],
            rawQuestion["title"],
            rawQuestion["body"],
            rawQuestion["score"],
            dayjs.unix(rawQuestion["creation_date"])
          )
        })

        resolve(questions)
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default {
  getQuestionsForTagByCreationDate(tag) {
    // Define query parameters needed by the Stack Exchange API
    let queryParams = {
      params: {
        tagged: tag,
        order: "desc",
        sort: "creation",
        page: 1,
        pageSize: 10,
        filter: "withbody",
        site: "stackoverflow"
      }
    }

    // Make a GET request to retrieve all answers to the question
    return _getQuestionsByTag(queryParams)
  },
  getQuestionsForTagByVotes(tag) {
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
        filter: "withbody",
        site: "stackoverflow"
      }
    }

    // Make a GET request to retrieve all answers to the question
    return _getQuestionsByTag(queryParams)
  }
}