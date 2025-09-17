<?php
/**
 * This code is licensed under AGPLv3 license or Afterlogic Software License
 * if commercial version of the product was purchased.
 * For full statements of the licenses see LICENSE-AFTERLOGIC and LICENSE-AGPL3 files.
 */

namespace Aurora\Modules\DashboardWebclient;

use Aurora\System\Module\AbstractWebclientModule;

/**
 * @license https://www.gnu.org/licenses/agpl-3.0.html AGPL-3.0
 * @license https://afterlogic.com/products/common-licensing Afterlogic Software License
 * @copyright Copyright (c) 2023 Afterlogic Corp.
 */
class Module extends AbstractWebclientModule
{
	public function init()
	{
		$this->subscribeEvent('CoreWebclient::PopulateTabs', array($this, 'onPopulateTabs'));
	}

	/**
	 * Adds tab to tabs list
	 */
	public function onPopulateTabs($aTabs, &$aResult)
	{
		$aResult[] = array(
			'id' => 'dashboard',
			'text' => 'Dashboard',
			'url' => '#dashboard',
			'icon' => 'icon-dashboard'
		);
	}
}