<template>
  <div class="default-card" :class="cardClass">
    <div class="card-content">
      <div class="card-icon" v-if="data.icon">
        <i :class="data.icon"></i>
      </div>
      <div class="card-text">
        <h4 class="card-title" v-if="data.title">{{ data.title }}</h4>
        <p class="card-description" v-if="data.description">{{ data.description }}</p>
        <div class="card-actions" v-if="data.actions && data.actions.length > 0">
          <button 
            v-for="action in data.actions" 
            :key="action.id || action.text"
            class="btn btn-sm"
            :class="action.class || 'btn-default'"
            @click="action.onClick"
          >
            {{ action.text }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultCardTemplate',
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