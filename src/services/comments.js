import axios from "axios";
import dayjs from "dayjs";
import _ from "lodash";
import Comment from "@/domain-objects/comment";

let _parseComment = function(rawComment) {
  return new Comment(rawComment["comment_id"],
                     rawComment["body"],
                     rawComment["score"],
                     dayjs.unix(rawComment["creation_date"])
  )
}

export default {
  getCommentsForQuestion(questionID) {
    // Define query parameters needed by the Stack Exchange API
    let queryParams = {
      params: {
        order: "asc",
        sort: "creation",
        filter: "withbody",
        site: "stackoverflow"
      }
    }

    // Make a GET request to retrieve all answers to the question
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_URL + `/questions/${questionID}/comments`, queryParams)
        .then(res => {
          let comments = _.map(res.data.items, (rawComment) => (_parseComment(rawComment)))
          resolve(comments);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getCommentsForAnswer(answerID) {
    // Define query parameters needed by the Stack Exchange API
    let queryParams = {
      params: {
        order: "asc",
        sort: "creation",
        filter: "withbody",
        site: "stackoverflow"
      }
    }

    // Make a GET request to retrieve all answers to the question
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_URL + `/answers/${answerID}/comments`, queryParams)
        .then(res => {
          let comments = _.map(res.data.items, (rawComment) => (_parseComment(rawComment)))
          resolve(comments);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
