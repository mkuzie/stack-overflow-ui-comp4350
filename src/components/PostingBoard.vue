<template>
  <div>
    <SearchForm v-on:search="searchHandler" class="pb-4"/>
    <Post v-for="(question, index) in combinedQuestions" v-bind:key="index" :question="question" />
  </div>
</template>

<script>
import Post from "@/components/Post";
import SearchForm from "@/components/SearchForm";
import questions from "@/services/questions";

export default {
  name: "PostingBoard",
  components: {SearchForm, Post},
  data() {
    return {
      newestQuestions: [],
      popularQuestions: []
    }
  },
  computed: {
    combinedQuestions() {
      let mergedQuestions = [...this.newestQuestions, ...this.popularQuestions];
      let sortedQuestions = this.$_.orderBy(mergedQuestions, [function(q) { return q.creationDate.unix() }], ["desc"]);

      return sortedQuestions;
    }
  },
  methods: {
    searchHandler(event) {
      this.loadNewestQuestions(event.tag);
      this.loadPopularQuestions(event.tag);
    },
    loadNewestQuestions(tag) {
      questions.getQuestionsForTagByCreationDate(tag).then(response => {
        this.newestQuestions = response;
      })
    },
    loadPopularQuestions(tag) {
      questions.getQuestionsForTagByVotes(tag).then(response => {
        this.popularQuestions = response;
      })
    }
  }
}
</script>
