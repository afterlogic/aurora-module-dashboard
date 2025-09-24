<template>
  <div class="calendar-card">
    <!-- Header with navigation tabs and action icons -->
    <div class="calendar-header">
      <div class="calendar-tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          class="calendar-tab"
          :class="{ 'active': activeTab === tab.id }"
          @click="setActiveTab(tab.id)"
        >
          {{ tab.label }}
        </button>
      </div>
      <div class="calendar-actions">
        <div class="maximize-screen-button" @click="maximize">
        </div>
      </div>
    </div>

    <!-- Date display -->
    <div class="calendar-date">
      <h2 class="current-date">{{ formattedDate }}</h2>
    </div>

    <!-- Timeline content -->
    <div class="calendar-timeline">
      <div v-if="data.data && data.data.loading" class="timeline-loading">
        <span class="spinner"></span>
        <p class="loading-message">{{ data.data.loadingText || 'Loading events...' }}</p>
      </div>
      <div v-else-if="data.data && data.data.error" class="timeline-error">
        <p>{{ data.data.error }}</p>
      </div>
      <div v-else class="timeline-content">
        <div 
          v-for="hour in timelineHours" 
          :key="hour.value"
          class="timeline-hour"
        >
          <div class="hour-label">{{ hour.label }}</div>
          <div class="hour-line"></div>
          <div class="hour-events">
            <div 
              v-for="event in getEventsForHour(hour.value)" 
              :key="event.id"
              class="timeline-event"
              @click="event.handler"
            >
              <div class="event-title">{{ event.title }}</div>
              <div class="event-time">{{ event.time }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarWidget',
  props: {
    data: {
      type: Object,
      default: () => ({
        title: 'Calendar',
        subtitle: '',
        data: {
          items: [],
          loading: true,
          emptyText: 'No events scheduled',
          loadingText: 'Loading events...',
        },
        actions: [],
      }),
    },
  },
  data() {
    return {
      activeTab: 'day',
      tabs: [
        { id: 'day', label: 'Day' },
        { id: 'week', label: 'Week' },
        { id: 'month', label: 'Month' }
      ],
      timelineHours: [
        { value: 0, label: '00:00' },
        { value: 1, label: '01:00' },
        { value: 2, label: '02:00' },
        { value: 3, label: '03:00' },
        { value: 4, label: '04:00' },
        { value: 5, label: '05:00' },
        { value: 6, label: '06:00' },
        { value: 7, label: '07:00' },
        { value: 8, label: '08:00' },
        { value: 9, label: '09:00' },
        { value: 10, label: '10:00' },
        { value: 11, label: '11:00' },
        { value: 12, label: '12:00' },
        { value: 13, label: '13:00' },
        { value: 14, label: '14:00' },
        { value: 15, label: '15:00' },
        { value: 16, label: '16:00' },
        { value: 17, label: '17:00' },
        { value: 18, label: '18:00' },
        { value: 19, label: '19:00' },
        { value: 20, label: '20:00' },
        { value: 21, label: '21:00' },
        { value: 22, label: '22:00' },
        { value: 23, label: '23:00' }
      ]
    }
  },
  computed: {
    formattedDate() {
      const CoreSettings = require('%PathToCoreWebclientModule%/js/Settings.js');
      const now = new Date();
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      const locale = (CoreSettings.ShortLanguage || 'en').toLowerCase();
      return now.toLocaleDateString(locale, options).toUpperCase();
    }
  },
  methods: {
    setActiveTab(tabId) {
      this.activeTab = tabId;
    },
    addEvent() {
      // Navigate to calendar to add event
      window.location.hash = 'calendar';
    },
    maximize() {
      // Navigate to full calendar view
      window.location.hash = 'calendar';
    },
    getEventsForHour(hour) {
      if (!this.data.data || !this.data.data.items) return [];
      
      return this.data.data.items.filter(event => {
        if (!event.time) return false;
        const eventHour = parseInt(event.time.split(':')[0]);
        return eventHour === hour;
      });
    }
  }
};
</script>

<style scoped>
.calendar-card {
  height: 100%;
  background: #fff;
  overflow: hidden;
}

/* Header with tabs and actions */
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  height: 30px;
  background: none;
  border-bottom: 0;
}

.calendar-tabs {
  display: flex;
  gap: 4px;
}

.calendar-tab {
  background: none;
  border: initial;
  border-radius: 8px;
  color: #828282;
  font-size: 13px;
  padding: 0 14px;
  height: 27px;
  transition: all 0.2s;
}

.calendar-tab.active {
  background: hsla(240, 4%, 48%, .12);
}

.calendar-actions {
  margin-top: 0 !important;
  display: flex;
  gap: 8px;
}

/* Date display */
.calendar-date {
  text-align: center;
  padding: 20px;
  background: #fff;
}

.current-date {
  color: #4382c4;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
}

/* Timeline */
.calendar-timeline {
  background: #fff;
  height: 100%;
  overflow: auto;
  max-height: 194px;
  /* Hide scrollbar for webkit browsers */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.calendar-timeline::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.timeline-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.timeline-error {
  text-align: center;
  padding: 40px 20px;
  color: #dc3545;
}

.timeline-content {
  padding: 0;
}

.timeline-hour {
  display: flex;
  align-items: flex-start;
  min-height: 60px;
  position: relative;
}

.hour-label {
  width: 30px;
  padding: 0 5px 0 0;
  font-size: 12px;
  color: #6c757d;
  text-align: right;
  flex-shrink: 0;
}

.hour-line {
  width: 100%;
  height: 1px;
  background: #e9ecef;
  margin-top: 8px;
  position: relative;
}

.hour-events {
  position: absolute;
  left: 80px;
  right: 20px;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.timeline-event {
  background: #e3f2fd;
  border: 1px solid #bbdefb;
  border-radius: 4px;
  padding: 4px 8px;
  margin: 2px 0;
  cursor: pointer;
  transition: all 0.2s;
  max-width: 200px;
}

.timeline-event:hover {
  background: #bbdefb;
  border-color: #90caf9;
}

.event-title {
  font-size: 12px;
  font-weight: 500;
  color: #1976d2;
  margin-bottom: 2px;
}

.event-time {
  font-size: 11px;
  color: #1565c0;
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
