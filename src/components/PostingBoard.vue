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
import _ from "lodash";

export default {
  name: "PostingBoard",
  components: {SearchForm, Post},
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
      this.fetchNewestQuestions(event.tag)
      this.fetchPopularQuestions(event.tag)
    },
    fetchNewestQuestions(tag) {
      questionService.getNewestQuestions(tag).then(response => {
        this.newestQuestion = response;
      })
    },
    fetchPopularQuestions(tag) {
      questionService.getPopularQuestions(tag).then(response => {
        this.popularQuestions = response;
      })
    }
  }
}
</script>
