import axios from "axios";
import dayjs from "dayjs";

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
        site: "stackoverflow"
      }
    }

    // Make a GET request to retrieve all answers to the question
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_URL + `/questions`, queryParams)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
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
        site: "stackoverflow"
      }
    }

    // Make a GET request to retrieve all answers to the question
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_URL + `/questions`, queryParams)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}