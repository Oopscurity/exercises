([
	{
		mustDeps: { block: 'i-bem', elem: 'dom' }
	},
	{
		mustDeps: [
			{ elem: 'menu' },
			{ elem: 'toggle', mods: { selected: true } }
		]
	},
	{
		tech: 'js',
		mustDeps: [
			{ tech: 'bemhtml', block: 'i-bem' },
			{ tech: 'bemhtml', elem: 'menu' }
		]
	}
])