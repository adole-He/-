import Vue from 'vue'
import ranking from '@/components/ranking'

describe('ranking.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(ranking)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.bg .username').textContent)
      .toEqual('用户名')
      expect(vm.$el.querySelector('.bg .userscore').textContent)
      .toEqual('得分')
  })
})
