"use strict";

var converter = {};

function parseQuotes(content) {
	var quote, quoteBlock,
		re = /\[quote=([\s\S]*?);[\S]*?\]([\s\S]*?)\[\/quote\]/gi;

	while(quote = content.match(re)) {
		quote = quote[0];
		quoteBlock = quote.replace(re, '@$1 said:\r\n $2').replace(/\r\n/g, '\r\n>');
		content = content.replace(quote, quoteBlock);
	}

	return content;
}

converter.parse = function(data, callback) {
	data.postData.content = data.postData.content
		.replace('&#58;', ':')
		.replace(/\[\S?color[\s\S]*?\]/gi, '')
		.replace(/\[\S?b\]/gi, '**')
		.replace(/\[url="(https?:[\s\S]*?)*?"\]([\s\S]*?)\[\/url*?\]/gi, '[$2]($1)')
		.replace(/\[img]([\s\S]*?)\[\/img*?\]/gi, '![image]($1)')
		.replace(/\[\S?url*?\]/gi, '')
		.replace(/\[quote\]([\s\S]*?)\[\/quote\]/gi, '> $1')
		.replace(/\[code\]([\s\S]*?)\[\/code\]/gi, '```\r\n$1\r\n```')
		.replace(/\[vimeo\]([\s\S]*?)\[\/vimeo\]/gi, '$1')
		.replace(/(https?:\/\/)player.vimeo.com\/video\/([0-9]*?)/, '$1vimeo.com/$2')
		.replace(/\[\S?[i|u]\]/gi, '*');

	data.postData.content = parseQuotes(data.postData.content);
	callback(null, data);
};

module.exports = converter;
