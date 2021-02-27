<template>
  <div id="app" class="w-75 mx-auto pt-5">
    <SearchForm class="pb-4"/>
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
