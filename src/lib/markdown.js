import marked from 'marked';
import katex from 'katex';
import fm from 'front-matter';
import hljs from 'highlight.js';
import dayjs from 'dayjs';

function mathsExpression(expr2) {
	let expr = expr2.replaceAll('amp;', '');
	expr = expr.replaceAll('&gt;', '');
	if (expr.match(/^\$\$[\s\S]*\$\$$/)) {
		expr = expr.substr(2, expr.length - 4);
		return katex.renderToString(expr, { displayMode: true });
	} else if (expr.match(/^\$[\s\S]*\$$/)) {
		expr = expr.substr(1, expr.length - 2);
		return katex.renderToString(expr, { isplayMode: false });
	}
}

export function process(file) {
	let value = fm(file);
	const renderer = new marked.Renderer();
	const rendererCode = renderer.code;
	renderer.code = function (code, lang, escaped) {
		if (!lang) {
			const math = mathsExpression(code);
			if (math) {
				return math;
			}
		}
		return rendererCode.call(this, code, lang, escaped);
	};

	const rendererCodespan = renderer.codespan;
	renderer.codespan = function (text) {
		const math = mathsExpression(text);
		if (math) {
			return math;
		}
		return rendererCodespan.call(this, text);
	};

	marked.setOptions({
		renderer: renderer,
		highlight: function (code, lang) {
			var language = hljs.getLanguage(lang) ? lang : 'plaintext';
			return hljs.highlight(code, { language }).value;
		},
		langPrefix: 'hljs language-',
		pedantic: false,
		gfm: true,
		breaks: false,
		sanitize: false,
		smartLists: true,
		smartypants: false,
		xhtml: false
	});
	value.body = marked(value.body);
	value.attributes.date = dayjs(value.attributes.date).format('YYYY-MM-DD');
	return value;
}

export function processBlog(file) {
	const blogList = file.split(/[-]/);
	return { date: blogList.slice(0, 3).join('-'), title: blogList[3].replace('.md', '') };
}
