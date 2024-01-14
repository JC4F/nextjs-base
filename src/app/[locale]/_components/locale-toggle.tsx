'use client';

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components';
import { usePathname, useRouter } from '@/lib';
import { Languages } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function LocaleToggle() {
  const translation = useTranslations('home');
  const pathName = usePathname();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push(pathName, { locale: 'en' })}>
          {translation('english')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(pathName, { locale: 'ja' })}>
          {translation('japanese')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
