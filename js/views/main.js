import { createApp } from 'vue'
import DashboardView from './DashboardView.vue'

// Import Aurora App module for user check
const App = require('%PathToCoreWebclientModule%/js/App.js')

// Create and mount dashboard permanently in .screens
function createPermanentDashboard() {
  // Check if user is authorized before mounting
  if (!App.isUserNormalOrTenant()) {
    return false
  }
  // Find .screens container - try multiple selectors
  let screensContainer = document.querySelector('.auroraContent > .screens')
  if (!screensContainer) {
    screensContainer = document.querySelector('.screens')
  }
  if (!screensContainer) {
    screensContainer = document.querySelector('[class*="screens"]')
  }
  if (!screensContainer) {
    screensContainer = document.querySelector('.auroraContent')
  }
  
  if (!screensContainer) {
    // Fallback - use body if no screens container found
    screensContainer = document.body
  }
  
  // Create dashboard container if it doesn't exist
  let container = document.getElementById('dashboard_vue_container')
  if (!container) {
    container = document.createElement('div')
    container.id = 'dashboard_vue_container'
    container.className = 'dashboard-container'
    screensContainer.appendChild(container)
  }
  
  // Mount Vue app
  if (container) {
    const app = createApp(DashboardView)
    app.mount('#dashboard_vue_container')
    
    // Store app reference globally
    window.DashboardVueApp = app
    
    // Make dashboard functions globally available
    window.DashboardWebclient = {
      show: () => {
        container.style.display = 'flex'
      },
      hide: () => {
        container.style.display = 'none'
      },
      forceUpdate: () => {
        // Force Vue component to update by triggering a re-render
        if (window.DashboardVueApp && window.DashboardVueApp.$forceUpdate) {
          window.DashboardVueApp.$forceUpdate()
        }
      }
    }
    
    // Expose DashboardCard component globally for other modules to use
    try {
      const DashboardCard = require('modules/%ModuleName%/js/views/widgets/DashboardWidgetTemplate.vue').default
      if (DashboardCard) {
        // register globally in current app
        if (app && app.component) {
          app.component('DashboardCard', DashboardCard)
        }
        // expose on window so external Vue components can reference via require or window
        window.DashboardCard = DashboardCard
        // broadcast availability via App event bus if present
        if (window.App && window.App.broadcastEvent) {
          window.App.broadcastEvent('DashboardWebclient::DashboardCardReady', { Component: DashboardCard })
        }
      }
    } catch (e) {
      console.warn('DashboardWebclient: failed to expose DashboardCard', e)
    }
    
    return true
  }
  return false
}

// Wait for DOM to be ready and Aurora to load
function waitForAuroraAndMount() {
  // Check if user is authorized before attempting to mount
  if (!App.isUserNormalOrTenant()) {
    // Wait a bit and try again - user might be logging in
    setTimeout(waitForAuroraAndMount, 1000)
    return
  }
  
  // Try to mount immediately
  if (createPermanentDashboard()) {
    return
  }
  
  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(waitForAuroraAndMount, 100)
    })
    return
  }
  
  // Wait for .screens container with multiple attempts
  let attempts = 0
  const maxAttempts = 50 // 5 seconds total
  
  const tryMount = () => {
    attempts++
    
    // Check authorization on each attempt
    if (!App.isUserNormalOrTenant()) {
      setTimeout(waitForAuroraAndMount, 1000)
      return
    }
    
    if (createPermanentDashboard()) {
      return
    }
    
    if (attempts < maxAttempts) {
      setTimeout(tryMount, 100)
    } else {
      console.error('DashboardWebclient: Failed to find .screens container after 5 seconds')
    }
  }
  
  // Start trying
  setTimeout(tryMount, 100)
}

// Start the process
waitForAuroraAndMount()

export default {}
