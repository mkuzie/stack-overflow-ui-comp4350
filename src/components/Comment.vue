<template>
  <b-container>
    <b-row align-v="center">
      <b-col cols="1">
        <!-- Vote Count -->
        <div class="text-center text-secondary">{{ voteCount }}</div>
      </b-col>
      <b-col cols="9">
        <!-- Question Title -->
        <div>{{ commentText }}</div>
      </b-col>
      <b-col>
        <!-- Creation Date -->
        <div class="text-center text-secondary">{{ creationDate.format("YYYY-MM-DD") }}</div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Comment",
  props: {
    voteCount: {
      type: Number,
      required: true
    },
    commentText: {
      type: String,
      required: true
    },
    creationDate: {
      type: Date,
      required: true
    }
  }
}
</script>
