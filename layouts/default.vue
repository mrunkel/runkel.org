<template>
  <div>
    <header-component></header-component>
    <Nuxt />
    <footer-component></footer-component>
  </div>

</template>

<style>
</style>
<script>
import FooterComponent from '~/components/footer';
import HeaderComponent from '~/components/header';
export default {
  components: {FooterComponent, HeaderComponent},
};
</script>
