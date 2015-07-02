'use strict';

// Configuring the Articles module
angular.module('advices').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Advice', 'advices', 'dropdown', '/advices(/create)?');
		Menus.addSubMenuItem('topbar', 'advices', 'List Advice', 'advices');
	}
]);