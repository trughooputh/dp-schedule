<template>
  <p class="Location">
    <i class="fas fa-map-marker-alt mr-2" /><strong>{{ details.name }},</strong>
    <br>
    <span>{{ details.address }}, {{ details.zipcode }}, {{ details.city }}, {{ details.country }}</span>
  </p>
</template>

<script>
export default {
  name: 'Location',
  props: {
    details: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.Location {
  span {
    font-size: 0.8rem;
    position: relative;
    top: -7px;
  }
}
</style>
