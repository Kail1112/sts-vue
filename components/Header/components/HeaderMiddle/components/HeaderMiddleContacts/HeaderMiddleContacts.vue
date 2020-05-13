<template>
  <div v-if="contacts.length > 0" class="header-middle-info">
    <div v-for="({icon, title, inner}, index) in contacts"
         :key="`header-middle-cotact-${index}`"
         class="header-middle-info__item">

      <div class="header-info-item">
        <p v-if="icon.type === 'ico'" :class="`sts-icon ${icon.path}`"></p>
        <p class="header-info-item__title" v-html="title"></p>
        <p class="header-info-item__text" v-html="inner"></p>
      </div>

    </div>
  </div>
</template>

<script>
    import './index.scss';

    export default {
        name: "HeaderMiddleContacts",
        props: {
            contacts: { type: Array, default: () => [] }
        }
    }
</script>
