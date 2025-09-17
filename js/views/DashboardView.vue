<template>
  <div class="dashboardHeader">
    <h1>Dashboard</h1>
  </div>
  
  <div class="dashboardContent">
    <div class="dashboardCards" v-if="cards.length > 0">
      <div 
        v-for="card in cards" 
        :key="card.id" 
        class="dashboardCard" 
        :class="'card-' + card.type"
      >
        <div class="cardHeader">
          <h3>{{ card.title }}</h3>
        </div>
        <div class="cardContent">
          <!-- Render component depending on card type -->
          <component 
            :is="getCardComponent(card.type)" 
            :data="card"
            :key="card.id + '-' + (card.data && card.data.items ? card.data.items.length : 0)"
          />
        </div>
      </div>
    </div>
    
    <div class="dashboardEmpty" v-else>
      <p>{{ infoNoCards }}</p>
    </div>
  </div>
</template>

<script>
import DefaultCardTemplate from './DefaultCardTemplate.vue'
import StatsCardTemplate from './StatsCardTemplate.vue'
import ListCardTemplate from './ListCardTemplate.vue'

export default {
  name: 'DashboardView',
  components: {
    DefaultCardTemplate,
    StatsCardTemplate,
    ListCardTemplate
  },
  data() {
    return {
      cards: [],
      infoNoCards: 'No cards available. Other modules can register their cards here.'
    }
  },
  methods: {
    getCardComponent(type) {
      switch(type) {
        case 'stats': return 'StatsCardTemplate'
        case 'list': return 'ListCardTemplate'
        default: return 'DefaultCardTemplate'
      }
    },
    loadInitialCards() {
      // Load cards from CDashboardView
      if (window.CDashboardView && window.CDashboardView.registeredCards) {
        this.cards = window.CDashboardView.registeredCards || []
      } else {
        // Wait for CDashboardView to be available
        let attempts = 0;
        const maxAttempts = 50; // 5 seconds
        const checkCDashboardView = () => {
          attempts++;
          if (window.CDashboardView && window.CDashboardView.registeredCards) {
            this.cards = window.CDashboardView.registeredCards || []
            return;
          }
          if (attempts < maxAttempts) {
            setTimeout(checkCDashboardView, 100);
          }
        };
        setTimeout(checkCDashboardView, 100);
      }
    },
    updateCards(newCards) {
      this.cards = newCards || []
      
      // Force update of all child components
      this.$nextTick(() => {
        this.$forceUpdate();
      });
    }
  },
  mounted() {
    // Wait for App to be available
    const waitForApp = () => {
      if (window.App && window.App.subscribeEvent) {
        window.App.subscribeEvent('DashboardWebclient::UpdateCards', (params) => {
          if (params.Cards) {
            this.updateCards(params.Cards)
          }
        })
        return true;
      }
      return false;
    };
    
    // Try immediately
    if (!waitForApp()) {
      // Wait for App to load
      let attempts = 0;
      const maxAttempts = 50; // 5 seconds
      const checkApp = () => {
        attempts++;
        if (waitForApp()) {
          return;
        }
        if (attempts < maxAttempts) {
          setTimeout(checkApp, 100);
        } else {
          console.log('DashboardWebclient: App not available after 5 seconds, using fallback');
        }
      };
      setTimeout(checkApp, 100);
    }
    
    // Load initial cards
    this.loadInitialCards()
  }
}
</script>
