<template>
  <div class="w-full bg-gray-900 rounded-full h-4 overflow-hidden">
    <div
      class="bg-gradient-to-r from-blue-400 to-purple-600 h-4 rounded-full"
      :style="{ width: progress + '%' }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    progress: {
      type: Number,
      default: 0,
    },
  },
};
</script>
