import { createApp } from 'vue'
import DashboardView from './DashboardView.vue'

// Create and mount dashboard permanently in .screens
function createPermanentDashboard() {
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
    container.className = 'screen DashboardContainer'
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
    
    return true
  }
  return false
}

// Wait for DOM to be ready and Aurora to load
function waitForAuroraAndMount() {
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
