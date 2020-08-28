import { shallowMount, createLocalVue } from '@vue/test-utils'
import AgendaComponent from '@/components/Agenda/AgendaComponent.vue'

import Vuex from 'vuex'

// Mock
import MockStore from '../../mockStore'
const VueWithVuex = createLocalVue()
VueWithVuex.use(Vuex)

describe('Agenda component', () => {
  let wrapper
  const store = new Vuex.Store(MockStore)

  describe('Set up', () => {
    it('Is mounted', () => {
      wrapper = shallowMount(AgendaComponent, {
        localVue: VueWithVuex,
        store
      })
    })
    it('Renders the correct markup', () => {
      const AgendaList = wrapper.find('.Agenda__Days')
      const AgendaTitle = wrapper.find('h3')
      expect(AgendaList.exists()).toBe(true)
      expect(AgendaTitle.exists()).toBe(true)
    })
  })

  describe('When click on "Next" icon', () => {
    wrapper = shallowMount(AgendaComponent, {
      localVue: VueWithVuex,
      store
    })
    it('Then, it should call method "nextWeek"', () => {
      const spyNextWeek = jest.spyOn(wrapper.vm, 'nextWeek')
      const buttonNextWeek = wrapper.find('.Agenda__Button--next')
      buttonNextWeek.trigger('click')
      expect(spyNextWeek).toHaveBeenCalled()
    })
  })

  describe('When click on "Previous" icon', () => {
    wrapper = shallowMount(AgendaComponent, {
      localVue: VueWithVuex,
      store
    })
    it('Then, it should call method "previousWeek"', () => {
      const spyPreviousWeek = jest.spyOn(wrapper.vm, 'previousWeek')
      const buttonPreviousWeek = wrapper.find('.Agenda__Button--previous')
      buttonPreviousWeek.trigger('click')
      expect(spyPreviousWeek).toHaveBeenCalled()
    })
  })
})
