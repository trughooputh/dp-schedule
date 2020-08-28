const state = {
  weeklySlots: [],
  currentAppointment: '',
  selectedAppointment: null,
  isConfirmed: false
}
const mutations = {
  SELECT_APPOINTMENT: jest.fn(),
  SET_APPOINTMENT: jest.fn(),
  CONFIRMED_APPOINTMENT: jest.fn(),
  LOAD_SLOTS: jest.fn()
}
const actions = {
  selectAppointment: jest.fn(),
  confirmSelectedAppointment: jest.fn(),
  isConfirmed: jest.fn(),
  loadWeeklySlots: jest.fn()
}

const getters = {
  getSlotsByDay: jest.fn()
}

export default {
  state,
  mutations,
  actions,
  getters
}
