let responseTimerMixin = {
  data: function() {
    return {
      time: null
    }
  },
  methods: {
    timer() {
      let timeDifference = null;

      if (this.time == null) {
        // Start the timer
        this.time = this.$dayjs();
      } else {
        // Stop the timer and report the time difference
        timeDifference = this.$dayjs().diff(this.time, "s", true);
        this.time = null;
      }

      return timeDifference
    },
    showResponseTimeToast(responseTime) {
      this.$bvToast.toast(`Responded in ${responseTime} seconds.`, {
        title: "Response Time",
        toaster: "b-toaster-bottom-right",
        solid: true,
        appendToast: true
      })
    }
  }
}

export default responseTimerMixin;
