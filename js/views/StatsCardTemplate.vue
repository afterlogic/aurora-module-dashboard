<template>
  <div class="stats-card" :class="cardClass">
    <div class="stats-header" v-if="data.title">
      <h4 class="stats-title">{{ data.title }}</h4>
    </div>
    <div class="stats-content">
      <div class="stats-grid" v-if="data.stats && data.stats.length > 0">
        <div 
          class="stat-item" 
          v-for="stat in data.stats" 
          :key="stat.id || stat.label"
        >
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-change" v-if="stat.change" :class="stat.change > 0 ? 'positive' : 'negative'">
            <i :class="stat.change > 0 ? 'icon-arrow-up' : 'icon-arrow-down'"></i>
            {{ Math.abs(stat.change) }}%
          </div>
        </div>
      </div>
      <div class="stats-chart" v-if="data.chart">
        <!-- Chart placeholder - can be replaced with actual chart library -->
        <div class="chart-placeholder">
          <i class="icon-chart"></i>
          <span>Chart: {{ data.chart.type }}</span>
        </div>
      </div>
    </div>
    <div class="stats-footer" v-if="data.footer">
      <p class="stats-footer-text">{{ data.footer }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatsCardTemplate',
  props: {
    data: { type: Object, default: () => ({}) },
    class: { type: String, default: '' }
  },
  computed: {
    cardClass() {
      return this.class || '';
    }
  }
}
</script>