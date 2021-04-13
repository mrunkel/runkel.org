<template>
  <div class="relative bg-white">
    <div class="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
      <div>
        <a href="/" class="flex">
          <span class="sr-only">runkel</span>
          <img class="h-8 w-auto sm:h-10" src="/images/avatar.jpg" alt="">
        </a>
      </div>
      <div class="hidden md:flex-1 md:flex md:items-center md:justify-between">
        <div class="flex space-x-10">
        </div>
        <div class="flex items-center md:ml-12">
          <a href="/page/about" class="text-base font-medium text-gray-500 hover:text-gray-900">
            About Me
          </a>
          <a href="/resume" class="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            Resume
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header-component'
};
</script>

<style scoped>

</style>
