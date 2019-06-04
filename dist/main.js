(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('confirm'), require('Confirmation')) :
	typeof define === 'function' && define.amd ? define(['exports', 'confirm', 'Confirmation'], factory) :
	(global = global || self, factory(global['@silverstripe/reactstrap-confirm'] = {}, global.confirm, global.Confirmation));
}(this, function (exports, confirm, Confirmation) { 'use strict';

	confirm = confirm && confirm.hasOwnProperty('default') ? confirm['default'] : confirm;
	Confirmation = Confirmation && Confirmation.hasOwnProperty('default') ? Confirmation['default'] : Confirmation;



	exports.Confirmation = Confirmation;
	exports.default = confirm;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
