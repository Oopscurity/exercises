modules.define(
	'slider',
	[ 'i-bem__dom', 'BEMHTML', 'jquery' ],
	function(provide, BEMDOM, BEMHTML, $) {
		provide(BEMDOM.decl(this.name, {
			onSetMod: {
				'js': {
					'inited': function() {
						this.current = 0;

						if (this.params.width != 600) {
							this.updateWidth();
						}
						if (this.params.paint == true) {
							this.paint();
						}

						this.bindTo('toggle', 'click', this._onToggleClick)
							.slideshow();
					}
				}
			},

			getDefaultParams: function() {
				return {
					width: 600,
					duration: 500,
					paint: true,
					slideshow: false,
					delay: 2000
				};
			},

			_onToggleClick: function(e) {
				var target = $(e.currentTarget);
				var index = target.index();

				this
					.delMod(this.elem('toggle'), 'selected')
					.setMod(target, 'selected')
					.slide(index)
					.current = index;
			},

			updateWidth: function() {
				var width = this.params.width;

				this.domElem.css('width', width);
				this.elem('item').css('width', width);
			},
			paint: function() {
				var items = this.elem('item'),
					needPaint = this.params.paint;

				items.each(function(idx) {
					var item = $(this);
					item.css({
						backgroundColor: 'rgba(' + ~~(Math.random() * 255) + ', '
												 + ~~(Math.random() * 255) + ', '
												 + ~~(Math.random() * 255) + ', '
												 + Math.random() + ')'
					})
				});
			},
			slide: function(index) {
				var list = this.findElem('list');

				list.animate({
					marginLeft: '-' + index * this.params.width + 'px'
				}, this.params.duration);

				return this;
			},
			slideshow: function() {
				if (!this.params.slideshow)
					return;

				var __self = this,
					// items -- it's local because it's
					// unnecessary if slideshow isn't required
					items = this.elem('item').length,
					toggles = this.elem('toggle');

				setInterval(function() {
					if (__self.current === items) {
						__self.current = 0;
					}

					toggles.eq(__self.current).trigger('click');
					++__self.current;
				}, __self.params.delay);
			}
		}));
	}
);
