<template>
  <div class="">
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'Splash',
  data () {
    return {
      msg: 'Rapid On-Site Evaluation'
    }
  },
  methods: {
    goToHome () {
      this.$router.replace('/home')
    }
  },
  mounted () {
    var self = this
    setTimeout(function () {
      self.goToHome()
    }, 2000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
