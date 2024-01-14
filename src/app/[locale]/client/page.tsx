'use client';
import { useTranslations } from 'next-intl';

export default function ClientPage() {
  const translation = useTranslations('client');

  return <section className="flex flex-col gap-6 text-center">{translation('title')}</section>;
}
