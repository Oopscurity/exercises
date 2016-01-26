modules.define(
	'remote',
	['i-bem__dom', 'events', 'jquery'],
	function(provide, BEMDOM, events, $) {
		provide(BEMDOM.decl(this.name, {
			onSetMod: {
				'js': {
					'inited': function() {
						this.bindTo('click', this._onClick);
					}
				}
			},

			_onClick: function() {
				this.emit('click');
				console.log('Click on remote')
			}
		}));
	}
);