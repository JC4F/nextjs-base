'use client';

import { useTranslations } from 'next-intl';

export default function DynamicClientPage({ params }: { params: { slug: string } }) {
  const translation = useTranslations('client');

  return (
    <section className="flex flex-col gap-6">
      {translation('title')} {params.slug}
    </section>
  );
}
