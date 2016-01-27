modules.define(
	'slider',
	[ 'i-bem__dom', 'BEMHTML', 'events', 'jquery' ],
	function(provide, BEMDOM, BEMHTML, events, $) {
		provide(BEMDOM.decl(this.name, {
			onSetMod: {
				'js': {
					'inited': function() {
						this.current = 0;

						if (this.params.width != 600) {
							this.updateWidth();
						}
						if (this.params.paint) {
							this.paint();
						}
						if (this.params.slideshow) {
							this.pause = false;
							// it's waste if slideshow isn't used
							// that's why the declaration is here
							this.slideshow();
						}

						this.bindTo('toggle', 'click', this._onToggleClick)
							.bindTo('main', 'mouseover', function() { this.setMod('hovered'); })
							.bindTo('main', 'mouseout', function() { this.delMod('hovered'); })
							.findBlockOn('remote').on('click', this._onRemoteClick, this);
						this.to('begin');
					}
				},
				'hovered': {
					true: function() {
						if (this.params.slideshow) {
							this.pause = true;
						}
					},
					'' : function() {
						if (this.params.slideshow) {
							this.pause = false;
						}
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
			_onRemoteClick: function(e, data) {
				if (!data) {
					this.next();
				}
				switch(data.to) {
					case 'next': this.next(); break;
					case 'prev': this.prev(); break;
					case 'begin': this.to('begin'); break;
					case 'end': this.to('start'); break;
					default: this.to(data.to - 1);
				}
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
			_onSlide: function(e, data) {
				if (!data) {
					var toggle = this.elem('toggle').eq(this.current++).trigger('click');
				}
			},

			updateWidth: function() {
				var width = this.params.width;

				this.findElem('main').css('width', width);
				this.elem('item').css('width', width);
			},
			paint: function() {
				var items = this.elem('item');

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
			to: function(target) {
				// !!! to add checking 

				var toggles = this.elem('toggle');

				switch(typeof target) {
					case 'string': {
						if (target === 'begin') {
							toggles.first().trigger('click');
						} else if (target === 'end') {
							toggles.last().trigger('click');
						}
						break;
					}
					case 'number': {
						if (target < 0 || target > toggles.length) {
							return;
						}
						toggles.eq(target).trigger('click');
					}
				}
			},
			next: function() {
				var next;

				if (this.current === this.elem('toggle').length - 1) {
					this.current = 0;
					next = this.current;
				} else {
					next = ++this.current;
				}

				this.to(next);
			},
			prev: function() {
				var prev;

				if (this.current === 0) {
					this.current = this.elem('toggle').length - 1;
					prev = this.current;
				} else {
					prev = --this.current;
				}

				this.to(prev);
			},
			slideshow: function() {
				if (!this.params.slideshow) // ! probably unnecessary checking
					return;

				var _this = this,
					// items -- it's local because it's
					// unnecessary if slideshow isn't required
					items = this.elem('item').length,
					toggles = this.elem('toggle');

				setInterval(function() {
					if (!_this.pause) {
						_this.next();
					}
				}, this.params.delay)
			}
		}));
	}
);
