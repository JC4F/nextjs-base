'use client';

import Link from 'next/link';

import { useScrollTop } from '@/hooks';
import { cn, usePathname } from '@/lib';

import { Button, Spinner } from '@/components';
import { useSession } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { LocaleToggle } from './locale-toggle';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';
import { UserAccountNav } from './user-account-nav';

export const Navbar = () => {
  const translation = useTranslations('home');
  const locale = useLocale();
  const pathName = usePathname();
  const { status, data: session } = useSession();
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        'z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6',
        scrolled && 'border-b shadow-sm',
      )}
    >
      <Link href={`/${locale}`}>
        <Logo />
      </Link>

      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {status === 'loading' && <Spinner />}
        {status === 'unauthenticated' && !['/login', '/register'].includes(pathName) && (
          <>
            <Button variant="ghost" size="sm">
              <Link href={`/${locale}/login`}>{translation('login')}</Link>
            </Button>
            <Button size="sm">{translation('get_sale')}</Button>
          </>
        )}
        {status === 'authenticated' && (
          <>
            <UserAccountNav
              user={{
                name: session.user?.name,
                image: session.user?.image,
                email: session.user?.email,
                role: session.user?.role,
              }}
            />
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/${locale}/client`}>{translation('enter_sale')}</Link>
            </Button>
          </>
        )}
        <ThemeToggle />
        <LocaleToggle />
      </div>
    </div>
  );
};
