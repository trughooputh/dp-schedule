<template>
  <div id="app">
    <CustomMenu />
    <main id="main">
      <Presentation />
      <Appointment />
      <Agenda />
    </main>
    <CustomFooter />
    <Modal
      v-show="IsConfirmedAppointnment"
    />
  </div>
</template>

<script>
import Presentation from '@/components/Presentation/PresentationComponent.vue'
import Agenda from '@/components/Agenda/AgendaComponent'
import Appointment from '@/components/Appointment/AppointmentComponent'
import CustomMenu from '@/components/CustomMenu/CustomMenuComponent'
import CustomFooter from '@/components/CustomFooter/CustomFooterComponent'
import Modal from '@/components/Modal/ModalComponent.vue'

export default {
  name: 'App',
  components: {
    Presentation,
    Agenda,
    Appointment,
    CustomMenu,
    CustomFooter,
    Modal
  },
  computed: {
    IsConfirmedAppointnment () {
      return this.$store.state.isConfirmed
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
