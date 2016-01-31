module.exports = {
	block : 'page',
	title : 'Gallery',
	head : [
		{ elem : 'meta', attrs : { name : 'description', content : '' } },
		{ elem : 'meta', attrs : { name : 'viewport', content : 'width=device-width, initial-scale=1' } },
		{ elem : 'css', url : 'index.min.css' }
	],
	scripts: [{ elem : 'js', url : 'index.min.js' }],
	content : [
		{
			block: 'content',
			content: [
				{
					block: 'gallery',
					content: [
						{
							elem: 'list',
							content: [
								{ url: 'http://25.media.tumblr.com/tumblr_me7mr705so1rsn9ozo1_500.gif' },
								{ url: 'http://cx.aos.ask.com/question/aq/700px-394px/meaning-bird-flying-house_ea4dc2ac42da2814.jpg' },
								{ url: 'http://www.birdwatching.com/birdgalleries/visitor_pictures/images/mtn-bluebird-500-MarkWilson.jpg' },
								{ url: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Mountain_Bluebird.jpg' },
								{ url: 'https://suzlipman.files.wordpress.com/2010/02/greenhoneycreeper.jpg' },
								{ url: 'http://i.dailymail.co.uk/i/pix/2015/03/15/1A1533C300000578-0-image-m-40_1426462880176.jpg' },
								{ url: 'http://www.inaturewatch.org/images/tips/bird-singing-gif.gif' },
								{ url: 'http://www.wallcoo.net/animal/birds_wallpaper_01/images/birds_051.jpg' }
							].map(function(item) {
								return [
									{
										elem: 'item',
										content: [
											{
												elem: 'image',
												url: item.url
											}
										]
									}
								];
							})
						}
					]
				}
			]
		}
	]
};