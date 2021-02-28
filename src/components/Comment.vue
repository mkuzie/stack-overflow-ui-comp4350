<template>
  <b-container>
    <b-row align-v="center">
      <b-col cols="1">
        <!-- Vote Count -->
        <div class="text-center text-secondary">{{ comment["voteCount"] }}</div>
      </b-col>
      <b-col cols="9">
        <!-- Question Title -->
        <div>{{ comment["content"] }}</div>
      </b-col>
      <b-col>
        <!-- Creation Date -->
        <div class="text-center text-secondary">{{ comment["creationDate"].format("YYYY-MM-DD") }}</div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Comment",
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>
