modules.define(
	'link',
	[ 'jquery', 'jquery__ui' ],
	function(provide, $, ui, Link) {
		provide(Link.decl({ modName: 'animated', modVal: true }, {
			onSetMod: {
				js: {
					inited: function() {
						this.__base();

						this.bindTo('click', this._onClick);
					}
				}
			},

			getDefaultParams: function() {
				// to get params from parent
				var _base = this.__base();
				_base.duration = 500;
				_base.easing = 'easeInOutCubic';

				return _base;
			},

			_onClick: function(e) {
				if (this.getUrl()[0] !== '#') return;

				e.preventDefault();
				var url = this.getUrl();
				// to prevent multiple '#' like ##element or even #element#
				// var id = Array.prototype.filter.call(url, function(c) { return (c !== '#')}).join('');
				var node = (navigator.userAgent.toLowerCase().indexOf('webkit') > 0) ? 'body' : 'html';

				$(node).animate({
					scrollTop: $(url).offset().top
				}, this.params.duration, this.params.easing );

				if (!window.location.href.endsWith(url))
					window.location.href += url;
			}
		}));
	}
);