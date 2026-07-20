"use client";

import dynamic from 'next/dynamic';

const CrtPowerOn = dynamic(() => import('@/components/ui/CrtPowerOn').then((m) => m.CrtPowerOn), { ssr: false });
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor').then((m) => m.CustomCursor), { ssr: false });

export function ClientEffects() {
  return (
    <>
      <CrtPowerOn />
      <CustomCursor />
    </>
  );
}
