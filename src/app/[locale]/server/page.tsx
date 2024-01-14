import { useTranslations } from 'next-intl';

export default async function ServerPage() {
  const translation = useTranslations('server');

  return <section className="flex flex-col gap-6">{translation('title')}</section>;
}
