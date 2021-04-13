<script>
export default {
  async asyncData({$content, params}) {
    const page = await $content('pages', params.slug).fetch();


    return {
      page,
    };
  },
  methods: {
    formatDate(date) {
      const options = {year: 'numeric', month: 'long', day: 'numeric'};
      return new Date(date).toLocaleDateString('en', options);
    },
  },
};
</script>
<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-4xl pr-4 py-4">{{ page.title }}</h1>
    <div class="prose mx-auto">
      <nuxt-content :document="page"/>
    </div>
  </div>

</template>
