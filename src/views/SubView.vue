<template>
  <section>
    <section v-if="show">
      <slot></slot>
    </section>
    <section v-else>
      <router-view></router-view>
    </section>
  </section>
</template>

<script>
  export default {
    computed: {
      show () {
        return this.$route.matched[1].name === this.$route.name
      }
    },
    created () {
      console.log('$route', this.$route)
    }
  }
</script>
