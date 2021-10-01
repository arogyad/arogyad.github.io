import fs from 'fs';
import { processBlog } from '$lib/markdown.js';
export async function get() {
	let content = [];
	fs.readdirSync('src/_posts/').forEach((f) => {
		content.push(processBlog(f));
	});
	content.reverse();
	return {
		body: {
			content
		}
	};
}
