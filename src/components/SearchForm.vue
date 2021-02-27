<template>
  <div>
    <b-form inline @submit="onSubmit">
      <b-input-group>
        <!-- Input Field -->
        <b-form-input v-model="form.tag" placeholder="Enter a tag to search by" required />

        <!-- Search Button -->
        <b-input-group-append>
          <b-button type="submit" variant="primary">
            <b-icon-search/>
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "SearchForm",
  data() {
    return {
      form: {
        tag: null
      }
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      this.$emit("search", this.form)
    }
  }
}
</script>
