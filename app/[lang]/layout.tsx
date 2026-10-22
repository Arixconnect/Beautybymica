import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import localFont from 'next/font/local';
import { isLocale, locales, dictionaries } from '../../lib/i18n';
import { siteUrl, asset } from '../../lib/config';
import '../globals.css';

const serif = localFont({ src: [{ path: '../../public/fonts/instrument-serif-latin-400-normal.woff2', style: 'normal', weight: '400' }, { path: '../../public/fonts/instrument-serif-latin-400-italic.woff2', style: 'italic', weight: '400' }], variable: '--font-editorial', display: 'swap' });
const sans = localFont({ src: '../../public/fonts/manrope-latin-wght-normal.woff2', variable: '--font-sans', display: 'swap' });
export const dynamicParams = false;
export function generateStaticParams() { return locales.map(lang => ({ lang })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dictionaries[lang];
  return {
    metadataBase: new URL(siteUrl + '/'), title: t.title, description: t.description,
    robots: { index: false, follow: false },
    alternates: { canonical: `${siteUrl}/${lang}/`, languages: { ...Object.fromEntries(locales.map(l => [l, `${siteUrl}/${l}/`])), 'x-default': `${siteUrl}/en/` } },
    openGraph: { title: t.title, description: t.description, type: 'website', url: `${siteUrl}/${lang}/`, siteName: 'Beauty by Mica', images: [{ url: `${siteUrl}/images/glamorous-glam.webp`, width: 964, height: 1381, alt: t.heroAlt }] },
    twitter: { card: 'summary_large_image', title: t.title, description: t.description, images: [`${siteUrl}/images/glamorous-glam.webp`] },
    icons: { icon: asset('/favicon.svg') },
  };
}
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <html lang={lang} className={`${serif.variable} ${sans.variable}`}><body>{children}</body></html>;
}
