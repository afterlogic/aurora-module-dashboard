'use strict';

var
	_ = require('underscore'),
	Types = require('%PathToCoreWebclientModule%/js/utils/Types.js'),
	Settings = require('modules/%ModuleName%/js/Settings.js')
;

/**
 * Dashboard Manager - manages cards and dashboard state
 */
var DashboardManager = {
	Cards: [],
	Layout: 'grid',
	AlwaysVisible: true,
	
	/**
	 * Initializes dashboard manager
	 */
	init: function() {
		this.Cards = Settings.Cards || [];
		this.Layout = Settings.Layout || 'grid';
		this.AlwaysVisible = Settings.AlwaysVisible !== false;
	},
	
	/**
	 * Registers a new card
	 * 
	 * @param {string} sCardId Card identifier
	 * @param {string} sCardTitle Card title
	 * @param {string} sCardTemplate Card template name
	 * @param {Object} oCardData Card data
	 */
	registerCard: function(sCardId, sCardTitle, sCardTemplate, oCardData) {
		var oCard = {
			Id: sCardId,
			Title: sCardTitle,
			Template: sCardTemplate,
			Data: oCardData || {},
			Visible: true
		};
		
		// Remove existing card with same ID
		this.Cards = _.filter(this.Cards, function(oCard) {
			return oCard.Id !== sCardId;
		});
		
		this.Cards.push(oCard);
		this.saveSettings();
	},
	
	/**
	 * Unregisters a card
	 * 
	 * @param {string} sCardId Card identifier
	 */
	unregisterCard: function(sCardId) {
		this.Cards = _.filter(this.Cards, function(oCard) {
			return oCard.Id !== sCardId;
		});
		this.saveSettings();
	},
	
	/**
	 * Updates card data
	 * 
	 * @param {string} sCardId Card identifier
	 * @param {Object} oCardData New card data
	 */
	updateCardData: function(sCardId, oCardData) {
		var oCard = _.find(this.Cards, function(oCard) {
			return oCard.Id === sCardId;
		});
		
		if (oCard) {
			oCard.Data = oCardData || {};
			this.saveSettings();
		}
	},
	
	/**
	 * Gets all cards
	 * 
	 * @returns {Array} Array of cards
	 */
	getCards: function() {
		return this.Cards;
	},
	
	/**
	 * Changes layout
	 * 
	 * @param {string} sLayout Layout type (grid or list)
	 */
	setLayout: function(sLayout) {
		this.Layout = sLayout;
		Settings.Layout = sLayout;
		this.saveSettings();
	},
	
	/**
	 * Gets current layout
	 * 
	 * @returns {string} Current layout
	 */
	getLayout: function() {
		return this.Layout;
	},
	
	/**
	 * Sets always visible mode
	 * 
	 * @param {boolean} bAlwaysVisible Whether to always show dashboard
	 */
	setAlwaysVisible: function(bAlwaysVisible) {
		this.AlwaysVisible = bAlwaysVisible;
		Settings.AlwaysVisible = bAlwaysVisible;
		this.saveSettings();
	},
	
	/**
	 * Gets always visible mode
	 * 
	 * @returns {boolean} Whether dashboard is always visible
	 */
	getAlwaysVisible: function() {
		return this.AlwaysVisible;
	},
	
	/**
	 * Saves settings to storage
	 */
	saveSettings: function() {
		Settings.Cards = this.Cards;
		Settings.Layout = this.Layout;
		Settings.AlwaysVisible = this.AlwaysVisible;
	}
};

module.exports = DashboardManager;
