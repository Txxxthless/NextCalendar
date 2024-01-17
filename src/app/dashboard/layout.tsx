import { ReactNode } from 'react';
import SideBar from '../components/sidebar/sidebar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SideBar />
      <div className="dashboard">{children}</div>
    </>
  );
}
