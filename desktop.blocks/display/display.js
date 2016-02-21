modules.define(
	'display',
	['i-bem__dom', 'events', 'jquery'],
	function(provide, BEMDOM, events, $) {
		provide(BEMDOM.decl(this.name, {
			onSetMod: {
				'js': {
					'inited': function() {
						this.findBlockOn('slider').on('slide', this._onSlide, this);
					}
				}
			},

			_onSlide: function(e, data) {
				this.domElem.text(data.to);
			}
		}));
	}
);