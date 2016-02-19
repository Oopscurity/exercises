modules.define(
	'slider',
	function(provide, Slider) {
		provide(Slider.decl({
			onSetMod: {
				js: {
					inited: function() {
						this.__base();
						this.findBlockOn('remote').on('click', this._onRemoteClick, this);
					}
				}
			}
		}));
	}
);