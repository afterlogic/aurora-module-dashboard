'use strict';

var
	_ = require('underscore'),
	ko = require('knockout'),
	
	TextUtils = require('%PathToCoreWebclientModule%/js/utils/Text.js'),
	
	App = require('%PathToCoreWebclientModule%/js/App.js'),
	
	CAbstractScreenView = require('%PathToCoreWebclientModule%/js/views/CAbstractScreenView.js'),
	
	Settings = require('modules/%ModuleName%/js/Settings.js')
;

/**
 * @constructor
 */
function CDashboardView()
{
	CAbstractScreenView.call(this, '%ModuleName%');

	this.browserTitle = ko.observable(TextUtils.i18n('%MODULENAME%/HEADING_BROWSER_TAB'));
	
	// Dashboard data
	this.cards = ko.observableArray([]);
	
	// Vue.js will be mounted automatically via main.js
	
	// Subscribe to card updates
	var self = this;
	var isUpdating = false;
	App.subscribeEvent('%ModuleName%::UpdateCards', function() {
		if (!isUpdating) {
			isUpdating = true;
			self.loadRegisteredCards();
			// Notify Vue component about update
			App.broadcastEvent('%ModuleName%::UpdateCards', {'Cards': self.cards()});
			setTimeout(() => {
				isUpdating = false;
			}, 100);
		}
	});
	
	App.broadcastEvent('%ModuleName%::ConstructView::after', {'Name': this.ViewConstructorName, 'View': this});
}

_.extendOwn(CDashboardView.prototype, CAbstractScreenView.prototype);

CDashboardView.prototype.ViewTemplate = '%ModuleName%_DashboardView';
CDashboardView.prototype.ViewConstructorName = 'CDashboardView';

/**
 * Loads registered cards into the observable array
 */
CDashboardView.prototype.loadRegisteredCards = function()
{
	this.cards(CDashboardView.registeredCards.slice());
};

/**
 * Loads sample cards if no cards are registered
 */
CDashboardView.prototype.loadSampleCards = function()
{
	if (CDashboardView.registeredCards.length === 0) {
		CDashboardView.registeredCards = [
			{
				id: 'welcome',
				title: 'Welcome',
				content: 'This is your personal dashboard. Add cards from other modules to customize your experience.',
				type: 'default',
				icon: 'icon-dashboard'
			},
			{
				id: 'stats',
				title: 'Statistics',
				type: 'stats',
				data: {
					value: 42,
					label: 'Total Items',
					change: 12
				}
			},
			{
				id: 'recent',
				title: 'Recent Items',
				type: 'list',
				data: {
					items: [
						'Item 1',
						'Item 2',
						'Item 3'
					]
				},
				actions: [
					{
						text: 'View All',
						handler: function() { }
					}
				]
			}
		];
		this.loadRegisteredCards();
	}
};


/**
 * Registers a new dashboard card
 * 
 * @param {Object} oCardData Card data object
 */
CDashboardView.registerCard = function(oCardData)
{
	if (oCardData && oCardData.id && oCardData.title) {
		// Remove existing card with same ID
		CDashboardView.registeredCards = CDashboardView.registeredCards.filter(function(card) {
			return card.id !== oCardData.id;
		});
		
		// Add new card
		CDashboardView.registeredCards.push(oCardData);
		
		// Broadcast update event
		App.broadcastEvent('%ModuleName%::UpdateCards', {'Cards': CDashboardView.registeredCards});
		
		// Force Vue update if available
		if (typeof window !== 'undefined' && window.DashboardWebclient && window.DashboardWebclient.forceUpdate) {
			window.DashboardWebclient.forceUpdate();
		}
	}
};

/**
 * Unregisters a dashboard card
 * 
 * @param {string} sCardId Card ID to remove
 */
CDashboardView.unregisterCard = function(sCardId)
{
	CDashboardView.registeredCards = CDashboardView.registeredCards.filter(function(card) {
		return card.id !== sCardId;
	});
	
	// Broadcast update event
	App.broadcastEvent('%ModuleName%::UpdateCards', {'Cards': CDashboardView.registeredCards});
};

/**
 * Updates a dashboard card
 * 
 * @param {string} sCardId Card ID to update
 * @param {Object} oNewData New card data
 */
CDashboardView.updateCard = function(sCardId, oNewData)
{
	var oCard = CDashboardView.registeredCards.find(function(card) {
		return card.id === sCardId;
	});
	
	if (oCard) {
		_.extend(oCard, oNewData);
		// Broadcast update event
		App.broadcastEvent('%ModuleName%::UpdateCards', {'Cards': CDashboardView.registeredCards});
	}
};

// Static array to store registered cards
CDashboardView.registeredCards = [];

// Make CDashboardView globally available for Vue component
if (typeof window !== 'undefined') {
	window.CDashboardView = CDashboardView;
	// Also make App available globally for Vue component
	window.App = App;
}

CDashboardView.prototype.onShow = function()
{
	// Load registered cards when screen is shown
	this.loadRegisteredCards();
};

CDashboardView.prototype.onBind = function()
{
	// Load sample cards if no cards are registered
	this.loadSampleCards();
	
	// Vue.js will be mounted automatically via main.js
};

CDashboardView.prototype.onHide = function()
{
	// Vue.js is managed automatically via main.js
};

// Vue.js updates will be handled through events

module.exports = CDashboardView;