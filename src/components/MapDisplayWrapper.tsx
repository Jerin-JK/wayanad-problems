'use client';

import dynamic from 'next/dynamic';

const MapDisplay = dynamic(() => import('./MapDisplay'), {
  ssr: false,
  loading: () => <div className="h-[250px] w-full bg-zinc-900 rounded-xl animate-pulse flex items-center justify-center text-zinc-500">Loading Map...</div>
});

export default function MapDisplayWrapper(props: { lat: number; lng: number }) {
  return <MapDisplay {...props} />;
}
