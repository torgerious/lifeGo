import Vue from 'vue';
import Vuex from 'vuex';
import { achievements } from './achievements';
import { user } from './user';


Vue.use(Vuex);

export  const store =  new Vuex.Store({
    modules:{
        achievements,
        user
    }
});
