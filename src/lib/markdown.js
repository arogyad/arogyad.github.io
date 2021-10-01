import marked from 'marked';
import fm from 'front-matter';
import hljs from 'highlight.js';
import dayjs from 'dayjs';

export function process(file) {
	let value = fm(file);
	marked.setOptions({
		renderer: new marked.Renderer(),
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
