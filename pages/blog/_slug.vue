<script>
export default {
  async asyncData({$content, params}) {
    const article = await $content('articles', params.slug).fetch();

    const [prev, next] = await $content('articles').
        where({
                status: {
                  $ne: 'private',
                },
              }).
        only(['title'], ['slug']).
        sortBy('createdAt', 'asc').
        surround(params.slug).
        fetch();

    return {
      article,
      prev,
      next,
    };
  },
  head() {
    return {
      title: this.article.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.description,
        },
      ],
      link: [
        {
          rel: "canonical",
          href: "https://runkel.org/blog/" + this.article.slug,
        },
      ],
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
  <article class="max-w-4xl mx-auto">
    <h1 class="text-4xl pr-4 py-4">{{ article.title }}</h1>
    <p>Posted: {{ formatDate(article.date) }} Last updated: {{ formatDate(article.updatedAt) }}</p>

    <div class="prose">
      <nuxt-content :document="article"/>
    </div>
    <prev-next :prev="prev" :next="next"/>
  </article>
</template>
