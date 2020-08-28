const BASE_DAY = 'DD/MM/YYYY'
const BASE_HOURS = 'HH:mm:ss'

const MOCK_CURRENT_APPOINTMENT = '2020-08-24T09:00:00'

export default {
  DAY_FORMAT: BASE_DAY,
  DAY_LETTER_FORMAT: 'dddd, DD MMMM YYYY',
  FULL_FORMAT: `${BASE_DAY} ${BASE_HOURS}`,
  DAY_LETTER_FULL_FORMAT: `dddd, DD MMMM YYYY ${BASE_HOURS}`,
  API: {
    DAY_FORMAT: 'yyyyMMDD'
  },
  MOCK_CURRENT_APPOINTMENT
}
