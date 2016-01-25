modules.define(
	'slider',
	[ 'i-bem__dom', 'BEMHTML', 'jquery' ],
	function(provide, BEMDOM, BEMHTML, $) {
		provide(BEMDOM.decl(this.name, {
			onSetMod: {
				'js': {
					'inited': function() {
						this.items = 0;
						this.current = 0;

						if (this.params.width !== 600) {
							this.updateWidth();
						}

						this.count();
						this.menu();
						this.slideShow();
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
				var targetId = target.attr('order');

				this
					.delMod(this.elem('toggle'), 'selected')
					.dropElemCache('toggle')
					.setMod(target, 'selected')
					.slide(targetId)
					.current = targetId;
			},

			updateWidth: function() {
				var width = this.params.width;

				this.domElem.css('width', width);
				this.elem('item').css('width', width);
			},
			count: function() {
				var items = this.elem('item'),
					needPaint = this.params.paint;

				this.items = items.length;

				items.each(function(idx) {
					var item = $(this);
					item.attr('order', idx);

					if (needPaint) {
						item.css({
							backgroundColor: 'rgba(' + ~~(Math.random() * 255) + ', '
													 + ~~(Math.random() * 255) + ', '
													 + ~~(Math.random() * 255) + ', '
													 + Math.random() + ')'
						})
					}
				});
			},
			menu: function() {
				BEMDOM.append(
					this.domElem,
					BEMHTML.apply({
						block: 'slider',
						elem: 'menu'
					})
				);

				this.togglify();
			},
			togglify: function() {
				var menu = this.elem('menu'),
					html = '';

				for (var i = 0; i < this.items; ++i) {
					html += BEMHTML.apply({
						block: 'slider',
						elem: 'toggle',
						js: true,
						attrs: { order: i }
					});
				}

				BEMDOM.append(menu, html);

				this.bindTo('toggle', 'click', this._onToggleClick);
			},
			slide: function(targetId) {
				var list = this.findElem('list');

				list.animate({
					marginLeft: '-' + targetId * this.params.width + 'px'
				}, this.params.duration);

				return this;
			},
			slideShow: function() {
				if (!this.params.slideshow)
					return;

				var __self = this;
				var toggles = this.elem('toggle');

				setInterval(function() {
					if (__self.current === __self.items) {
						__self.current = 0;
					}

					toggles.eq(__self.current).trigger('click');
					++__self.current;
				}, __self.params.delay);
			}
		}));
	}
);
