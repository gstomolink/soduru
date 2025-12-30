'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  icon: string;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: '🔍', label: 'Search', path: '/search' },
  { icon: '👍', label: 'Matches', path: '/matchings' },
  { icon: '💬', label: 'Messages', path: '/messages' },
  { icon: '❤️', label: 'Favorites', path: '/favorites' },
  { icon: '👤', label: 'My Page', path: '/account' },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 bg-white border-t border-gray-200 z-50" style={{minWidth: '375px'}}>
      <div className=" mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.path === '/search' && pathname === '/');
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full ${
                isActive ? 'text-red-500' : 'text-gray-500'
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

