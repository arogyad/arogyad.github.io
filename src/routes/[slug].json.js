import { process, processBlog } from '$lib/markdown';
import fs from 'fs';

// Extremely inefficent, but gets the job done
export async function get({ params }) {
	var prev;
	var current;
	var next;
	const files = fs.readdirSync('src/_posts/');
	const slug = params.slug == 'from_index' ? change(files[files.length - 1]) : params.slug;
	for (var j = 0; j != files.length; ++j) {
		if (slug == change(files[j])) {
			prev =
				files[j - 1] == undefined
					? undefined
					: { link: change(files[j - 1]), blog: processBlog(files[j - 1]) };
			current = files[j];
			next =
				files[j + 1] == undefined
					? undefined
					: {
							link: change(files[j + 1]),
							blog: processBlog(files[j + 1])
					  };
		}
	}
	const out = process(fs.readFileSync(`src/_posts/${current}`, 'utf8', (_e, _) => {}));
	return {
		body: {
			content: {
				out,
				prev,
				next
			}
		}
	};
}

function change(f) {
	return f
		.replace(/[!?] */g, '')
		.replace(/ /g, '_')
		.replace('.md', '')
		.toLowerCase();
}
