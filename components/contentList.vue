<template>
  <div class="space-y-4">
    <div
      v-for="item in contents"
      :key="item.id"
      @click="selectContent(item)"
      class="cursor-pointer p-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-700 flex items-center"
      :class="{
        'bg-gray-700 shadow-lg transform scale-105':
          selectedContent && selectedContent.id === item.id,
      }"
    >
      <div
        class="flex-shrink-0 w-16 h-16 mr-4 overflow-hidden rounded-lg bg-gray-600"
      >
        <img
          v-if="item.cover"
          :src="item.cover"
          alt="cover"
          class="w-full h-full object-cover"
        />
        <div
          v-else
          class="w-full h-full flex items-center justify-center text-gray-400"
        >
          <span class="text-2xl">{{ item.title.charAt(0) }}</span>
        </div>
      </div>
      <div>
        <h3 class="text-lg font-semibold text-white">{{ item.title }}</h3>
        <p class="text-sm text-gray-400 mt-1">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentList",
  props: {
    contents: {
      type: Array,
      required: true,
    },
    selectedContent: {
      type: Object,
      default: null,
    },
  },
  methods: {
    selectContent(item) {
      this.$emit("select", item);
    },
  },
};
</script>
