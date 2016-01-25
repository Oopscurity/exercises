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
						width: 320,
						paint: true,
						duration: 500,
						slideshow: true,
						delay: 2500
					},
					content: [
						{},
						{},
						{}
					].map(function() {
						return [
							{
								elem: 'item'
							}
						];
					})
				},
				{
					block: 'slider',
					js: {
						width: 760,
						paint: true,
						duration: 0,
						slideshow: true,
						delay: 1000
					},
					content: [
						{},
						{},
						{},
						{},
						{}
					].map(function() {
						return [
							{
								elem: 'item'
							}
						];
					})
				}
			]
		}
	]
};
