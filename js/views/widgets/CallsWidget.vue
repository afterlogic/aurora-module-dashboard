<template>
  <div class="calls-card">
    <!-- Header with title badge and count -->
    <div class="calls-header">
      <div class="header-left title-badge">
        <div>Upcoming today</div>
        <div class="count-badge">{{ data.data.items ? data.data.items.length : 0 }}</div>
      </div>
      <div class="header-actions">
        <div class="maximize-screen-button" @click="maximize"></div>
      </div>
    </div>

    <!-- Calls list -->
    <div class="calls-content">
      <div v-if="data.data && data.data.loading" class="calls-loading">
        <span class="spinner"></span>
        <p class="loading-message">{{ data.data.loadingText || 'Loading calls...' }}</p>
      </div>
      <div v-else-if="data.data && data.data.error" class="calls-error">
        <p>{{ data.data.error }}</p>
      </div>
      <div v-else class="calls-list">
        <div 
          v-for="call in data.data.items" 
          :key="call.id" 
          class="call-item" 
          @click="call.handler"
        >
          <div class="call-avatar">
            {{ call.initials }}
          </div>
          <div class="call-details">
            <div class="call-title">{{ call.title }}</div>
            <div class="call-info">
              <span class="call-time">{{ call.time }}</span>
              <span class="call-description">{{ call.description }}</span>
            </div>
          </div>
          <div class="call-actions">
            <button class="action-icon" @click.stop="showCallMenu(call)">
              <i class="icon-menu"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CallsWidget',
  props: {
    data: {
      type: Object,
      default: () => ({
        title: 'Calls',
        subtitle: '',
        data: {
          items: [],
          loading: true,
          emptyText: 'No calls available',
          loadingText: 'Loading calls...',
        },
        actions: [],
      }),
    },
  },
  methods: {
    openCalendar() {
      window.location.hash = 'calendar';
    },
    addCall() {
      window.location.hash = 'calls';
    },
    maximize() {
      window.location.hash = 'calls';
    },
    showCallMenu(call) {
      console.log('Show menu for call:', call.title);
    }
  }
};
</script>

<style scoped>
.calls-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Header */
.calls-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  background: none;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-badge {
  background: #e9ecef;
  color: #6c757d;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.count-badge {
  background: #007bff;
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 16px;
  text-align: center;
}

.header-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: background-color 0.2s;
}

.action-btn:hover {
  background: #0056b3;
}

.maximize-screen-button {
  width: 20px;
  height: 20px;
  position: static;
  cursor: pointer;
}

/* Content */
.calls-content {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.calls-content::-webkit-scrollbar {
  display: none;
}

.calls-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.calls-error {
  text-align: center;
  padding: 40px 20px;
  color: #dc3545;
}

.calls-list {
  padding: 0;
}

.call-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f1f3f4;
  cursor: pointer;
  transition: background-color 0.2s;
  background: #fff;
  margin: 4px 8px;
  border-radius: 8px;
}

.call-item:hover {
  background: #f8f9fa;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.call-item:last-child {
  border-bottom: none;
}

.call-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #9c88ff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  margin-right: 12px;
  flex-shrink: 0;
}

.call-details {
  flex: 1;
  min-width: 0;
  margin-right: 12px;
}

.call-title {
  font-weight: 600;
  color: #333;
  font-size: 14px;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.call-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.call-time {
  font-size: 12px;
  color: #6c757d;
  font-weight: 500;
  white-space: nowrap;
}

.call-description {
  font-size: 12px;
  color: #6c757d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
}

.call-actions {
  display: flex;
  gap: 4px;
}

.action-icon {
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  color: #6c757d;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border-radius: 4px;
  transition: all 0.2s;
}

.action-icon:hover {
  background: #e9ecef;
  color: #495057;
}

/* Spinner */
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #e9ecef;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 8px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-message {
  color: #6c757d;
  margin: 0;
  font-size: 14px;
}
</style>
