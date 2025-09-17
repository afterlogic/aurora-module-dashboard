<template>
  <div class="list-card" :class="cardClass">
    <div class="list-header" v-if="data.title">
      <h4 class="list-title">{{ data.title }}</h4>
      <div class="list-actions" v-if="data.actions && data.actions.length > 0">
        <button 
          v-for="action in data.actions" 
          :key="action.id || action.text"
          class="btn btn-xs"
          :class="action.class || 'btn-default'"
          @click="action.onClick"
        >
          {{ action.text }}
        </button>
      </div>
    </div>
    <div class="list-content">
      <div class="list-items" v-if="items && items.length > 0">
        <div 
          class="list-item" 
          v-for="item in items" 
          :key="item.id || item.title"
          @click="item.onClick"
        >
          <div class="item-icon" v-if="item.icon">
            <i :class="item.icon"></i>
          </div>
          <div class="item-content">
            <div class="item-title">{{ item.title }}</div>
            <div class="item-subtitle" v-if="item.subtitle">{{ item.subtitle }}</div>
            <div class="item-description" v-if="item.description">{{ item.description }}</div>
          </div>
          <div class="item-actions" v-if="item.actions && item.actions.length > 0">
            <button 
              v-for="action in item.actions" 
              :key="action.id || action.text"
              class="btn btn-xs"
              :class="action.class || 'btn-default'"
              @click.stop="action.onClick"
            >
              {{ action.text }}
            </button>
          </div>
        </div>
      </div>
      <div class="list-empty" v-else>
        <div class="empty-icon">
          <i class="icon-list"></i>
        </div>
        <p class="empty-text">{{ data.emptyText || 'No items available' }}</p>
      </div>
    </div>
    <div class="list-footer" v-if="data.footer">
      <p class="list-footer-text">{{ data.footer }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListCardTemplate',
  props: {
    data: { type: Object, default: () => ({}) },
    class: { type: String, default: '' }
  },
  data() {
    return {
      items: []
    }
  },
  computed: {
    cardClass() {
      return this.class || '';
    }
  },
  watch: {
    data: {
      handler(newData) {
        if (newData && newData.data && newData.data.items) {
          this.items = newData.data.items;
        }
      },
      deep: true,
      immediate: true
    },
    'data.data.items': {
      handler(newItems) {
        if (newItems) {
          this.items = newItems;
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    if (this.data && this.data.data && this.data.data.items) {
      this.items = this.data.data.items;
    }
  }
}
</script>
