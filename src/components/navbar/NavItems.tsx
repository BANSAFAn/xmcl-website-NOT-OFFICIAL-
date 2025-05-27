
import { MainNavItems } from './MainNavItems';
import { NavItemsProps } from './types';

export const NavItems = ({ className }: NavItemsProps = {}) => {
  return (
    <nav className="flex items-center gap-3 justify-center">
      {/* Main navigation items */}
      <MainNavItems />
    </nav>
  );
};
