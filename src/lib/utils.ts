import { ROLE, RouteWithRoles } from '@/constants';
import { clsx, type ClassValue } from 'clsx';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const locales = ['en', 'ja'] as const;
export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales });

const startRegexRoute = `(${locales.map((locale) => `\\/${locale}`).join('|')}|\\/)?`;

export const findRolesForPath = (inputPath: string): ROLE[] | null => {
  const route = RouteWithRoles.find((route) => {
    const regex = new RegExp(`^${startRegexRoute}${route.path !== '/' ? route.path : ''}$`);
    return regex.test(inputPath);
  });

  return route ? route.roles : null;
};
