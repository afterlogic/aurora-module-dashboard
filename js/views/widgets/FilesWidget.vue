<template>
  <div class="files-card">
    <!-- Top toolbar with view options and actions -->
    <div class="files-toolbar">
      <div class="view-options">
        <!-- <button class="view-btn active" @click="setView('list')">
          <i class="icon-list"></i>
        </button>
        <button class="view-btn" @click="setView('grid')">
          <i class="icon-grid"></i>
        </button> -->
      </div>
      <div class="toolbar-actions">
        <div class="maximize-screen-button" @click="maximize"></div>
      </div>
    </div>

    <!-- Files table -->
    <div class="files-content">
      <div v-if="data.data && data.data.loading" class="files-loading">
        <span class="spinner"></span>
        <p class="loading-message">{{ data.data.loadingText || 'Loading files...' }}</p>
      </div>
      <div v-else-if="data.data && data.data.error" class="files-error">
        <p>{{ data.data.error }}</p>
      </div>
      <div v-else class="files-table">
        <div class="table-header">
          <div class="col-name">Name</div>
          <div class="col-date">Date modified</div>
          <div class="col-size">Size</div>
          <div class="col-type">Type</div>
        </div>
        <div class="table-body">
          <div 
            v-for="item in data.data.items" 
            :key="item.id" 
            class="table-row" 
            @click="item.handler"
          >
            <div class="col-name">
              <div class="file-icon" :class="'type-' + item.type">
                <i :class="getFileIcon(item.type)"></i>
              </div>
              <span class="file-name">{{ item.title }}</span>
            </div>
            <div class="col-date">{{ item.date }}</div>
            <div class="col-size">{{ item.size }}</div>
            <div class="col-type">{{ item.subtitle || getFileTypeLabel(item.type) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Storage info -->
    <div class="files-footer">
      <span class="storage-info">{{ data.data.storageInfo || '4.7 GB available' }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilesWidget',
  props: {
    data: {
      type: Object,
      default: () => ({
        title: 'Files',
        subtitle: '',
        data: {
          items: [],
          loading: true,
          emptyText: 'No files available',
          loadingText: 'Loading files...',
          storageInfo: '4.7 GB available'
        },
        actions: [],
      }),
    },
  },
  data() {
    return {
      currentView: 'list'
    }
  },
  methods: {
    setView(view) {
      this.currentView = view;
    },
    addFile() {
      window.location.hash = 'files';
    },
    uploadFile() {
      window.location.hash = 'files';
    },
    shareFile() {
      window.location.hash = 'files';
    },
    maximize() {
      window.location.hash = 'files';
    },
    getFileIcon(type) {
      switch (type) {
        case 'folder':
          return 'icon-folder';
        case 'image':
          return 'icon-image';
        case 'document':
          return 'icon-document';
        case 'pdf':
          return 'icon-pdf';
        case 'spreadsheet':
          return 'icon-spreadsheet';
        case 'presentation':
          return 'icon-presentation';
        case 'archive':
          return 'icon-archive';
        case 'video':
          return 'icon-video';
        case 'audio':
          return 'icon-audio';
        default:
          return 'icon-file';
      }
    },
    getFileTypeLabel(type) {
      switch (type) {
        case 'folder':
          return 'Folder';
        case 'image':
          return 'PNG';
        case 'document':
          return 'Text';
        case 'pdf':
          return 'PDF';
        case 'spreadsheet':
          return 'Excel';
        case 'presentation':
          return 'PowerPoint';
        case 'archive':
          return 'Archive';
        case 'video':
          return 'Video';
        case 'audio':
          return 'Audio';
        default:
          return 'File';
      }
    }
  }
};
</script>

<style scoped>
.files-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Toolbar */
.files-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  background: none;
}

.view-options {
  display: flex;
  gap: 4px;
}

.view-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #6c757d;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.2s;
}

.view-btn:hover {
  background: #e9ecef;
  color: #495057;
}

.view-btn.active {
  background: #e9ecef;
  color: #495057;
}

.toolbar-actions {
  display: flex;
  gap: 8px;
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

/* Content */
.files-content {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.files-content::-webkit-scrollbar {
  display: none;
}

.files-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.files-error {
  text-align: center;
  padding: 40px 20px;
  color: #dc3545;
}

/* Table */
.files-table {
  padding: 0;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 16px;
  padding: 12px 16px;
  background: none;
  border-bottom: 1px solid #e9ecef;
  font-weight: 600;
  font-size: 12px;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table-body {
  padding: 0;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 16px;
  padding: 12px 16px;
  border-bottom: 1px solid #f1f3f4;
  cursor: pointer;
  transition: background-color 0.2s;
  align-items: center;
}

.table-row:hover {
  background: #f8f9fa;
}

.table-row:last-child {
  border-bottom: none;
}

.col-name {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.file-icon {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  flex-shrink: 0;
}

.file-icon.type-folder {
  background: #007bff;
}

.file-icon.type-image {
  background: #ff6b6b;
}

.file-icon.type-document {
  background: #4ecdc4;
}

.file-icon.type-pdf {
  background: #dc3545;
}

.file-icon.type-video {
  background: #6f42c1;
}

.file-name {
  font-weight: 500;
  color: #333;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.col-date, .col-size, .col-type {
  font-size: 12px;
  color: #6c757d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Footer */
.files-footer {
  padding: 12px 16px;
  background: none;
  text-align: center;
}

.storage-info {
  font-size: 12px;
  color: #6c757d;
  font-weight: 500;
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

.maximize-screen-button {
  width: 20px;
  height: 20px;
  position: static;
}
</style>
