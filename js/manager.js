'use strict';

module.exports = function (oAppData) {
	var
		_ = require('underscore'),
		
		TextUtils = require('%PathToCoreWebclientModule%/js/utils/Text.js'),
		
		App = require('%PathToCoreWebclientModule%/js/App.js'),
		ModulesManager = require('%PathToCoreWebclientModule%/js/ModulesManager.js'),
		Screens = require('%PathToCoreWebclientModule%/js/Screens.js'),
		
		Settings = require('modules/%ModuleName%/js/Settings.js')
	;

	Settings.init(oAppData);
	
	// Close Screen Button functionality
	const oAvailableModules = {
		'MailWebclient': 'CMailView',
		'ContactsWebclient': 'CContactsView',
		'CalendarWebclient': 'CCalendarView',
		'FilesWebclient': 'CFilesView',
		'SettingsWebclient': 'CSettingsView',
		'Tasks': 'CMainView',
		'NotesWebclient': 'CNotesView',
		'CallsWebclient': 'CCallsView',
	};

	function handleCloseButtonClick() {
		window.location.hash = 'dashboard';
	}
	
	// Load main.js for Vue.js
	require('modules/%ModuleName%/js/views/main.js');

	if (ModulesManager.isModuleAvailable(Settings.ServerModuleName) && App.isUserNormalOrTenant())
	{
		if (App.isNewTab())
		{
			return {
				start: function () {
					// Initialize dashboard for new tab
				}
			};
		}
		else
		{
			return {
				start: function (ModulesManager) {
					// Dashboard initialization - Vue.js renders permanently via main.js
					// Dashboard renders permanently in .screens - no screen switching needed
					
					// Load mock data
					const MockData = require('modules/%ModuleName%/js/MockData.js')(TextUtils);
					
					// Register sample cards with mock data
					ModulesManager.run('DashboardWebclient', 'registerCard', ['calendar', MockData.getCalendarCardData()]);
					ModulesManager.run('DashboardWebclient', 'registerCard', ['files', MockData.getFilesCardData()]);
					ModulesManager.run('DashboardWebclient', 'registerCard', ['tasks', MockData.getTasksCardData()]);
					ModulesManager.run('DashboardWebclient', 'registerCard', ['mail', MockData.getMailCardData()]);
					ModulesManager.run('DashboardWebclient', 'registerCard', ['contacts', MockData.getContactsCardData()]);
					ModulesManager.run('DashboardWebclient', 'registerCard', ['notes', MockData.getNotesCardData()]);
					ModulesManager.run('DashboardWebclient', 'registerCard', ['calls', MockData.getCallsCardData()]);
					
					// Initialize Close Screen Button
					const builtButtons = [];
					Screens.screens.subscribe(function (oScreens) {
						_.each(oScreens, function (oScreen) {
							if (
								oAvailableModules[oScreen.sModuleName] 
								&& oAvailableModules[oScreen.sModuleName] === oScreen.ViewConstructorName
								&& !builtButtons.includes(`${oScreen.sModuleName}_${oScreen.ViewConstructorName}`)
								&& oScreen.$viewDom
							) {
								const $button = $('<div class="close-screen-button">').on('click', handleCloseButtonClick);
								oScreen.$viewDom.append($button);
								builtButtons.push(`${oScreen.sModuleName}_${oScreen.ViewConstructorName}`);
							}
						});
					});
					
					// Dashboard mask management
					function updateDashboardMask() {
						const $dashboardContainer = $('.DashboardContainer');
						if ($dashboardContainer.length === 0) return;
						
						const currentHash = window.location.hash;
						const isDashboardActive = currentHash === '#dashboard' || currentHash === '' || currentHash === '#';
						
						if (isDashboardActive) {
							$dashboardContainer.removeClass('masked');
						} else {
							$dashboardContainer.addClass('masked');
						}
					}
					
					$(window).on('hashchange', function() {
						setTimeout(updateDashboardMask, 50);
					});
					
					// Initial mask update
					setTimeout(updateDashboardMask, 100);
				},
				getScreens: function () {
					var oScreens = {};
					oScreens[Settings.HashModuleName] = function () {
						var CDashboardView = require('modules/%ModuleName%/js/views/CDashboardView.js');
						return new CDashboardView();
					};
					return oScreens;
				},
				// getHeaderItem: function () {
				// 	return {
				// 		item: require('modules/%ModuleName%/js/views/HeaderItemView.js'),
				// 		name: Settings.HashModuleName
				// 	};
				// },
				/**
				 * Registers dashboard card.
				 * 
				 * @param {string} sCardId Card ID.
				 * @param {Object} oCardData Card data object with id, title, type, etc.
				 */
				registerCard: function (sCardId, oCardData) {
					var CDashboardView = require('modules/%ModuleName%/js/views/CDashboardView.js');
					CDashboardView.registerCard(oCardData);
				},
				/**
				 * Unregisters dashboard card.
				 * 
				 * @param {string} sCardId Card ID to remove.
				 */
				unregisterCard: function (sCardId) {
					var CDashboardView = require('modules/%ModuleName%/js/views/CDashboardView.js');
					CDashboardView.unregisterCard(sCardId);
				},
				/**
				 * Updates dashboard card.
				 * 
				 * @param {string} sCardId Card ID to update.
				 * @param {Object} oNewData New card data.
				 */
				updateCard: function (sCardId, oNewData) {
					var CDashboardView = require('modules/%ModuleName%/js/views/CDashboardView.js');
					CDashboardView.updateCard(sCardId, oNewData);
				},
				/**
				 * Registers a card component.
				 * 
				 * @param {string} sComponentName Component name.
				 * @param {Object} oComponent Vue component definition.
				 */
				registerCardComponent: function (sComponentName, oComponent) {
					var CDashboardView = require('modules/%ModuleName%/js/views/CDashboardView.js');
					CDashboardView.registerCardComponent(sComponentName, oComponent);
				},
				/**
				 * Unregisters a card component.
				 * 
				 * @param {string} sComponentName Component name to remove.
				 */
				unregisterCardComponent: function (sComponentName) {
					var CDashboardView = require('modules/%ModuleName%/js/views/CDashboardView.js');
					CDashboardView.unregisterCardComponent(sComponentName);
				}
			};
		}
	}
	
	return null;
};