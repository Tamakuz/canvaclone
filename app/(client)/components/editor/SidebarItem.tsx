import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import React from 'react'

interface SidebarItemProps {
  label: string;
  icon: LucideIcon
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem = ({ label, icon: Icon, isActive, onClick }: SidebarItemProps) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick} 
      className={cn(
        "rounded-none flex flex-col items-center justify-center py-10",
        isActive && "bg-muted text-primary"
      )}
    >
      <Icon className="size-5 stroke-2 shrink-0" />
      <span className="mt-2 text-xs">{label}</span>
    </Button>
  );
}

export default SidebarItem