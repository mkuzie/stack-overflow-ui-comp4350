<template>
  <div class="accordion" role="tablist">
    <b-card no-body>
      <b-card-header header-bg-variant="light">
        <b-row align-v="center">
          <!-- Vote Count -->
          <b-col v-if="!show" cols="1">
            <div class="text-center text-secondary small">
              <div>{{ question["voteCount"] }}</div>
              <div>Votes</div>
            </div>
          </b-col>

          <!-- Question Title -->
          <b-col cols="9">
            <h4 class="mb-0">
              <b-link @click="clickHandler">{{ question["header"] }}</b-link>
            </h4>
          </b-col>

          <!-- Creation Date -->
          <b-col v-if="!show">
            <div class="text-center text-secondary small">{{ question["creationDate"].format("YYYY-MM-DD") }}</div>
          </b-col>
        </b-row>
      </b-card-header>
      <b-card-body v-if="show">
        <!-- Question Body -->
        <PostContent :post="fullQuestion" :comments="[]" />

        <!-- Answers -->
        <h5 class="py-4">{{ fullAnswers.length }} Answers</h5>
        <div v-for="(fullAnswer, index) in fullAnswers" v-bind:key="index">
          <PostContent :post="fullAnswer" :comments="[]" />
          <hr/>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import PostContent from "@/components/PostContent";
import questions from "@/services/questions";
export default {
  name: "Posting",
  components: { PostContent },
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      show: false,
      fullQuestion: null,
      fullAnswers: []
    }
  },
  methods: {
    clickHandler() {

      this.show = !this.show
    },
    loadFullQuestion() {
      questions.getFullQuestion(questions.id).then(response => {
        this.fullQuestion = response;
      })
    },
    loadFullAnswers() {

    }
  }
}
</script>
