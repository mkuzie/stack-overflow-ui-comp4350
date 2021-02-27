<template>
  <div id="app">
    <SearchForm/>
    <PostingBoard/>
  </div>
</template>

<script>

import PostingBoard from "@/components/PostingBoard";
import SearchForm from "@/components/SearchForm";

export default {
  name: 'App',
  components: {SearchForm, PostingBoard}
}
</script>
