<template>
  <main class="main">
    <div class="content-page">
      <nuxt/>
    </div>
    <Footer/>
  </main>
</template>

<script>
  import '../assets/index.scss'

  import Footer from "../components/Footer/Footer";

  export default {
      name: 'main-layout',
      components: {
          Footer
      }
  }
</script>
