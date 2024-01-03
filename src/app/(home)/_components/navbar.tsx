'use client';

import Link from 'next/link';

import { useScrollTop } from '@/hooks';
import { cn } from '@/lib/utils';

import { Button, ModeToggle, Spinner } from '@/components';
import { useSession } from 'next-auth/react';
import { Logo } from './logo';

export const Navbar = () => {
  const { status } = useSession();
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        'z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6',
        scrolled && 'border-b shadow-sm',
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {status === 'loading' && <Spinner />}
        {status === 'unauthenticated' && (
          <>
            <Button variant="ghost" size="sm">
              <Link href="/login">Login</Link>
            </Button>
            <Button size="sm">Get Notion free</Button>
          </>
        )}
        {status === 'authenticated' && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Enter Notion</Link>
            </Button>
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};
