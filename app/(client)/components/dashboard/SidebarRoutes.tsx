'use client';

import { Separator } from '@/components/ui/separator';
import React from 'react'
import SidebarItem from './SidebarItem';
import { usePathname } from 'next/navigation';
import { CreditCard, Home, MessageCircleQuestion } from "lucide-react";

const SidebarRoutes = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-y-4 flex-1">
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href="/"
          icon={Home}
          label="Home"
          isActive={pathname === "/"}
        />
      </ul>
      <Separator />
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href="mailto:support@example.com"
          icon={MessageCircleQuestion}
          label="Get Help"
        />
      </ul>
    </div>
  );
}

export default SidebarRoutes