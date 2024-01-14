import { Poppins } from 'next/font/google';
import Image from 'next/image';

import { cn } from '@/lib';
import { useTranslations } from 'next-intl';

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export const Logo = () => {
  const translation = useTranslations('home');

  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image src="/logo.svg" height="40" width="40" alt="Logo" className="dark:hidden" />
      <Image src="/logo-dark.svg" height="40" width="40" alt="Logo" className="hidden dark:block" />
      <p className={cn('font-semibold', font.className)}>{translation('title')}</p>
    </div>
  );
};
