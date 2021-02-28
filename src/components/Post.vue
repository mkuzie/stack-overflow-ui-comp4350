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
      <b-collapse :visible="show">
        <b-card-body v-if="show">
          <!-- Question Body -->
          <PostContent :post="fullQuestion" />

          <!-- Answers -->
          <h5 class="py-4">{{ fullAnswers.length }} Answers</h5>
          <div v-for="(fullAnswer, index) in fullAnswers" v-bind:key="index">
            <PostContent :post="fullAnswer" />
            <hr/>
          </div>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import PostContent from "@/components/PostContent";
import questions from "@/services/questions";
import answers from "@/services/answers";

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
      if (!this.show) {
        Promise.all([questions.getFullQuestion(this.question.id), answers.getFullAnswers(this.question.id)]).then(res => {
          this.fullQuestion = res[0]
          this.fullAnswers = res[1]

          this.toggleShow()
        })
      } else {
        this.toggleShow()
      }
    },
    toggleShow()  {
      this.show = !this.show
    }
  }
}
</script>
