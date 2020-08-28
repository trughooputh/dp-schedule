<template>
  <div class="Appointment columns is-centered hero is-primary pt-5 pb-5">
    <p>Your current appointment is plan with Dr/Dra <strong>{{ doctor }}</strong><i class="fas fa-stethoscope ml-1" /></p>
    <p class="Appointment__Question">Where?</p>
    <Location
      :details="location"
    />
    <p class="Appointment__Question">When?</p>
    <p
      :class="{'unavailable': SelectedAppointnment}"
    >
      <i class="fas fa-calendar-alt mr-2" />
      <strong>{{ CurrentAppointment.format(DATE.DAY_LETTER_FULL_FORMAT) }}</strong>
    </p>
    <template v-if="SelectedAppointnment">
      <p>New appointment:</p>
      <p>
        <i class="fas fa-calendar-alt mr-2" />
        <strong>{{ SelectedAppointnment.format(DATE.DAY_LETTER_FULL_FORMAT) }}</strong>
        <i
          class="Appointment__Remove fas fa-times ml-2"
          @click="removeAppointment()"
        />
      </p>
      <textarea
        class="Appointment__Comment is-block pt-3 pb-3 pl-3 pr-3 mb-4"
        :placeholder="placeholder"
        v-model="comment"
      ></textarea>
      <div class="buttons is-block">
        <a
          class="button is-primary is-inverted"
          @click="confirmAppointment()"
          v-show="!loading"
        >Confirm</a>
        <a
          class="button is-loading is-primary"
          v-show="loading"
        >
          Loading
        </a>
      </div>
    </template>
  </div>
</template>

<script>
import moment from 'moment'
import Location from '@/components/Location/LocationComponent.vue'
import DATE from '@/constants/date.config.js'

export default {
  name: 'Appointment',
  components: {
    Location
  },
  data () {
    return {
      doctor: 'Fernando Simón',
      location: {
        name: 'Hospital del Mar',
        address: 'Passeig Marítim de la Barceloneta, 25, 29',
        city: 'Barcelona',
        country: 'Spain',
        zipcode: '08003'
      },
      placeholder: 'Additional informations',
      comment: '',
      loading: false
    }
  },
  computed: {
    SelectedAppointnment () {
      return this.$store.state.selectedAppointment ? moment(this.$store.state.selectedAppointment.hours.start) : null
    },
    CurrentAppointment () {
      return moment(this.$store.state.currentAppointment)
    }
  },
  created () {
    this.DATE = DATE
  },
  methods: {
    removeAppointment () {
      this.$store.dispatch('selectAppointment', null)
      this.comment = ''
    },
    confirmAppointment () {
      this.loading = true
      const appointmentDetails = {
        Comments: this.comment,
        Patient: {
          Name: 'Ousmane',
          SecondName: 'Dembele',
          Email: 'ousmane@fcb.com',
          Phone: '+34 654 654 654'
        }
      }
      this.$store.dispatch('confirmSelectedAppointment', appointmentDetails)
        .then(response => {
          this.loading = false
          this.comment = ''
        },
        error => {
          console.error(error, 'Please check internet connection and try again')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.Appointment {
  flex-direction: column;
  margin-bottom: 20px;
  &__Comment {
    width: 30%;
    margin: 0 auto;
    border-radius: 7px;
  }
  &__Question {
    text-decoration: underline;
    font-size: 0.8rem;
  }
  p {
    margin-bottom: 5px;
    &.unavailable {
      text-decoration: line-through;
    }
  }
  &__Remove {
    cursor: pointer;
  }

}
</style>
