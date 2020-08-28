<template>
  <nav class="customMenu hero navbar">
    <div class="container">
      <div class="navbar-brand">
        <Logo />
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from '@/components/Logo/LogoComponent.vue'

export default {
  name: 'LogoComponent',
  components: {
    Logo
  },
  data () {
    return {
      showNav: false
    }
  }
}
</script>

<style lang="scss" scoped>
.customMenu {
  a {
    font-weight: bold;
    color: #fff;
  }
}
</style>
