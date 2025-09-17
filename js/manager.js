'use strict';

module.exports = function (oAppData) {
	var
		_ = require('underscore'),
		
		TextUtils = require('%PathToCoreWebclientModule%/js/utils/Text.js'),
		
		App = require('%PathToCoreWebclientModule%/js/App.js'),
		ModulesManager = require('%PathToCoreWebclientModule%/js/ModulesManager.js'),
		
		Settings = require('modules/%ModuleName%/js/Settings.js')
	;

	Settings.init(oAppData);
	
	// Load main.js for Vue.js
	require('modules/%ModuleName%/js/views/main.js');

	if (!ModulesManager.isModuleAvailable(Settings.ServerModuleName))
	{
		return null;
	}

	if (App.isUserNormalOrTenant())
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
				 * @param {Object} oCardData Card data object with id, title, type, etc.
				 */
				registerCard: function (oCardData) {
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
				}
			};
		}
	}
	
	return null;
};