<template>
  <div class="normal-block">
    <h3 v-if="title !== ''" class="color-white" v-html="title"></h3>
    <ul v-if="links.length > 0" class="list-for-links">
      <li v-for="({path, name}, index) in links"
          :key="index">
        <router-link class="links color-white"
                     :to="{path}">
          <small v-html="name"></small>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "FooterLinksGroup",
        props: {
            title: { type: String, default: '' },
            links: { type: Array, default: () => [] }
        }
    }
</script>
