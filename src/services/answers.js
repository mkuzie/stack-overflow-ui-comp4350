import axios from "axios";

export default {
  getFullAnswers(questionID) {
    // Define query parameters needed by the Stack Exchange API
    let queryParams = {
      params: {
        order: "desc",
        sort: "votes",
        site: "stackoverflow"
      }
    }

    // Make a GET request to retrieve all answers to the question
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_URL + `/questions/${questionID}/answers`, queryParams)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
