
import { TooltipProvider } from "@/components/ui/tooltip";
import { MainNavItems } from './MainNavItems';
import { ResourcesDropdown } from './ResourcesDropdown';
import { SupportDropdown } from './SupportDropdown';
import { NavItemsProps } from './types';

export const NavItems = ({ className }: NavItemsProps = {}) => {
  return (
    <nav className="flex items-center gap-3 justify-center">
      <TooltipProvider>
        {/* Main navigation items */}
        <MainNavItems />
        
        {/* Resources dropdown */}
        <ResourcesDropdown />
        
        {/* Support dropdown */}
        <SupportDropdown />
      </TooltipProvider>
    </nav>
  );
};
