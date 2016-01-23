([
	{
		mustDeps: { block: 'i-bem', elem: 'dom' }
	},
	{
		tech: 'js',
		mustDeps: [
			{ tech: 'bemhtml', elem: 'i-bem' },
			{ tech: 'bemhtml', elems: ['menu', 'toggle'] }
		]
	},
	{
		mustDeps: [
			{ elems: ['menu'] },
			{ elem: 'toggle', mods: ['selected'] }
		]
	}
])