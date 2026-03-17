import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export function getPostSlug(post: BlogPost) {
  return post.data.slug ?? post.id.replace(/(^|\/)index$/, '').replace(/\.md$/, '');
}

export function getPostUrl(post: BlogPost) {
  return `/articles/${getPostSlug(post)}/`;
}

export function sortPosts(posts: BlogPost[]) {
  return [...posts].sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export function getPublicPosts(posts: BlogPost[]) {
  return sortPosts(posts.filter((post) => !post.data.draft));
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }).format(date);
}

export function getCategorySlug(category: string) {
  return encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'));
}

export function getTagSlug(tag: string) {
  return encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'));
}

export function getUniqueCategories(posts: BlogPost[]) {
  return [...new Set(posts.map((post) => post.data.category))].sort((a, b) => a.localeCompare(b));
}

export function getUniqueTags(posts: BlogPost[]) {
  return [...new Set(posts.flatMap((post) => post.data.tags))].sort((a, b) => a.localeCompare(b));
}

export function isCategoryMatch(category: string, slug: string) {
  return getCategorySlug(category) === slug;
}

export function isTagMatch(tag: string, slug: string) {
  return getTagSlug(tag) === slug;
}
