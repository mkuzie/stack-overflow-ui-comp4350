import axios from "axios";

export default {
  getCommentsForQuestion(questionID) {
    // Define query parameters needed by the Stack Exchange API
    let queryParams = {
      params: {
        order: "asc",
        sort: "creation",
        site: "stackoverflow"
      }
    }

    // Make a GET request to retrieve all answers to the question
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_URL + `/questions/${questionID}/comments`, queryParams)
        .then(res => {
          resolve(res.data);
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
        site: "stackoverflow"
      }
    }

    // Make a GET request to retrieve all answers to the question
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_URL + `/answers/${answerID}/comments`, queryParams)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
