modules.define(
	'slider',
	[ 'i-bem__dom', 'BEMHTML', 'events', 'jquery' ],
	function(provide, BEMDOM, BEMHTML, events, $) {
		provide(BEMDOM.decl(this.name, {
			onSetMod: {
				js: {
					inited: function() {
						var params = this.params;

						this.current = 0;
						this.isVertical = (params.orientation === 'vertical') ? true : false;
						this.mainSideProperty = this.isVertical ? 'height' : 'width';
						this.mainSideValue = parseInt(this.domElem.css(this.mainSideProperty)) / params.together;
						this.setSize();

						if (params.paint) {
							this.paint();
						}
						if (params.slideshow) {
							this.pause = false;
							// it's waste if slideshow isn't used
							// that's why the declaration is here
							this.slideshow();
						}
						if (params.wheel == 'page') {
							if ('onwheel' in document) {
								this.bindToWin('wheel', this._onWheel); // IE9+
							} else if ('onmousewheel' in document) {
								this.bindToWin('mousewheel', this._onWheel);
							} else {
								this.bindToWin('MozMousePixelScroll', this._onWheel);
							}
						} else if (params.wheel) {
							if ('onwheel' in document) {
								this.bindTo('wheel', this._onWheel); // IE9+
							} else if ('onmousewheel' in document) {
								this.bindTo('mousewheel', this._onWheel);
							} else {
								this.bindTo('MozMousePixelScroll', this._onWheel);
							}
						}

						this.bindTo('toggle', 'click', this._onToggleClick)
							.bindTo((this.findElem('control', 'type', 'prev')), 'click', function() { this.prev() })
							.bindTo((this.findElem('control', 'type', 'next')), 'click', function() { this.next() })
							.bindTo('main', 'mouseover', function() { this.setMod('hovered'); })
							.bindTo('main', 'mouseout', function() { this.delMod('hovered'); })
							.to('begin');
					}
				},
				hovered: {
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
					orientation: 'horizontal',
					duration: 500,
					together: 1,
					wheel: false,
					paint: true,
					slideshow: false,
					delay: 2000
				};
			},
			_onWheel: function(e) {
				if (this.sliding) return;

				e = e.originalEvent;
				var delta = e.deltaY || e.detail || e.wheelDelta;
				(delta > 0) ? this.next() : this.prev();
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
				if (this.sliding) return;

				var target = $(e.currentTarget);
				var index = target.index();

				this
					.delMod(this.elem('toggle'), 'selected')
					.setMod(target, 'selected')
					.slide(index)
					.emit('slide', { to: index + 1 })
					.current = index;
			},
			_onSlide: function(e, data) {
				if (!data) {
					var toggle = this.elem('toggle').eq(this.current++).trigger('click');
				}
			},

			setSize: function() {
				var property = this.mainSideProperty;
				var value = this.mainSideValue;
				console.log(this.params.together);

				this.elem('list').css(property, value * this.params.together * this.elem('item').length);
				this.elem('item').css(property, value);
			},
			updateWidth: function() {
				var width = this.width;

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
				var list = this.findElem('list'),
					animatedProperty = this.isVertical ? 'marginTop' : 'marginLeft',
					animatedData = {};
				animatedData[animatedProperty] = '-' + index * this.mainSideValue + 'px';

				_this = this;
				_this.sliding = true;
				list.animate(animatedData, this.params.duration, function() {
					_this.sliding = false;
				});
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
