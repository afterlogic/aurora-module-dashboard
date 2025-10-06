<template>
  <div class="dashboard-card" :class="cardClass">
    <div class="card-header" v-if="$slots.nav || $slots.controls">
      <div class="card-nav">
        <slot name="nav"></slot>
      </div>
      <div class="card-controls">
        <slot name="controls"></slot>
      </div>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'DashboardCard',
  props: {
    type: { type: String, default: '' }
  },
  computed: {
    cardClass() {
      return this.type ? 'card-' + this.type : ''
    }
  }
}
</script>

<style scoped>
.dashboard-card {
  display: flex;
  flex-direction: column;
  height: 315px;
  max-height: 100%;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.card-nav {
  display: flex;
  align-items: center;
}

.card-controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
}
</style>



