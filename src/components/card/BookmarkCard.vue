<template>
  <div class="card">
    <p>
      <strong>{{ bookmark.title }}</strong>
    </p>
    <span>
      <a :href="bookmark.url" target="_blank"
        ><button style="color: white; background-color: blue">
          Open URL
        </button></a
      ></span
    >
    <span>
      <button
        style="color: white; background-color: red"
        @click="handleDeleteOneBookmark(elementKey)"
      >
        Delete
      </button></span
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      elementKey: this.$vnode.key,
    };
  },
  emits: ["deleteBookmark"],
  props: ["bookmark"],
  inject: ["handleBookmarkDeleted"],
  methods: {
    handleDeleteOneBookmark(key) {
      this.handleBookmarkDeleted(key);
    },
  },
};
</script>

<style scoped>
.card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.26);
  /* cursor: pointer; */
  margin: 0 0.5rem;
  max-width: 100%;
  padding: 1rem;
  width: 20rem;
}

.card:hover {
  background-color: whitesmoke;
}

span {
  display: block;
  margin-bottom: 0.5rem;
}

p {
  margin-top: 0;
  max-width: 100%;
  overflow: hidden !important;
  text-overflow: ellipsis;
  white-space: nowrap;
}

button {
  border-radius: 6px !important;
  border: 1px solid transparent;
  cursor: pointer;
  font-size: 1rem;
  vertical-align: middle;
  font-weight: 400;
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
