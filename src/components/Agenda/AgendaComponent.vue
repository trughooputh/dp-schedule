<template>
  <div class="Agenda columns is-centered hero is-light pb-6">
    <header>
      <h3 class="subtitle is-3 mt-6 mb-6">
        <i
          class="Agenda__Button--previous fas fa-arrow-left mr-2"
          @click="previousWeek()"
          v-show="currentWeek < weekNumber"
        />
        Week {{ weekNumber }}
        <i
          class="Agenda__Button--next fas fa-arrow-right ml-2"
          @click="nextWeek()"
          v-show="weekNumber < totalNumberWeek"
        />
      </h3>
    </header>
    <ul
      class="Agenda__Days columns is-flex"
    >
      <li
        v-for="(day, index) in DaysOfTheWeek"
        :key="index"
        :class="{'disabled' : !isFuture(day) }"
      >
        <span>
          <strong>{{ day.format('dddd') }}</strong>
          <br>
          {{ day.format('DD, MMM.') }}
        </span>
        <Slots
          :day="day"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import moment from 'moment'
import DATE from '@/constants/date.config.js'
import Slots from '@/components/Slots/SlotsComponent.vue'

export default {
  name: 'Agenda',
  components: {
    Slots
  },
  data () {
    return {
      firstDayDate: null,
      weekNumber: null,
      currentWeek: null,
      totalNumberWeek: 53
    }
  },
  created () {
    this.weekNumber = moment().week()
    this.currentWeek = moment().week()
    this.updateFirstDay()
    this.getSlots()
  },
  computed: {
    WeeklySlots () {
      return this.$store.state.weeklySlots
    },
    DaysOfTheWeek () {
      const startOfWeek = moment().week(this.weekNumber).startOf('isoWeek')
      const endOfWeek = moment().week(this.weekNumber).endOf('isoWeek')

      const days = []
      let day = startOfWeek

      while (day <= endOfWeek) {
        days.push(day)
        day = day.clone().add(1, 'day')
      }
      return days
    }
  },
  watch: {
    weekNumber: function () {
      this.updateFirstDay()
      this.getSlots()
    }
  },
  methods: {
    getSlots () {
      const firstDayFormated = this.firstDayDate.format(DATE.API.DAY_FORMAT)
      this.$store.dispatch('loadWeeklySlots', firstDayFormated)
    },
    previousWeek () {
      this.weekNumber--
    },
    nextWeek () {
      this.weekNumber++
    },
    updateFirstDay () {
      this.firstDayDate = moment().week(this.weekNumber).isoWeekday(1)
    },
    isFuture (day) {
      return moment(day).isAfter(moment())
    }
  }
}
</script>

<style lang="scss" scoped>
.Agenda {
  header {
    i {
      cursor: pointer;
    }
  }
  &__Days {
    flex-direction: row;
    justify-content: center;
    min-height: 370px;
    li {
      font-size: 1rem;
      width: 10%;
      &.disabled {
        opacity: 0.2;
      }
    }
  }
}
</style>
