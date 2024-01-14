'use client';

import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

import { UserAvatar } from '@/app/[locale]/_components/user-avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { findRolesForPath } from '@/lib';
import { useLocale, useTranslations } from 'next-intl';

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, 'name' | 'image' | 'email' | 'role'>;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const translation = useTranslations();
  const locale = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={{ name: user.name || null, image: user.image || null }} className="h-8 w-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>}
          </div>
        </div>
        <DropdownMenuSeparator />
        {(findRolesForPath('/client')?.length === 0 || findRolesForPath('/client')?.includes(user.role)) && (
          <DropdownMenuItem asChild>
            <Link className="cursor-pointer" href={`/${locale}/client`}>
              {translation('route.client')}
            </Link>
          </DropdownMenuItem>
        )}
        {(findRolesForPath('/client/123')?.length === 0 || findRolesForPath('/client/123')?.includes(user.role)) && (
          <DropdownMenuItem asChild>
            <Link className="cursor-pointer" href={`/${locale}/client/123`}>
              {translation('route.nested_client')}
            </Link>
          </DropdownMenuItem>
        )}
        {(findRolesForPath('/server')?.length === 0 || findRolesForPath('/server')?.includes(user.role)) && (
          <DropdownMenuItem asChild>
            <Link className="cursor-pointer" href={`/${locale}/server`}>
              {translation('route.server')}
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/${locale}/login`,
            });
          }}
        >
          {translation('home.sign_out')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
