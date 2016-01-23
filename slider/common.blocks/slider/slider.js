modules.define(
	'slider',
	[ 'i-bem__dom', 'BEMHTML', 'jquery' ],
	function(provide, BEMDOM, BEMHTML, $) {
		provide(BEMDOM.decl(this.name, {

			items: 0,
			current: 0,
			
			options: {
				width: 600,
				duration: 500,
				paint: true,
				slideshow: false,
				delay: 2000
			},

			onSetMod: {
				'js': {
					'inited': function() {
						this.config();
						this.count();
						this.menu();
						this.slideShow();
					}
				}
			},

			_onToggleClick: function(e) {
				var target = $(e.currentTarget);
				var targetId = target.attr('order');

				this.delMod(this.elem('toggle'), 'selected');
				this.dropElemCache('toggle');
				this.setMod(target, 'selected');
				this.current = targetId;
				this.slide(targetId);
			},

			config: function() {
				this.options.width = this.params.width ? this.params.width : 600;
				if (this.options.width !== 600) {
					this.updateWidth();
				}

				this.options.duration = (this.params.duration !== undefined) ? this.params.duration : 500;
				this.options.paint = (this.params.paint == true) ? true : false;
				this.options.slideshow = this.params.slideshow ? this.params.slideshow : false;
				this.options.delay = (this.params.delay !== undefined) ? this.params.delay : 2000;
			},
			updateWidth: function() {
				$(this.domElem).css('width', this.options.width);
				$(this.elem('item')).css('width', this.options.width);
			},
			count: function() {
				var items = this.findElem('item');

				this.items = items.length;
				for (var i = 0; i < this.items; ++i) {
					$(items[i]).attr('order', i);

					if (this.options.paint) {
						$(items[i]).css({
							backgroundColor: 'rgba(' + ~~(Math.random() * 255) + ', '
													 + ~~(Math.random() * 255) + ', '
													 + ~~(Math.random() * 255) + ', '
													 + Math.random() + ')'
						})
					}
				}
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
				var menu = this.findElem('menu');

				for (var i = 0; i < this.items; ++i) {
					BEMDOM.append(
						menu,
						BEMHTML.apply({
							block: 'slider',
							elem: 'toggle',
							js: true,
							attrs: { order: i }
						})
					);
				}

				this.bindTo('toggle', 'click', function(e) {
					this._onToggleClick(e);
				});
			},
			slide: function(targetId) {
				var list = $(this.findElem('list'));
				list.animate({
					marginLeft: '-' + targetId * this.options.width + 'px'
				}, this.options.duration);
			},
			slideShow: function() {
				if (!this.options.slideshow)
					return;

				var __self = this;
				var toggles = this.findElem('toggle');

				(function() {
					if (__self.current === __self.items) {
						__self.current = 0;
					}
					
					$(toggles[__self.current]).trigger('click');
					++__self.current;

					setTimeout(arguments.callee, __self.options.delay);
				})();
			}
		}));
	}
);