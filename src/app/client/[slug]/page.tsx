'use client';

export default function DynamicClientPage({ params }: { params: { slug: string } }) {
  return <section className="flex flex-col gap-6">Protect client route with dynamic route {params.slug}</section>;
}
