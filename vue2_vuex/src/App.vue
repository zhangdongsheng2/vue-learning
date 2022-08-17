<template>
  <div >
    <h1>Shopping Cart Example</h1>
    <products></products>
    <hr>
    <cart></cart>
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions} from 'vuex'
import Products from "./components/Products";
import Cart from "./components/Cart";

export default {
  name: 'App',
  components: {Products,Cart},
  computed: {
    // count () {
    //   return this.$store.state.count
    // },
    // evenOrOdd () {
    //   return this.$store.getters.evenOrOdd
    // }
    ...mapState(['count']),
    ...mapGetters(['eventOrOdd'])
  },
  mounted() {
    console.log(this.$store)
    console.log(mapState)
  },
  methods: {
    ...mapActions(['increment','decrement','incrementIfOdd','incrementAsync'])
  }

}
</script>

