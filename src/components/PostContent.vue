<template>
  <div>
    <b-row>
      <b-col cols="1">
        <!-- Vote Count -->
        <h5 class="text-center text-secondary">{{ post["voteCount"] }}</h5>
      </b-col>
      <b-col cols="11" class="pl-0 pr-5">
        <!-- Content -->
        <div v-html="post['content']" />

        <!-- Creation Date -->
        <div class="text-right text-secondary small">{{ post["creationDate"].format("YYYY-MM-DD") }}</div>

        <!-- Comments -->
        <div class="mt-4">
          <div v-for="(comment, index) in post['comments']" :key="index" class="small">
            <hr class="my-2"/>
            <Comment :comment="comment" />
          </div>
          <hr v-if="post['comments'].length > 0" class="my-2"/>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Comment from "@/components/Comment";

export default {
  name: "PostContent",
  components: { Comment },
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>
