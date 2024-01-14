import { Metadata } from 'next';
import Link from 'next/link';

import { UserAuthForm } from '@/app/[locale]/(auth)/_components/user-auth-form';
import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

export default function LoginPage() {
  const translation = useTranslations('auth');
  const locale = useLocale();

  return (
    <div className="container flex h-full w-full flex-col items-center justify-center">
      <Link
        href={`/${locale}`}
        className={cn(buttonVariants({ variant: 'ghost' }), 'absolute left-4 top-4 md:left-8 md:top-8')}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          {translation('back')}
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">{translation('welcome_back')}</h1>
          <p className="text-sm text-muted-foreground">{translation('login_description')}</p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href={`${locale}/register`} className="hover:text-brand underline underline-offset-4">
            {translation('don_not_have_account')}
          </Link>
        </p>
      </div>
    </div>
  );
}
