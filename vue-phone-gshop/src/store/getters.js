
export default {

    getUserInfo(state){
        return state.userInfo
    },

    getCartPrice(state){
        return state.cartFoods.map(value => {
           return  value.price * value.count
        }).reduce((previousValue, currentValue, currentIndex, array) => {
            return previousValue + currentValue
        },0);
    }
}


