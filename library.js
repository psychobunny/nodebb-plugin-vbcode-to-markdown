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

converter.parse = function(postContent, callback) {
	postContent = postContent
		.replace('&#58;', ':')
		.replace(/\[\S?color[\s\S]*?\]/gi, '')
		.replace(/\[\S?b\]/gi, '**')
		.replace(/\[url="(https?:[\s\S]*?)*?"\]([\s\S]*?)\[\/url*?\]/gi, '[$2]($1)')
		.replace(/\[\S?url*?\]/gi, '')
		.replace(/\[quote\]([\s\S]*?)\[\/quote\]/gi, '> $1')
		.replace(/\[\S?[i|u]\]/gi, '*');

	postContent = parseQuotes(postContent);
	callback(null, postContent);
};

module.exports = converter;
