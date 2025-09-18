<template>
  <div class="contacts-card">
    <!-- Header with title badge and count -->
    <div class="contacts-header">
      <div class="header-left">
        <!-- <div class="title-badge">Contacts</div>
        <div class="count-badge">{{ data.data.items ? data.data.items.length : 0 }}</div> -->
      </div>
      <div class="header-actions">
        <div class="maximize-screen-button" @click="maximize"></div>
      </div>
    </div>

    <!-- Contacts list -->
    <div class="contacts-content">
      <div v-if="data.data && data.data.loading" class="contacts-loading">
        <span class="spinner"></span>
        <p class="loading-message">{{ data.data.loadingText || 'Loading contacts...' }}</p>
      </div>
      <div v-else-if="data.data && data.data.error" class="contacts-error">
        <p>{{ data.data.error }}</p>
      </div>
      <div v-else class="contacts-list">
        <div 
          v-for="contact in data.data.items" 
          :key="contact.id" 
          class="contact-item" 
          @click="contact.handler"
        >
          <div class="contact-avatar">
            {{ contact.initials }}
          </div>
          <div class="contact-details">
            <div class="contact-name">{{ contact.name }}</div>
            <div class="contact-info">
              <span class="contact-email">{{ contact.email }}</span>
              <span class="contact-phone">{{ contact.phone }}</span>
            </div>
          </div>
          <div class="contact-actions">
            <button class="action-icon" @click.stop="editContact(contact)">
              <i class="icon-edit"></i>
            </button>
            <button class="action-icon" @click.stop="callContact(contact)">
              <i class="icon-phone"></i>
            </button>
            <button class="action-icon" @click.stop="emailContact(contact)">
              <i class="icon-envelope"></i>
            </button>
            <button class="action-icon" @click.stop="showContactMenu(contact)">
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
  name: 'ContactsWidget',
  props: {
    data: {
      type: Object,
      default: () => ({
        title: 'Contacts',
        subtitle: '',
        data: {
          items: [],
          loading: true,
          emptyText: 'No contacts available',
          loadingText: 'Loading contacts...',
        },
        actions: [],
      }),
    },
  },
  methods: {
    addContact() {
      window.location.hash = 'contacts';
    },
    searchContacts() {
      window.location.hash = 'contacts';
    },
    maximize() {
      window.location.hash = 'contacts';
    },
    editContact(contact) {
      console.log('Edit contact:', contact.name);
    },
    callContact(contact) {
      console.log('Call contact:', contact.name);
    },
    emailContact(contact) {
      console.log('Email contact:', contact.name);
    },
    showContactMenu(contact) {
      console.log('Show menu for contact:', contact.name);
    }
  }
};
</script>

<style scoped>
.contacts-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Header */
.contacts-header {
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
.contacts-content {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.contacts-content::-webkit-scrollbar {
  display: none;
}

.contacts-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.contacts-error {
  text-align: center;
  padding: 40px 20px;
  color: #dc3545;
}

.contacts-list {
  padding: 0;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.contact-item:hover {
  background: #f8f9fa;
}

.contact-avatar {
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

.contact-details {
  flex: 1;
  min-width: 0;
  margin-right: 12px;
}

.contact-name {
  font-weight: 600;
  color: #333;
  font-size: 14px;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.contact-email, .contact-phone {
  font-size: 12px;
  color: #6c757d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.contact-actions {
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
