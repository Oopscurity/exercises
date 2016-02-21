modules.define(
	'image',
	['i-bem__dom', 'BEMHTML', 'lightbox'],
	function(provide, BEMDOM, BEMHTML, Lightbox) {
		provide(BEMDOM.decl(this.name, {}, {
			live: function() {
				this.liveBindTo('click', function() {
					Lightbox.show(BEMHTML.apply({ block: 'image', url: this.domElem.attr('src') }));
				});
			}
		}));
	}
);