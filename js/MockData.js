'use strict';

module.exports = function (TextUtils) {
	return {
		// Calendar card mock data
		getCalendarCardData: function () {
			return {
				id: 'calendar',
				title: TextUtils.i18n('CalendarWebclient/ACTION_SHOW_CALENDAR'),
				type: 'list',
				component: 'CalendarWidget',
				data: {
					items: [
						{
							id: 'event-1',
							title: 'Team Meeting',
							subtitle: 'Conference Room A',
							date: 'Today',
							time: '14:00',
							handler: function() {
								window.location.hash = 'calendar';
							}
						},
						{
							id: 'event-2',
							title: 'Project Review',
							subtitle: 'Online',
							date: 'Today',
							time: '10:00',
							handler: function() {
								window.location.hash = 'calendar';
							}
						},
						{
							id: 'event-3',
							title: 'Client Call',
							subtitle: 'Phone',
							date: 'Today',
							time: '15:30',
							handler: function() {
								window.location.hash = 'calendar';
							}
						}
					],
					loading: false,
					emptyText: 'No events scheduled',
					subtitle: '3 upcoming events'
				},
				actions: [
					{
						text: TextUtils.i18n('CalendarWebclient/ACTION_SHOW_CALENDAR'),
						handler: function() {
							window.location.hash = 'calendar';
						}
					}
				]
			};
		},

		// Files card mock data
		getFilesCardData: function () {
			return {
				id: 'files',
				title: TextUtils.i18n('FilesWebclient/ACTION_SHOW_FILES'),
				type: 'list',
				component: 'FilesWidget',
				data: {
					items: [
						{
							id: 'file-1',
							title: 'Documents',
							subtitle: 'Folder',
							type: 'folder',
							date: '07-08-2023',
							size: '25.14MB',
							handler: function() {
								window.location.hash = 'files';
							}
						},
						{
							id: 'file-2',
							title: 'Videos',
							subtitle: 'Folder',
							type: 'folder',
							date: '14-08-2023',
							size: '48.15MB',
							handler: function() {
								window.location.hash = 'files';
							}
						},
						{
							id: 'file-3',
							title: 'logo.png',
							subtitle: 'Image file',
							type: 'image',
							date: '11-09-2023',
							size: '01.05MB',
							handler: function() {
								window.location.hash = 'files';
							}
						},
						{
							id: 'file-4',
							title: 'readme.txt',
							subtitle: 'Text file',
							type: 'document',
							date: '01-09-2023',
							size: '25.14MB',
							handler: function() {
								window.location.hash = 'files';
							}
						}
					],
					loading: false,
					emptyText: 'No files available',
					subtitle: '4.7 GB available'
				},
				actions: [
					{
						text: TextUtils.i18n('FilesWebclient/ACTION_UPLOAD_FILES'),
						handler: function() {
							window.location.hash = 'files';
						}
					},
					{
						text: TextUtils.i18n('FilesWebclient/ACTION_NEW_FOLDER'),
						handler: function() {
							window.location.hash = 'files';
						}
					}
				]
			};
		},

		// Tasks card mock data
		getTasksCardData: function () {
			return {
				id: 'tasks',
				title: TextUtils.i18n('Tasks/ACTION_SHOW_TASKS'),
				type: 'list',
				component: 'TasksWidget',
				data: {
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
							handler: function() {
								window.location.hash = 'tasks';
							}
						},
						{
							id: 'task-2',
							title: 'Schedule a call with Oscar',
							completed: true,
							assignees: [],
							handler: function() {
								window.location.hash = 'tasks';
							}
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
							handler: function() {
								window.location.hash = 'tasks';
							}
						},
						{
							id: 'task-4',
							title: 'Prepare for a product presentation',
							completed: false,
							dueDate: '12 June at 08:00',
							progress: '1/3',
							assignees: [],
							handler: function() {
								window.location.hash = 'tasks';
							}
						}
					],
					loading: false,
					emptyText: 'No tasks available',
					subtitle: '4 tasks in progress'
				},
				actions: [
					{
						text: TextUtils.i18n('Tasks/ACTION_SHOW_TASKS'),
						handler: function() {
							window.location.hash = 'tasks';
						}
					}
				]
			};
		},

		// Mail card mock data
		getMailCardData: function () {
			return {
				id: 'mail',
				title: TextUtils.i18n('MailWebclient/ACTION_SHOW_MAIL'),
				type: 'list',
				component: 'MailWidget',
				data: {
					items: [
						{
							id: 'mail-1',
							senderInitial: 'L',
							senderName: 'Lucie Laurent',
							subject: 'Product Feedback',
							date: 'Apr 01',
							read: false,
							starred: false,
							hasAttachment: false,
							handler: function() {
								window.location.hash = 'mail';
							}
						},
						{
							id: 'mail-2',
							senderInitial: 'P',
							senderName: 'Peter Koch',
							subject: 'Exciting Partnership Opportunity',
							date: 'Apr 02',
							read: false,
							starred: true,
							hasAttachment: false,
							handler: function() {
								window.location.hash = 'mail';
							}
						},
						{
							id: 'mail-3',
							senderInitial: 'D',
							senderName: 'Dominick Murray',
							subject: 'Important Update on Project Timeline',
							date: 'Apr 03',
							read: false,
							starred: false,
							hasAttachment: true,
							handler: function() {
								window.location.hash = 'mail';
							}
						},
						{
							id: 'mail-4',
							senderInitial: 'L',
							senderName: 'Lorraine Rhodes',
							subject: 'New admin task',
							date: 'Apr 04',
							read: false,
							starred: false,
							hasAttachment: false,
							handler: function() {
								window.location.hash = 'mail';
							}
						}
					],
					loading: false,
					emptyText: 'No emails available',
					subtitle: '4 unread messages'
				},
				actions: [
					{
						text: TextUtils.i18n('MailWebclient/ACTION_SHOW_MAIL'),
						handler: function() {
							window.location.hash = 'mail';
						}
					}
				]
			};
		},

		// Contacts card mock data
		getContactsCardData: function () {
			return {
				id: 'contacts',
				title: TextUtils.i18n('ContactsWebclient/ACTION_SHOW_CONTACTS'),
				type: 'list',
				component: 'ContactsWidget',
				data: {
					items: [
						{
							id: 'contact-1',
							initials: 'JL',
							name: 'John Smith',
							email: 'john.smith@example.com',
							phone: '+1 (555) 123-4567',
							handler: function() {
								window.location.hash = 'contacts';
							}
						},
						{
							id: 'contact-2',
							initials: 'MS',
							name: 'Maria Garcia',
							email: 'maria.garcia@example.com',
							phone: '+1 (555) 234-5678',
							handler: function() {
								window.location.hash = 'contacts';
							}
						},
						{
							id: 'contact-3',
							initials: 'DK',
							name: 'David Kim',
							email: 'david.kim@example.com',
							phone: '+1 (555) 345-6789',
							handler: function() {
								window.location.hash = 'contacts';
							}
						},
						{
							id: 'contact-4',
							initials: 'AL',
							name: 'Anna Lee',
							email: 'anna.lee@example.com',
							phone: '+1 (555) 456-7890',
							handler: function() {
								window.location.hash = 'contacts';
							}
						}
					],
					loading: false,
					emptyText: 'No contacts available',
					subtitle: '4 contacts'
				},
				actions: [
					{
						text: TextUtils.i18n('ContactsWebclient/ACTION_SHOW_CONTACTS'),
						handler: function() {
							window.location.hash = 'contacts';
						}
					}
				]
			};
		},

		// Notes card mock data
		getNotesCardData: function () {
			return {
				id: 'notes',
				title: TextUtils.i18n('NotesWebclient/ACTION_SHOW_NOTES'),
				type: 'list',
				component: 'NotesWidget',
				data: {
					items: [
						{
							id: 'note-1',
							initials: 'LI',
							title: 'Meeting Notes',
							content: 'Pellentesque lobortis, velit eget, est arcu tristique leo',
							time: '15:00 - 16:00'
						},
						{
							id: 'note-2',
							initials: 'PR',
							title: 'Project Ideas',
							content: 'Pelle...',
							time: '14:30 - 15:30'
						},
						{
							id: 'note-3',
							initials: 'TD',
							title: 'Todo List',
							content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
							time: '13:00 - 14:00'
						},
						{
							id: 'note-4',
							initials: 'ID',
							title: 'Ideas',
							content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna',
							time: '12:00 - 13:00'
						}
					],
					loading: false,
					emptyText: 'No notes available',
					subtitle: '4 notes'
				}
			};
		},

		// Calls card mock data
		getCallsCardData: function () {
			return {
				id: 'calls',
				title: 'Upcoming today',
				type: 'list',
				component: 'CallsWidget',
				data: {
					items: [
						{
							id: 'call-1',
							initials: 'LI',
							title: 'Lorem Ipsum',
							time: '15:00 - 16:00',
							description: 'Pellentesque lobortis, velit eget, est arcu tristique leo',
							handler: function() {
								window.location.hash = 'calls';
							}
						},
						{
							id: 'call-2',
							initials: 'LI',
							title: 'Lorem Ipsum',
							time: '14:30 - 15:30',
							description: 'Pelle...',
							handler: function() {
								window.location.hash = 'calls';
							}
						},
						{
							id: 'call-3',
							initials: 'LI',
							title: 'Lorem Ipsum',
							time: '13:00 - 14:00',
							description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
							handler: function() {
								window.location.hash = 'calls';
							}
						},
						{
							id: 'call-4',
							initials: 'LI',
							title: 'Lorem Ipsum',
							time: '12:00 - 13:00',
							description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna',
							handler: function() {
								window.location.hash = 'calls';
							}
						},
						{
							id: 'call-5',
							initials: 'LI',
							title: 'Lorem Ipsum',
							time: '11:00 - 12:00',
							description: 'Ut enim ad minim veniam, quis nostrud exercitation',
							handler: function() {
								window.location.hash = 'calls';
							}
						}
					],
					loading: false,
					emptyText: 'No calls available',
					subtitle: '5 upcoming calls'
				},
				actions: [
					{
						text: 'View Calls',
						handler: function() {
							window.location.hash = 'calls';
						}
					}
				]
			};
		}
	};
};
