<template>
  <div class="notes-card">
    <!-- Header with title badge and count -->
    <div class="notes-header">
      <div class="header-left">
        <!-- <div class="title-badge">Notes</div>
        <div class="count-badge">{{ data.data.items ? data.data.items.length : 0 }}</div> -->
      </div>
      <div class="header-actions">
        <div class="maximize-screen-button" @click="maximize"></div>
      </div>
    </div>

    <!-- Notes list -->
    <div class="notes-content">
      <div v-if="data.data && data.data.loading" class="notes-loading">
        <span class="spinner"></span>
        <p class="loading-message">{{ data.data.loadingText || 'Loading notes...' }}</p>
      </div>
      <div v-else-if="data.data && data.data.error" class="notes-error">
        <p>{{ data.data.error }}</p>
      </div>
      <div v-else class="notes-list">
        <div 
          v-for="note in data.data.items" 
          :key="note.id" 
          class="note-item" 
          @click="note.handler"
        >
          <div class="note-avatar">
            {{ note.initials }}
          </div>
          <div class="note-details">
            <div class="note-title">{{ note.title }}</div>
            <div class="note-content">
              <span class="note-text">{{ note.content }}</span>
              <span class="note-time">{{ note.time }}</span>
            </div>
          </div>
          <div class="note-actions">
            <button class="action-icon" @click.stop="editNote(note)">
              <i class="icon-edit"></i>
            </button>
            <button class="action-icon" @click.stop="shareNote(note)">
              <i class="icon-share"></i>
            </button>
            <button class="action-icon" @click.stop="deleteNote(note)">
              <i class="icon-trash"></i>
            </button>
            <button class="action-icon" @click.stop="showNoteMenu(note)">
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
  name: 'NotesWidget',
  props: {
    data: {
      type: Object,
      default: () => ({
        title: 'Notes',
        subtitle: '',
        data: {
          items: [],
          loading: true,
          emptyText: 'No notes available',
          loadingText: 'Loading notes...',
        },
        actions: [],
      }),
    },
  },
  methods: {
    addNote() {
      window.location.hash = 'notes';
    },
    searchNotes() {
      window.location.hash = 'notes';
    },
    maximize() {
      window.location.hash = 'notes';
    },
    editNote(note) {
      console.log('Edit note:', note.title);
    },
    shareNote(note) {
      console.log('Share note:', note.title);
    },
    deleteNote(note) {
      console.log('Delete note:', note.title);
    },
    showNoteMenu(note) {
      console.log('Show menu for note:', note.title);
    }
  }
};
</script>

<style scoped>
.notes-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Header */
.notes-header {
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
.notes-content {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.notes-content::-webkit-scrollbar {
  display: none;
}

.notes-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.notes-error {
  text-align: center;
  padding: 40px 20px;
  color: #dc3545;
}

.notes-list {
  padding: 0;
}

.note-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f1f3f4;
  cursor: pointer;
  transition: background-color 0.2s;
}

.note-item:hover {
  background: #f8f9fa;
}

.note-item:last-child {
  border-bottom: none;
}

.note-avatar {
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

.note-details {
  flex: 1;
  min-width: 0;
  margin-right: 12px;
}

.note-title {
  font-weight: 600;
  color: #333;
  font-size: 14px;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.note-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.note-text {
  font-size: 12px;
  color: #6c757d;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.note-time {
  font-size: 11px;
  color: #6c757d;
  white-space: nowrap;
  flex-shrink: 0;
}

.note-actions {
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
