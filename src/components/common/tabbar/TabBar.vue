<template>
    <div id="tab-bar">
      <slot></slot>
    </div>   
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style scoped>
  #tab-bar {
    display: flex;
    background-color: rgb(173, 169, 169);

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    box-shadow: 0px -2px 1px rgba(173, 169, 169, 0.2);
  }
</style>
