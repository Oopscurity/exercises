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
							.bindTo('main', 'mouseover', this._onMainMouseover)
							.bindTo('main', 'mouseout', this._onMainMouseout)
							.findBlockOn('remote').on('click', this._onRemoteClick, this);
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
			_onMainMouseover: function() {
				if (!this.params.slideshow) {
					return;
				}
				this.pause = true;
				console.log(this.pause);
			},
			_onMainMouseout: function() {
				if (!this.params.slideshow) {
					return;
				}
				this.pause = false;
			},
			_onRemoteClick: function() {
				console.log('Remote has been linked');
			},
			_onToggleClick: function(e) {
				var target = $(e.currentTarget);
				var index = target.index();

				this
					.delMod(this.elem('toggle'), 'selected')
					.setMod(target, 'selected')
					.slide(index)
					.emit('slide')
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
				if (!this.params.slideshow) // probably unnecessary checking
					return;

				var _this = this,
					// items -- it's local because it's
					// unnecessary if slideshow isn't required
					items = this.elem('item').length,
					toggles = this.elem('toggle');

				// setInterval() instead of self-executed setTimeout()
				// -- to give time to look at the 1st slide
				setInterval(function() {
					if (!_this.pause) {
						if (_this.current === items) {
							_this.current = 0;
						}

						toggles.eq(_this.current).trigger('click');
						++_this.current;
					}
				}, this.params.delay)
			}
		}));
	}
);
