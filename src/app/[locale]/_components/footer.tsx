import { Button } from '@/components';

import { useTranslations } from 'next-intl';
import { Logo } from './logo';

export const Footer = () => {
  const translation = useTranslations('home');

  return (
    <div className="flex items-center w-full p-6 bg-background z-50 dark:bg-[#1F1F1F]">
      <Logo />
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
        <Button variant="ghost" size="sm">
          {translation('privacy')}
        </Button>
        <Button variant="ghost" size="sm">
          {translation('term')}
        </Button>
      </div>
    </div>
  );
};
