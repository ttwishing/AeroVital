import type { LayoutServerLoad } from './$types';

import { PUBLIC_APP_URL } from '$env/static/public';
import type { SeoConfig } from '@pouchlab/svead';

export const trailingSlash = 'always';
export const prerender = true;

export type LayoutData = Awaited<ReturnType<typeof load>> & {
	currentLangAbsoluteUrl: string;
};

const ensureTrailingSlash = (path: string): string => {
	if (path.endsWith('/')) return path;
	return path + '/';
};

export const load: LayoutServerLoad = ({ url }) => {
	// 基础的网站根 URL（确保以 / 结尾，便于 NEW URL 构造）
	const siteBaseUrl = new URL(PUBLIC_APP_URL || url.origin).origin + '/';
	const currentPath = url.pathname;

	// 单语言：直接用当前路径
	const unlocalizedPath = currentPath;

	// === 计算 Canonical URL (当前路径的绝对链接) ===
	const canonicalPathPart = ensureTrailingSlash(unlocalizedPath); // 确保 trailing slash
	const finalCanonicalUrl = new URL(canonicalPathPart, siteBaseUrl).href;

	// 🌟 计算规范化的网站根 URL (用于 Schema)
	const rootUrlPart = '/'; // 根路径固定为 '/'
	const finalSiteUrl = new URL(rootUrlPart, siteBaseUrl).href; // 结果是 'https://site.com/'

	// === 计算当前语言的绝对 URL (用于 og:url) ===
	const currentLangAbsoluteUrl = finalCanonicalUrl; // 单语言下，与 canonical 相同

	// 基础 meta 标签（固定英文）
	const baseMetaTags: SeoConfig = {
		title: 'AeroVital | Australian Drone Technology & Solutions', // 👈 替换为你的实际英文标题
		description: 'AeroVital offers U60 heavy-lift & U40 agile precision drones for Aussie ag and inspection. Localized R&D, advanced spraying, and full CASA compliance support.', // 👈 替换为实际描述
		site_name: 'AeroVital Solutions', // 👈 替换为实际站点名
		url: currentLangAbsoluteUrl,
		language: 'en', // 固定为 en
		open_graph_image: siteBaseUrl + 'images/og.png',
		twitter_card_type: 'summary_large_image'
	};

	const getAbsoluteUrlWithTrailingSlash = (path: string) => {
		// 单语言：直接确保 trailing slash
		const finalPath = ensureTrailingSlash(path);
		return new URL(finalPath, siteBaseUrl).href;
	};

	// 修改 WebSite Schema（简化 about，只列实际页面）
	const webSiteSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: baseMetaTags.title,
		description: baseMetaTags.description,
		url: finalSiteUrl, // 👈 使用规范化的根 URL
		inLanguage: 'en', // 固定 en
		about: [
			// 首页
			{
				'@type': 'WebPage',
				name: 'Home', // 或你的首页标题，如 'AeroVital Home'
				url: finalSiteUrl // 根 URL
			},
			// About Us 页
			{
				'@type': 'WebPage',
				name: 'About Us',
				url: getAbsoluteUrlWithTrailingSlash('/about-us')
			}
		]
	};

	// 修改 Organization Schema
	const organizationSchema = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: baseMetaTags.site_name,
		url: finalSiteUrl, // 👈 使用规范化的根 URL
		logo: `${siteBaseUrl}logo.webp`
	};

	const schema = [webSiteSchema, organizationSchema];

	return {
		baseMetaTags,
		baseSchema: schema,
		siteUrl: finalSiteUrl,
		currentLangAbsoluteUrl
	};
};
