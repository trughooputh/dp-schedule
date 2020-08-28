<template>
  <transition name="modal-fade">
    <div
      class="modal is-active"
    >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head"></header>
        <section class="modal-card-body">
          <i class="fa fa-check-circle modal-icon" aria-hidden="true"></i>
          <p class="title is-5">Appointment updated</p>
          <p>
            <i class="fas fa-calendar-alt mr-2" />
            <strong>{{ Appointnment }}</strong>
          </p>
        </section>
        <footer class="modal-card-foot">
          <button
            class="button is-success"
            @click="close"
          >
            OK
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import moment from 'moment'
import DATE from '@/constants/date.config.js'

export default {
  name: 'modal',
  created () {
    this.DATE = DATE
  },
  methods: {
    close () {
      this.$emit('close')
      this.$store.dispatch('isConfirmed', false)
      this.$store.dispatch('selectAppointment', null)
    }
  },
  computed: {
    Appointnment () {
      return this.$store.state.selectedAppointment ? moment(this.$store.state.selectedAppointment.hours.start).format(DATE.DAY_LETTER_FULL_FORMAT) : null
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  &-card-foot {
    justify-content: center;
  }
  &-icon {
      font-size: 2rem;
      position: absolute;
      top: 25px;
      left: 47%;
      color: green;
  }
}
</style>
