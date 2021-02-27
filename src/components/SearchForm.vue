<template>
  <div>
    <b-form inline @submit="onSubmit">
      <b-input-group class="w-100 mx-auto">
        <!-- Search Button -->
        <b-input-group-prepend>
          <b-button type="submit" variant="primary">
            <b-icon-search/>
          </b-button>
        </b-input-group-prepend>

        <!-- Input Field -->
        <b-form-input v-model="form.tag" placeholder="Enter a tag to search by" required />
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
