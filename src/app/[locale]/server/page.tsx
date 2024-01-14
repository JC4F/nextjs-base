import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Server Components',
  description: 'Server Components Description',
};

export default function ServerPage() {
  const translation = useTranslations('server');

  return <section className="flex flex-col gap-6 text-center">{translation('title')}</section>;
}
