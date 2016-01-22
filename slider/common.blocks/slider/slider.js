modules.define(
	'slider',
	[ 'i-bem__dom', 'BEMHTML', 'jquery', 'events' ],
	function(provide, BEMDOM, BEMHTML, $, events) {
		provide(BEMDOM.decl(this.name, {

			slides: 0,
			current: 0,
			delay: 3000,

			onSetMod: {
				'js': {
					'inited': function() {
						console.time('test');
						this.addMenu();
						this.slides = this.count();
						this.addToggles();
						console.timeEnd('test');

						this.next();
					}
				}
			},
			addMenu: function() {
				BEMDOM.append(
					this.domElem,
					BEMHTML.apply({
						block: 'slider',
						elem: 'menu'
					})
				);					
			},
			count: function() {
				var items = this.findElem('item');

				for (var i = 0; i < items.length; ++i) {
					$(items[i]).attr('rel', i);
					$(items[i]).css({
						backgroundColor: 'rgba(' + ~~(Math.random()*255) + ', '
												 + ~~(Math.random()*255) + ', '
												 + ~~(Math.random()*255) + ', '
												 + (Math.random())
												 + ')' });
				}
				return items.length;
			},
			toggle: function(targetId) {
				var list = this.findElem('list');

				$(list).animate({ marginLeft: '-' + targetId * this.params.width }, 500);
				this.current = targetId;
			},
			next: function() {
				var __self = this;
				var toggles = this.findElem('toggle');

				(function() {
					if (__self.current == __self.slides) {
						__self.current = 0;
					}

					var toggle = toggles[__self.current];
					$(toggle).trigger('click');
					++__self.current;

					setTimeout(arguments.callee, __self.delay)
				})();
			},
			addToggles: function() {
				var menu = this.findElem('menu');
				var items = this.findElem('item');

				for (var i = 0; i < items.length; ++i) {
					BEMDOM.append(
						menu,
						BEMHTML.apply({
							block: 'slider',
							elem: 'toggle',
							attrs: { rel: i }
						})
					);
				}

				this.bindTo('toggle', 'click', function(e) {
					var target = e.currentTarget;
					var targetId = $(target).attr('rel');

					this.delMod(this.elem('toggle'), 'selected');
					this.setMod($(target), 'selected');

					this.toggle(targetId);
				});
			}

		}));
	}
);