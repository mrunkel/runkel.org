<template>
  <div class="bg-gray-50">
    <div class="max-w-7xl mx-auto py-12 px-4 divide-y-2 divide-gray-200 sm:px-6 lg:py-16 lg:px-8">
      <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">Tag: {{ $route.params.slug }}</h2>
      <div class="mt-6">
        <dl class="space-y-8 divide-y divide-gray-200" v-for="article in articles" :key="article.dir">
          <div class="pt-6 md:grid md:grid-cols-12 md:gap-8">
            <dt class="text-base font-medium text-gray-900 md:col-span-5">
              {{ article.title }}
            </dt>
            <dd class="mt-2 md:mt-0 md:col-span-7">
              <p class="text-base text-gray-500">
                {{ article.description }}
              </p>
              <nuxt-link class="hover:text-blue-500" :to="'/blog/' + article.slug">Read more</nuxt-link>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({$content, params, error}) {
    try {
      const articles = await $content('articles').
          where({tags: {$contains: params.slug}}).
          where({status: {$ne: 'private'}}).
          fetch();
      return {articles};
    } catch (err) {
      error({
              statusCode: 404,
              message: 'Page could not be found',
            });
    }
  },
  head() {
    return {
      title: 'Tags',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Cool nuxt blog tags',
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://runkel.org/tags',
        },
      ],
    };
  },
};
</script>
