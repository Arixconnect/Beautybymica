import { notFound } from 'next/navigation';
import { isLocale, dictionaries } from '../../lib/i18n';
import { Home } from '../../components/home';
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <Home lang={lang} t={dictionaries[lang]} />;
}
