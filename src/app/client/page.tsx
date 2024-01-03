'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function ClientPage() {
  useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });

  return <section className="flex flex-col gap-6">Protect client route</section>;
}
