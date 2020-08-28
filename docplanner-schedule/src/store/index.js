import Vue from 'vue'
import Vuex from 'vuex'

// Store
import ScheduleStore from './ScheduleStore'

Vue.use(Vuex)

const store = new Vuex.Store(ScheduleStore)

export default store
