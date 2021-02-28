<template>
  <div id="app" class="w-75 mx-auto py-5">
    <PostingBoard/>
  </div>
</template>

<script>

import PostingBoard from "@/components/PostingBoard";

export default {
  name: 'App',
  components: {PostingBoard}
}
</script>
