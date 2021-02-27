<template>
  <div>
    <Posting />
  </div>
</template>

<script>
import Posting from "@/components/Posting";
export default {
  name: "PostingBoard",
  components: {Posting},
  data() {
    return {
      selected: null
    }
  },
  methods: {
    clickHandler(id) {
      // TODO: Expand the posting when its title is clicked
      console.log(id)
    }
  }
}
</script>
