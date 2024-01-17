'use client';

import Link from 'next/link';
import './style.scss';
import { usePathname } from 'next/navigation';

export interface NavLink {
  title: string;
  href: string;
}

const navLinks: NavLink[] = [
  {
    title: 'Calendar',
    href: '/dashboard/calendar',
  },
  {
    title: 'Something',
    href: '/dashboard/something',
  },
];

export default function SideBar() {
  const pathname = usePathname();

  return (
    <div className="sidebar">
      <span className="sidebar__title">Calendary</span>
      <div className="sidebar__nav">
        {navLinks.map((link) => {
          return (
            <Link
              href={link.href}
              className={pathname === link.href ? 'active' : ''}
            >
              {link.title}
            </Link>
          );
        })}
      </div>
      <span className="sidebar__logout">Logout</span>
    </div>
  );
}
