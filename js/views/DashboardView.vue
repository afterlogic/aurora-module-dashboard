<template>
  <div class="dashboardContent">
    <div class="dashboardCards" v-if="cards.length > 0">
      <div 
        v-for="card in cards" 
        :key="card.id" 
        class="dashboardCard" 
        :class="'card-' + card.type"
      >
        <!-- <div class="cardHeader">
        </div> -->
        <div class="cardContent">
          <component 
            :is="getCardComponent(card)" 
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
export default {
  name: 'DashboardView',
  data() {
    return {
      cards: [],
        cardComponents: {
          CalendarWidget: require('./widgets/CalendarWidget.vue').default,
          FilesWidget: require('./widgets/FilesWidget.vue').default,
          TasksWidget: require('./widgets/TasksWidget.vue').default,
          MailWidget: require('./widgets/MailWidget.vue').default,
          ContactsWidget: require('./widgets/ContactsWidget.vue').default,
          NotesWidget: require('./widgets/NotesWidget.vue').default,
          CallsWidget: require('./widgets/CallsWidget.vue').default
        }, // Registered card components
      infoNoCards: 'No cards available. Other modules can register their cards here.'
    }
  },
  methods: {
    getCardComponent(card) {
      // Check if card has custom component
      if (card.component && this.cardComponents[card.component]) {
        // Ensure component is not reactive
        const component = this.cardComponents[card.component];
        return window.Vue && window.Vue.markRaw ? window.Vue.markRaw(component) : component;
      }
      
      // If no custom component is registered, show error
      console.error('DashboardWebclient: No component found for card:', card);
      return 'div'; // Fallback to simple div
    },
    registerCardComponent(componentName, component) {
      // Extract the default export if it's a module
      const ComponentToRegister = component.default || component;
      // Mark as non-reactive to avoid Vue warnings
      if (window.Vue && window.Vue.markRaw) {
        this.cardComponents[componentName] = window.Vue.markRaw(ComponentToRegister);
      } else {
        this.cardComponents[componentName] = ComponentToRegister;
      }
      // Also register globally for dynamic components
      if (this.$options.components) {
        this.$options.components[componentName] = window.Vue.markRaw ? window.Vue.markRaw(ComponentToRegister) : ComponentToRegister;
      }
      // Register globally in Vue
      if (window.Vue && window.Vue.component) {
        window.Vue.component(componentName, ComponentToRegister);
      }
    },
    loadInitialCards() {
      // Load cards from CDashboardView
      if (window.CDashboardView && window.CDashboardView.registeredCards) {
        this.cards = window.CDashboardView.registeredCards || []
        
        // Also load registered components
        if (window.CDashboardView.registeredComponents) {
          Object.keys(window.CDashboardView.registeredComponents).forEach(componentName => {
            this.registerCardComponent(componentName, window.CDashboardView.registeredComponents[componentName]);
          });
        }
      } else {
        // Wait for CDashboardView to be available
        let attempts = 0;
        const maxAttempts = 50; // 5 seconds
        const checkCDashboardView = () => {
          attempts++;
          if (window.CDashboardView && window.CDashboardView.registeredCards) {
            this.cards = window.CDashboardView.registeredCards || []
            
            // Also load registered components
            if (window.CDashboardView.registeredComponents) {
              Object.keys(window.CDashboardView.registeredComponents).forEach(componentName => {
                this.registerCardComponent(componentName, window.CDashboardView.registeredComponents[componentName]);
              });
            }
            return;
          }
          if (attempts < maxAttempts) {
            setTimeout(checkCDashboardView, 100);
          } else {
            console.warn('DashboardWebclient: CDashboardView not available after 5 seconds');
          }
        };
        setTimeout(checkCDashboardView, 100);
      }
      
      // Also check again after a longer delay to catch late registrations
      setTimeout(() => {
        if (window.CDashboardView && window.CDashboardView.registeredComponents) {
          Object.keys(window.CDashboardView.registeredComponents).forEach(componentName => {
            if (!this.cardComponents[componentName]) {
              this.registerCardComponent(componentName, window.CDashboardView.registeredComponents[componentName]);
            }
          });
        }
      }, 1000);
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
        
        // Subscribe to component registration events
        window.App.subscribeEvent('DashboardWebclient::RegisterComponent', (params) => {
          if (params.ComponentName && params.Component) {
            this.registerCardComponent(params.ComponentName, params.Component);
          }
        });
        
        window.App.subscribeEvent('DashboardWebclient::UnregisterComponent', (params) => {
          if (params.ComponentName) {
            delete this.cardComponents[params.ComponentName];
            if (this.$options.components) {
              delete this.$options.components[params.ComponentName];
            }
          }
        });
        
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
        }
      };
      setTimeout(checkApp, 100);
    }
    
    // Load initial cards
    this.loadInitialCards()
    
    // Make DashboardView globally available for direct access
    if (typeof window !== 'undefined') {
      window.DashboardView = this;
    }
    
    // Try to broadcast that Dashboard is mounted and ready
    const tryBroadcast = () => {
      if (window.App && window.App.broadcastEvent) {
        window.App.broadcastEvent('DashboardWebclient::Mounted', {
          'DashboardView': this
        });
      } else {
        setTimeout(tryBroadcast, 100);
      }
    };
    setTimeout(tryBroadcast, 100);
  }
}
</script>
