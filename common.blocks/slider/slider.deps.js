([
	{
		mustDeps: { block: 'i-bem', elem: 'dom' }
	},
	{
		tech: 'js',
		shouldDeps: [
			{ block: 'slider', mods: [ 'hidden' ] },
			{ tech: 'bemhtml', block: 'i-bem' },
			{ tech: 'bemhtml', elems: ['menu', 'toggle'] }
		]
	},
	{
		shouldDeps: [
			{ block: 'slider', mods: [ 'hidden' ] },
			{ elems: [
				'main', 'list', 'item', 'menu',
				{ elem: 'toggle', mods: { selected: true } },
				{ elem: 'control', mods: { type: ['prev', 'next'] } }
			] }
		]
	}
])
