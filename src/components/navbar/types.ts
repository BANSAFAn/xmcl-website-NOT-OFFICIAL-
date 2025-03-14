
import { ReactNode } from 'react';

export interface NavItem {
  icon: ReactNode;
  link: string;
  external: boolean;
  label: string;
  index: number;
}

export interface NavItemsProps {
  className?: string;
}
