// src/components/Layout/Layout.jsx
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children, principal, onLogout }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header principal={principal} onLogout={onLogout} />
        <main className="p-6 overflow-y-auto bg-white flex-1">{children}</main>
      </div>
    </div>
  );
}
