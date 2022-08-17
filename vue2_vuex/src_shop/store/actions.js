import * as types from './types'
// import {ADD_TO_CART} from "./types";

export  default {
  addToCart({commit},p){
    if(p.inventory){
      commit(types.ADD_TO_CART,{id:p.id})
    }
  }
}




