<template>
  <div class="hello">
    <v-custom></v-custom>
  </div>
</template>

<script>
import vCustom from './from.vue'
export default {
  data () {
    return {}
  },
  components: {vCustom}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    width:50%;
    margin:60px auto;
  }
</style>
