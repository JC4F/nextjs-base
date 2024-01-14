import { UserAuthForm } from '@/app/[locale]/(auth)/_components/user-auth-form';
import { buttonVariants, Icons } from '@/components';
import { cn } from '@/lib';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

export const metadata = {
  title: 'Create an account',
  description: 'Create an account to get started.',
};

export default function RegisterPage() {
  const translation = useTranslations('auth');
  const locale = useLocale();

  return (
    <div className="container grid h-full w-full flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href={`/${locale}/login`}
        className={cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')}
      >
        {translation('login')}
      </Link>
      <div className="hidden h-full bg-muted lg:block" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">{translation('create_account')}</h1>
            <p className="text-sm text-muted-foreground">{translation('register_description')}</p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            {translation('agree_condition')}
            <Link href="/terms" className="hover:text-brand underline underline-offset-4">
              {translation('term')}
            </Link>
            -
            <Link href="/privacy" className="hover:text-brand underline underline-offset-4">
              {translation('privacy')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
