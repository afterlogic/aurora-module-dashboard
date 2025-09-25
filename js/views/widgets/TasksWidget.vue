<template>
  <div class="tasks-card">
    <!-- Top bar with project and actions -->
    <div class="tasks-top-bar">
      <div class="project-dropdown">
        <span class="project-name">No Project</span>
        <i class="icon-arrow-down"></i>
      </div>
      <div class="top-actions">
        <div class="maximize-screen-button" @click="maximize"></div>
      </div>
    </div>

    <!-- Add Task button and Sort -->
    <div class="tasks-controls">
      <button class="add-task-btn" @click="addTask">
        <i class="icon-plus"></i>
        + Add Task
      </button>
      <div class="sort-controls">
        <span class="sort-label">Sort By</span>
        <i class="icon-sort"></i>
      </div>
    </div>
    
    <!-- Tasks list -->
    <div class="tasks-content">
      <div class="tasks-list" v-if="items && items.length > 0">
        <div 
          class="task-item" 
          v-for="item in items" 
          :key="item.id"
          @click="item.handler"
        >
          <div class="task-checkbox" @click.stop="toggleTask(item)">
            <div class="checkbox" :class="{ 'checked': item.completed }">
              <i v-if="item.completed" class="icon-check"></i>
            </div>
          </div>
          <div class="task-content">
            <div class="task-title" :class="{ 'completed': item.completed }">{{ item.title }}</div>
            <div class="task-meta" v-if="item.dueDate || item.progress">
              <div class="task-due" v-if="item.dueDate">
                <i class="icon-calendar"></i>
                <span>{{ item.dueDate }}</span>
              </div>
              <div class="task-progress" v-if="item.progress">
                {{ item.progress }}
              </div>
            </div>
          </div>
          <div class="task-assignees" v-if="item.assignees && item.assignees.length > 0">
            <div 
              v-for="(assignee, index) in item.assignees.slice(0, 3)" 
              :key="index"
              class="assignee-avatar"
              :style="{ 'background-color': assignee.color }"
            >
              {{ assignee.initials }}
            </div>
            <div v-if="item.assignees.length > 3" class="assignee-more">
              +{{ item.assignees.length - 3 }}
            </div>
          </div>
          <div class="task-menu" @click.stop="showTaskMenu(item)">
            <i class="icon-menu"></i>
          </div>
        </div>
      </div>
      
      <div class="tasks-empty" v-else>
        <div class="empty-icon">
          <i class="icon-list"></i>
        </div>
        <p class="empty-text">
          <span v-if="data.data && data.data.loading" class="loading-message">Loading...</span>
          <span v-else-if="data.data && data.data.error" class="error-message">{{ data.data.message || 'Error loading tasks' }}</span>
          <span v-else>{{ data.data && data.data.emptyText || 'No tasks available' }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TasksWidget',
  props: {
    data: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      items: [
        {
          id: 'task-1',
          title: 'Confirm bill payment',
          completed: false,
          assignees: [
            { initials: 'AB', color: '#ff6b6b' },
            { initials: 'CD', color: '#4ecdc4' },
            { initials: 'EF', color: '#45b7d1' }
          ],
          handler: () => window.location.hash = 'tasks'
        },
        {
          id: 'task-2',
          title: 'Schedule a call with Oscar',
          completed: true,
          assignees: [],
          handler: () => window.location.hash = 'tasks'
        },
        {
          id: 'task-3',
          title: 'Review last month\'s report',
          completed: false,
          dueDate: '12 June at 08:00',
          assignees: [
            { initials: 'AB', color: '#ff6b6b' },
            { initials: 'CD', color: '#4ecdc4' }
          ],
          handler: () => window.location.hash = 'tasks'
        },
        {
          id: 'task-4',
          title: 'Prepare for a product presentation',
          completed: false,
          dueDate: '12 June at 08:00',
          progress: '1/3',
          assignees: [],
          handler: () => window.location.hash = 'tasks'
        }
      ]
    }
  },
  watch: {
    data: {
      handler(newData) {
        if (newData && newData.data && newData.data.items) {
          this.items = newData.data.items;
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    addTask() {
      window.location.hash = 'tasks';
    },
    viewTasks() {
      window.location.hash = 'tasks';
    },
    editTasks() {
      window.location.hash = 'tasks';
    },
    deleteTasks() {
      window.location.hash = 'tasks';
    },
    maximize() {
      window.location.hash = 'tasks';
    },
    toggleTask(task) {
      task.completed = !task.completed;
    },
    showTaskMenu(task) {
      // Show task menu
      console.log('Show menu for task:', task.title);
    }
  },
  mounted() {
    if (this.data && this.data.data && this.data.data.items) {
      this.items = this.data.data.items;
    }
  }
}
</script>

<style scoped>
.tasks-card {
  background: #fff;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Top bar */
.tasks-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  background: none;
}

.project-dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #6c757d;
  font-size: 14px;
}

.project-name {
  color: #333;
  font-size: 13px;
  font-weight: 400;
}

.top-actions {
  display: flex;
  gap: 8px;
}

/* Controls */
.tasks-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #e9ecef;
}

.add-task-btn {
  color: #51a3ff;
  background: none;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6c757d;
  font-size: 14px;
  cursor: pointer;
}

.sort-label {
  font-weight: 400;
  font-size: 13px;
  color: #333;
}

/* Content */
.tasks-content {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.tasks-content::-webkit-scrollbar {
  display: none;
}

.tasks-list {
  margin: 0;
  padding: 0;
}

.task-item {
  padding: 12px 16px;
  border-bottom: 1px solid #f1f3f4;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: background-color 0.2s;
}

.task-item:hover {
  background: #f8f9fa;
}

.task-item:last-child {
  border-bottom: none;
}

/* Checkbox */
.task-checkbox {
  flex-shrink: 0;
}

.checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid #dee2e6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.checkbox.checked {
  background: #28a745;
  border-color: #28a745;
  color: white;
}

.checkbox.checked:before {
  content: "\e61c";
  font-family: 'afterlogic';
}

.checkbox i {
  font-size: 10px;
}

/* Task content */
.task-content {
  flex: 1;
  min-width: 0;
}

.task-title {
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
  font-size: 14px;
}

.task-title.completed {
  text-decoration: line-through;
  color: #6c757d;
}

.task-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #6c757d;
}

.task-due {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #007bff;
}

.task-progress {
  font-weight: 500;
  color: #6c757d;
}

/* Assignees */
.task-assignees {
  display: flex;
  align-items: center;
  gap: -4px;
  flex-shrink: 0;
}

.assignee-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  font-weight: 600;
  margin-left: -4px;
  border: 2px solid white;
}

.assignee-avatar:first-child {
  margin-left: 0;
}

.assignee-more {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 10px;
  font-weight: 600;
  margin-left: -4px;
  border: 2px solid white;
}

/* Menu */
.task-menu {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6c757d;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.task-menu:hover {
  background: #f1f3f4;
}

/* Empty state */
.tasks-empty {
  text-align: center;
  padding: 40px 20px;
  color: #6c757d;
}

.empty-icon {
  margin-bottom: 10px;
}

.empty-icon i {
  font-size: 48px;
  color: #dee2e6;
}

.empty-text {
  margin: 0;
  font-style: italic;
}

.error-message {
  color: #dc3545;
  font-weight: 500;
}

.loading-message {
  color: #007bff;
  font-weight: 500;
}

.maximize-screen-button {
  width: 20px;
  height: 20px;
  position: static;
}
</style>
