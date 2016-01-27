module.exports = {
	block : 'page',
	title : 'Slider',
	head : [
		{ elem : 'meta', attrs : { name : 'description', content : '' } },
		//{ elem : 'meta', attrs : { name : 'viewport', content : 'width=device-width, initial-scale=1' } },
		{ elem : 'css', url : 'index.min.css' }
	],
	scripts: [
		{ elem : 'js', url : 'index.min.js' }
	],
	content: [
		{
			block: 'content',
			content: [
				{
					block: 'slider',
					js: {
						id: 'together',
						width: 1080,
						paint: true,
						duration: 500,
						slideshow: false,
						delay: 2000
					},
					content: [
						{},
						{},
						{},
						{},
						{}
					].map(function() { return { elem: 'item'}; })
				},
				{
					block: 'slider',
					js: { id: 'together'},
					mix: { block: 'remote' }
				}
			]
		}
	]
};
