<template>
  <div v-if="links.length > 0" class="header-middle-links">
    <ul>
      <li v-for="({type, name, path}, index) in links"
          :key="`middle-links-${index}`">
        <router-link v-if="type === 'self'" :to="{ path }" class="header-middle-link">{{name}}</router-link>
        <a v-if="type === 'other'" :href="path" class="header-middle-link">{{name}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
    import './index.scss';

    export default {
        name: "HeaderMiddleLinks",
        props: {
            links: { type: Array, default: () => [] }
        }
    }
</script>
