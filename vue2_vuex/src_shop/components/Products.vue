<template>
<div>
  <h2>Products</h2>
  <ul>
    <li v-for="p in products">
      {{p.title}}---{{p.price | currency}}
      <p @click="addToCart(p)"><button :disabled="p.inventory === 0">Add to cart</button> </p>
    </li>
  </ul>
</div>
</template>

<script>
import {mapState,mapGetters,mapActions} from 'vuex'

export default {
  name: "Products",
  created() {
    this.$store.dispatch('getProducts')
  },
  computed: mapGetters(['products']),
  methods: mapActions(['addToCart'])
}
</script>

<style scoped>

</style>
