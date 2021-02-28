import axios from "axios";
import _ from "lodash";
import dayjs from "dayjs";
import Answer from "@/domain-objects/answer";
import comments from "@/services/comments";

let _parseAnswer = function(rawAnswer) {
  return new Answer(rawAnswer["answer_id"],
                    rawAnswer["body"],
                    rawAnswer["score"],
                    dayjs.unix(rawAnswer["creation_date"]),
                    [])
}

export default {
  getFullAnswers(questionID) {
    // Define query parameters needed by the Stack Exchange API
    let queryParams = {
      params: {
        order: "desc",
        sort: "votes",
        filter: "withbody",
        site: "stackoverflow"
      }
    }

    // Make a GET request to retrieve all answers to the question
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_URL + `/questions/${questionID}/answers`, queryParams)
        .then(res => {
          return _.map(res.data.items, (rawAnswer) => (_parseAnswer(rawAnswer)))
        })
        .then(answers => {
          // Get the IDs of all answers
          let answerIDs = _.map(answers, (a) => (a["id"]))

          // Get the comments for all answers
          if (answerIDs.length > 0) {
            comments.getCommentsForAnswers(answerIDs).then(comments => {
              // Group the comments by answer ID
              let groupedComments = _.groupBy(comments, (c) => (c["postID"]))

              // Assign the comments to each answer
              _.forEach(answers, (a) => {
                if (a["id"] in groupedComments) {
                  a["comments"] = groupedComments[a["id"]]
                }
              })
            })
          }

          resolve(answers)
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
