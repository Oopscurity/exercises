module.exports = {
	block : 'page',
	title : 'Slider 2',
	head : [
		{ elem : 'meta', attrs : { name : 'description', content : '' } },
		{ elem : 'meta', attrs : { name : 'viewport', content : 'width=device-width, initial-scale=1' } },
		{ elem : 'css', url : 'index.min.css' }
	],
	scripts: [{ elem : 'js', url : 'index.min.js' }],
	content: [
		{
			block: 'content',
			content: [
				{
					block: 'slider',
					js: { width: 600 },
					content: [
						{
							elem: 'list',
							content: [
								{ image: '' },
								{ image: '' },
								{ image: '' },
								{ image: '' },
								{ image: '' },
								{ image: '' },
								{ image: '' },
							].map(function(item) {
								return {
									elem: 'item',
									content: {
										elem: 'image',
										//mix: { block: 'slider', elem: 'image' },
										url: item.url
									}
								};
							})
						}
					]
				}
			]
		}
	]
};
