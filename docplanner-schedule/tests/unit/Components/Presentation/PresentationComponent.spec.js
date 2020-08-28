import { shallowMount } from '@vue/test-utils'
import PresentationComponent from '@/components/Presentation/PresentationComponent.vue'

describe('Presentation component', () => {
  let wrapper
  describe('Set up', () => {
    it('Is mounted', () => {
      wrapper = shallowMount(PresentationComponent)
    })
    it('Renders the correct markup', () => {
      const PresentationTitle = wrapper.find('h1')
      const PresentationSubtitle = wrapper.find('.subtitle')
      expect(PresentationTitle.exists()).toBe(true)
      expect(PresentationSubtitle.exists()).toBe(true)
    })
  })
})
