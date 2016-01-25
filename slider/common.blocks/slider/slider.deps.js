([
	{
		mustDeps: { block: 'i-bem', elem: 'dom' }
	},
	{
		tech: 'js',
		shouldDeps: [
			{ tech: 'bemhtml', block: 'i-bem' },
			{ tech: 'bemhtml', elems: ['menu', 'toggle'] }
		]
	},
	{
		shouldDeps: [
			{ elems: ['list', 'item', 'menu', { elem: 'toggle', mods: { selected: true } }] }
		]
	}
])
