<template>
  <div class="loading">
    <LoadingIndicatorLarge v-if="size === 'large'"/>
  </div>
</template>

<script>
    import './index.scss';

    import LoadingIndicatorLarge from './components/large/LoadingIndicatorLarge'

    export default {
        name: "LoadingIndicator",
        props: {
            size: { type: String, default: 'large' }
        },
        components: {
            LoadingIndicatorLarge
        }
    }
</script>
