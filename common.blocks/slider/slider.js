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
						this.sliding = false;
						this.isVertical = (params.orientation === 'vertical') ? true : false;
						this.mainSideProperty = this.isVertical ? 'height' : 'width';
						this.mainSideValue;

						if (params.resize) {
							this.bindToWin('resize', this._onResize);
						}

						if (params.responsive && this.isMobile()) {
							this.initMobile();
						} else
							this.init();
							this.setSize();
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
					paint: false,
					slideshow: false,
					resize: true,
					delay: 2000,
					responsive: true,
					minWinWidth: 640,
					minWinHeight: 480,
				};
			},
			_onResize: function() {
				if (this.params.responsive && this.isMobile()) {
					this.abort();
				} else if (!this.inited) {
					this.init();
				}
				this.setSize();
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

			init: function() {
				if (this.inited) return;

				var params = this.params;
				this.delMod('hidden');
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

				if (params.paint && !this.painted) {
					this.paint();
				}
				this.bindTo('toggle', 'click', this._onToggleClick)
					.bindTo((this.findElem('control', 'type', 'prev')), 'click', function() { this.prev() })
					.bindTo((this.findElem('control', 'type', 'next')), 'click', function() { this.next() })
					.bindTo('main', 'mouseover', function() { this.setMod('hovered'); })
					.bindTo('main', 'mouseout', function() { this.delMod('hovered'); })
					.to('begin');

				if (params.slideshow) {
					this.pause = false;
					this.slideshow();
				}
				this.inited = true;
			},
			initMobile: function() {
				if (this.inited) return;

				this.setMod('hidden');
				if (this.params.paint) {
					this.paint();
				}
				this.setSize();
			},
			abort: function() {
				if (!this.inited) return;

				var params = this.params;
				if (params.wheel == 'page') {
					if ('onwheel' in document) {
						this.unbindFromWin('wheel'); // IE9+
					} else if ('onmousewheel' in document) {
						this.unbindFromWin('mousewheel');
					} else {
						this.unbindFromWin('MozMousePixelScroll');
					}
				} else if (params.wheel) {
					if ('onwheel' in document) {
						this.unbindFrom('wheel'); // IE9+
					} else if ('onmousewheel' in document) {
						this.unbindFrom('mousewheel');
					} else {
						this.unbindFrom('MozMousePixelScroll');
					}
				}

				this.to('begin');
				this.unbindFrom('toggle', 'click')
					.unbindFrom((this.findElem('control', 'type', 'prev')), 'click')
					.unbindFrom((this.findElem('control', 'type', 'next')), 'click')
					.unbindFrom('main', 'mouseover')
					.unbindFrom('main', 'mouseout')
					.pause = true;

				this.setMod('hidden')
					.inited = false;
			},
			isMobile: function() {
				var params = this.params,
					w = window;
				return (w.innerWidth < params.minWinWidth || w.innerHeight < params.minWinHeight);
			},
			setSize: function() {
				var value, property;
				this.elem('item').css('width', ''); // !!!

				if (this.hasMod('hidden')) {
					property = 'width';
					value = parseFloat(this.domElem.css(property))/this.params.together;

					this.elem('list').css(property, '');
					this.elem('item').css(property, value - 1);
				} else {
					property = this.mainSideProperty;
					value = this.mainSideValue = parseFloat(this.domElem.css(property))/this.params.together;

					this.elem('list').css(property, value * this.params.together * this.elem('item').length);
					this.elem('item').css(property, value);
				}
				return this;
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
					});
				});
				this.painted = true;
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
					if (!_this.inited) return;
					if (!_this.pause) {
						_this.next();
					}
				}, this.params.delay)
			}
		}));
	}
);
