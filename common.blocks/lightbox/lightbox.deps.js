([
	{
		mustDeps: [{ block: 'i-bem', elem: 'dom' }],
	},
	{
		shouldDeps: [
			{ block: 'modal', mods: { autoclosable: 'true', theme: 'islands' } }
		]
	},
	{
		tech: 'js',
		shouldDeps: [
			{ tech: 'bemhtml', block: 'i-bem' },
			{ tech: 'bemhtml', block: 'modal' }
		]
	}
])