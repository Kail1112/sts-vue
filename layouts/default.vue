<template>
  <main class="main">
    <Header/>
    <div class="content-page">
      <nuxt/>
    </div>
    <Footer/>
  </main>
</template>

<script>
  import '../assets/index.scss'

  import Header from "../components/Header/Header";
  import Footer from "../components/Footer/Footer";

  export default {
      name: 'main-layout',
      components: {
          Header,
          Footer
      }
  }
</script>
