import Vue from 'vue';
import Vuex from 'vuex';
import state from './state/state';
import mutations from './mutations/mutations';
import getters from './getters/getters';
import actions from './actions/actions';
Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
});
