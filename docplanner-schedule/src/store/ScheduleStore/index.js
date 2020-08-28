import moment from 'moment'
import API from '@/api'

export const NAMESPACE = 'ScheduleStore'

export default {
  state: {
    weeklySlots: [],
    currentAppointment: '2020-09-11T08:00:00',
    selectedAppointment: null,
    isConfirmed: false
  },
  mutations: {
    SELECT_APPOINTMENT: (state, payload) => {
      state.selectedAppointment = payload
    },
    SET_APPOINTMENT: (state, payload) => {
      state.currentAppointment = payload
    },
    CONFIRMED_APPOINTMENT: (state, payload) => {
      state.isConfirmed = payload
    },
    LOAD_SLOTS: (state, payload) => {
      state.weeklySlots = payload
    }
  },
  actions: {
    selectAppointment: ({ state, commit }, appointment) => {
      commit('SELECT_APPOINTMENT', appointment)
    },
    confirmSelectedAppointment: ({ commit, state }, appointmentDetails) => {
      const payload = {
        Start: moment(state.selectedAppointment.hours.start).format('YYYY-MM-DD HH:mm:ss'),
        End: moment(state.selectedAppointment.hours.end).format('YYYY-MM-DD HH:mm:ss'),
        ...appointmentDetails
      }
      return new Promise((resolve, reject) => {
        API.slots.book(payload)
          .then(res => {
            commit('SET_APPOINTMENT', state.selectedAppointment.hours.start)
            commit('CONFIRMED_APPOINTMENT', true)
            resolve(res)
          }, error => {
            reject(error)
          })
      })
    },
    isConfirmed: ({ commit }, payload) => {
      commit('CONFIRMED_APPOINTMENT', payload)
    },
    loadWeeklySlots: ({ commit }, mondayDate) => {
      API.slots.getWeekly(mondayDate)
        .then((res) => {
          commit('LOAD_SLOTS', res.data)
        })
        .catch((error) => {
          console.log('error', error)
        })
    }
  },
  getters: {
    getSlotsByDay: (state) => (day) => {
      const formatedDayToFind = day.format('YYYY-MM-DD')
      const isFuture = moment(day).isAfter(moment())
      const slots = state.weeklySlots
        .filter(slot => {
          return formatedDayToFind === slot.Start.split('T')[0] && isFuture
        })
        .map(slot => {
          return {
            dateStart: moment(slot.Start),
            hours: {
              start: slot.Start,
              end: slot.End
            },
            isTaken: slot.Taken,
            isCurrent: slot.Start === state.currentAppointment
          }
        })
      return slots
    }
  }
}
