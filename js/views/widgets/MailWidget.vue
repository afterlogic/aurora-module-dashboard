<template>
  <div class="mail-card">
    <!-- Top toolbar with tabs and actions -->
    <div class="mail-toolbar">
      <div class="mail-tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          class="mail-tab"
          :class="{ 'active': activeTab === tab.id }"
          @click="setActiveTab(tab.id)"
        >
          {{ tab.label }}
          <span v-if="tab.badge" class="tab-badge">{{ tab.badge }}</span>
        </button>
      </div>
      <div class="toolbar-actions">
        <div class="maximize-screen-button" @click="maximize"></div>
      </div>
    </div>

    <!-- Mail list -->
    <div class="mail-content">
      <div v-if="data.data && data.data.loading" class="mail-loading">
        <span class="spinner"></span>
        <p class="loading-message">{{ data.data.loadingText || 'Loading emails...' }}</p>
      </div>
      <div v-else-if="data.data && data.data.error" class="mail-error">
        <p>{{ data.data.error }}</p>
      </div>
      <div v-else class="mail-list">
        <div 
          v-for="email in data.data.items" 
          :key="email.id" 
          class="mail-item" 
          @click="email.handler"
        >
          <div class="sender-avatar">
            {{ email.senderInitial }}
          </div>
          <div class="mail-details">
            <div class="sender-name">{{ email.senderName }}</div>
            <div class="mail-subject">{{ email.subject }}</div>
          </div>
          <div class="mail-meta">
            <div class="mail-date">{{ email.date }}</div>
            <div class="mail-actions">
              <button class="action-icon" @click.stop="toggleRead(email)">
                <i class="icon-envelope"></i>
              </button>
              <button class="action-icon" @click.stop="deleteMail(email)">
                <i class="icon-trash"></i>
              </button>
              <button class="action-icon" @click.stop="archiveMail(email)">
                <i class="icon-folder"></i>
              </button>
              <button class="action-icon" @click.stop="toggleStar(email)" :class="{ 'starred': email.starred }">
                <i class="icon-star"></i>
              </button>
            </div>
          </div>
          <div v-if="email.hasAttachment" class="attachment-icon">
            <i class="icon-paperclip"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MailWidget',
  props: {
    data: {
      type: Object,
      default: () => ({
        title: 'Mail',
        subtitle: '',
        data: {
          items: [],
          loading: true,
          emptyText: 'No emails available',
          loadingText: 'Loading emails...',
        },
        actions: [],
      }),
    },
  },
  data() {
    return {
      activeTab: 'inbox',
      tabs: [
        { id: 'inbox', label: 'Inbox', badge: 3 },
        { id: 'sent', label: 'Sent', badge: null },
        { id: 'trash', label: 'Trash', badge: null }
      ]
    }
  },
  methods: {
    setActiveTab(tabId) {
      this.activeTab = tabId;
    },
    composeMail() {
      window.location.hash = 'mail';
    },
    maximize() {
      window.location.hash = 'mail';
    },
    toggleRead(email) {
      email.read = !email.read;
    },
    deleteMail(email) {
      // Move to trash
      console.log('Delete mail:', email.subject);
    },
    archiveMail(email) {
      // Archive mail
      console.log('Archive mail:', email.subject);
    },
    toggleStar(email) {
      email.starred = !email.starred;
    }
  }
};
</script>

<style scoped>
.mail-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Toolbar */
.mail-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  background: none;
  border-bottom: 1px solid #e9ecef;
}

.mail-tabs {
  display: flex;
  gap: 24px;
}

.mail-tab {
  background: none;
  border: none;
  color: #6c757d;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 0;
  position: relative;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.mail-tab:hover {
  color: #495057;
}

.mail-tab.active {
  color: #007bff;
}

.tab-badge {
  background: #007bff;
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 16px;
  text-align: center;
}

.toolbar-actions {
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
.mail-content {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.mail-content::-webkit-scrollbar {
  display: none;
}

.mail-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.mail-error {
  text-align: center;
  padding: 40px 20px;
  color: #dc3545;
}

.mail-list {
  padding: 0;
}

.mail-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f1f3f4;
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;
}

.mail-item:hover {
  background: #f8f9fa;
}

.mail-item:last-child {
  border-bottom: none;
}

.sender-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #6c757d;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  margin-right: 12px;
  flex-shrink: 0;
}

.mail-details {
  flex: 1;
  min-width: 0;
  margin-right: 12px;
}

.sender-name {
  font-weight: 600;
  color: #333;
  font-size: 14px;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mail-subject {
  color: #6c757d;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mail-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.mail-date {
  font-size: 12px;
  color: #6c757d;
  white-space: nowrap;
}

.mail-actions {
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

.action-icon.starred {
  color: #ffc107;
}

.action-icon.starred:hover {
  color: #e0a800;
}

.attachment-icon {
  position: absolute;
  right: 60px;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
  font-size: 12px;
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
