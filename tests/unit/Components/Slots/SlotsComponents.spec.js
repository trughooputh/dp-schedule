import { shallowMount, createLocalVue } from '@vue/test-utils'
import SlotsComponent from '@/components/Slots/SlotsComponent.vue'

import Vuex from 'vuex'

// Mock
import MockStore from '../../mockStore'
const VueWithVuex = createLocalVue()
VueWithVuex.use(Vuex)

const computed = {
  HasSlots: () => true,
  SlotsByDay: () => [
    {
      hours: {
        start: 'start',
        end: 'end'
      },
      dateStart: {
        format: jest.fn()
      }
    }
  ]
}

const props = ['day']
const propsData = {
  day: {}
}

describe('Slots component', () => {
  let wrapper
  const store = new Vuex.Store(MockStore)

  describe('Properties', () => {
    wrapper = shallowMount(SlotsComponent, {
      localVue: VueWithVuex,
      computed,
      store,
      propsData
    })

    Object.keys(wrapper.vm.$props).forEach((prop) => {
      it(`Prop "${prop}" exists`, () => {
        expect(props.includes(prop)).toEqual(true)
      })
    })

    it('Property "day" is required', () => {
      const propertyName = wrapper.vm.$options.props.day
      expect(propertyName.required).toBe(true)
    })
  })

  describe('Set up', () => {
    it('Is mounted', () => {
      wrapper = shallowMount(SlotsComponent, {
        localVue: VueWithVuex,
        store,
        propsData,
        computed
      })
    })

    it('Renders the correct markup', () => {
      const SlotsList = wrapper.find('.Slots__List')
      const SlotsEmpty = wrapper.find('.Slots__Empty')
      expect(SlotsList.exists()).toBe(true)
      expect(SlotsEmpty.exists()).toBe(false)
    })
  })

  describe('When choose a slot', () => {
    wrapper = shallowMount(SlotsComponent, {
      localVue: VueWithVuex,
      store,
      propsData,
      computed
    })
    xit('Then, it should call method "chooseSlot"', () => {
      const spyChooseSlot = jest.spyOn(wrapper.vm, 'chooseSlot')
      const buttonSlot = wrapper.findAll('.Slots__Time').at(0)
      buttonSlot.trigger('click')
      expect(spyChooseSlot).toHaveBeenCalled()
    })
  })
})
