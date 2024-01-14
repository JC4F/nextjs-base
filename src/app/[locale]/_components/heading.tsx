'use client';

import { Button, Spinner } from '@/components';
import { customFetch } from '@/lib';
import { ArrowRight } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { toast } from 'react-toastify';

export const Heading = () => {
  const translation = useTranslations('home');
  const locale = useLocale();
  const { status } = useSession();

  const onCLick = async () => {
    const result = await customFetch('https://dummyjson.com/products/1');

    console.log(result);

    if (!result.success) {
      toast.error(result.message);
      return;
    }
  };

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        {translation('welcome')} <span className="underline">{translation('title')}</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">{translation('description')}</h3>
      {status === 'loading' && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {status === 'authenticated' && (
        <Button asChild>
          <Link href={`/${locale}/client`}>
            {translation('enter_sale')}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {status === 'unauthenticated' && (
        <Button>
          {translation('get_sale')}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      )}

      <Button onClick={onCLick} className="ml-2" variant={'outline'}>
        {translation('fetch_data')}
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};
