import * as types from './mutations-types'
import axios from 'axios'
export  default {
  search({commit},searchName){
    const url = 'https://api.github.com/search/users?q=' + searchName

    commit(types.REQUESTING)

    axios.get(url)
      .then(response => {
        //成功更新数据
         const cards = response.data.items.map(it => ({
          url: it.html_url,
          avatarUrl: it.avatar_url,
          username: it.login
        }))
        commit(types.REQUEST_SUCCESS,{cards})
      })
      .catch(error => {
        //失败
        commit(types.REQUEST_ERROR,{msg:'请求失败'})
      })


  },
}




