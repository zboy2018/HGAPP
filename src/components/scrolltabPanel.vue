<template>
  <div class="scrolltab-content-item">
    <strong class="scrolltab-content-title">{{label}}</strong>
    <slot></slot>
  </div>
</template>

<script type="text/babel">
  export default {
    props: {
      label: String,
      icon: String,
      active: Boolean
    },
    mounted() {
      this.$parent.addItem({label: this.label, icon: this.icon, _uid: this._uid});
    }
  }
</script>
