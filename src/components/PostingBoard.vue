<template>
  <div>
    <SearchForm v-on:search="searchHandler" class="pb-4"/>
    <Post v-for="(question, index) in questions" v-bind:key="index" :question="question" />
  </div>
</template>

<script>
import Post from "@/components/Post";
import SearchForm from "@/components/SearchForm";
import questionService from "@/services/questions";
import responseTimer from "@/mixins/responseTimer";
import _ from "lodash";

export default {
  name: "PostingBoard",
  components: {SearchForm, Post},
  mixins: [responseTimer],
  data() {
    return {
      newestQuestion: [],
      popularQuestions: []
    }
  },
  computed: {
    questions() {
      // Merge the lists of question
      let unsortedQuestions = [...this.newestQuestion, ...this.popularQuestions]

      // Sort the questions by creation date (newest first)
      return _.orderBy(unsortedQuestions, [(q) => (q["creationDate"].unix())], ["desc"])
    }
  },
  methods: {
    searchHandler(event) {
      this.timer();
      Promise.all([this.fetchNewestQuestions(event.tag), this.fetchPopularQuestions(event.tag)]).then(() => {
        let responseTime = this.timer();
        this.showResponseTimeToast(responseTime);
      })
    },
    fetchNewestQuestions(tag) {
      return questionService
        .getNewestQuestions(tag)
        .then(response => {
          this.newestQuestion = response;
          return Promise.resolve()
        })
        .catch(() => {
          return Promise.reject()
        })
    },
    fetchPopularQuestions(tag) {
      return questionService
        .getPopularQuestions(tag)
        .then(response => {
          this.popularQuestions = response;
          return Promise.resolve()
        })
        .catch(() => {
          return Promise.reject()
        })
    }
  }
}
</script>
