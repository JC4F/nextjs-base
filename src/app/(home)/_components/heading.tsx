'use client';

import { Button, Spinner } from '@/components';
import { customFetch } from '@/lib';
import { ArrowRight } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { toast } from 'react-toastify';

export const Heading = () => {
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
        Your Ideas, Documents, & Plans. Unified. Welcome to <span className="underline">Notion</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Notion is the connected workspace where <br />
        better, faster work happens.
      </h3>
      {status === 'loading' && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {status === 'authenticated' && (
        <Button asChild>
          <Link href="/documents">
            Enter Notion
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {status === 'unauthenticated' && (
        <Button>
          Get Notion free
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      )}

      <Button onClick={onCLick} className="ml-2" variant={'outline'}>
        Fetch Data
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};
