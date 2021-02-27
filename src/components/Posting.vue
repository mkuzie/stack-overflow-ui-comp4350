<template>
  <div class="accordion" role="tablist">
    <b-card no-body>
      <b-card-header header-bg-variant="light">
        <b-row align-v="center">
          <b-col cols="1">
            <div class="text-center small">
              <div>9</div>
              <div>Votes</div>
            </div>
          </b-col>
          <b-col cols="9">
            <h4 class="mb-0">
              <b-link @click="clickHandler">How do you search for a post by tag?</b-link>
            </h4>
          </b-col>
          <b-col>
            <div class="text-center small">{{ this.$dayjs().format("YYYY-MM-DD") }}</div>
          </b-col>
        </b-row>
      </b-card-header>
      <b-collapse :visible="show">
        <b-card-body>
          Text
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Posting",
  data() {
    return {
      show: false
    }
  },
  methods: {
    clickHandler() {
      this.show = !this.show
    }
  }
}
</script>
