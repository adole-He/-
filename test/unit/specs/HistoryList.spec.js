import Vue from 'vue'
import history from '@/components/history'


describe('history.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(history)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.loginbg .buttons img').src)
      .toBe('http://localhost/assets/ReturnGame.png')

  })
})
