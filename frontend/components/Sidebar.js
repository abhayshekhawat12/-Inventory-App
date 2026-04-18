'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { path: '/', label: 'Dashboard', icon: '🏠' },
  { path: '/inventory', label: 'Inventory', icon: '📦' },
  { path: '/suppliers', label: 'Suppliers', icon: '🏭' },
  { path: '/alerts', label: 'Alerts', icon: '🔔' },
  { path: '/reports', label: 'Reports', icon: '📄' },
];

export default function Sidebar() {
  const pathname = usePathname();
  if (pathname === '/login') return null;

  return (
    <div style={{ width: '200px', background: '#2c3e50', minHeight: '100vh', padding: '20px 0', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '0 20px 20px 20px', borderBottom: '1px solid #34495e' }}>
        <h2 style={{ color: 'white', fontSize: '16px' }}>📦 Inventory App</h2>
      </div>
      <nav style={{ marginTop: '10px' }}>
        {links.map(link => (
          <Link key={link.path} href={link.path} style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '12px 20px',
              background: pathname === link.path ? '#3498db' : 'transparent',
              color: 'white',
              fontSize: '14px',
              cursor: 'pointer',
              borderLeft: pathname === link.path ? '4px solid #fff' : '4px solid transparent'
            }}>
              {link.icon} {link.label}
            </div>
          </Link>
        ))}
      </nav>
      <div style={{ marginTop: 'auto', padding: '20px' }}>
        <button 
          onClick={() => {
            localStorage.removeItem('isLoggedIn');
            window.location.href = '/login';
          }}
          style={{ width: '100%', padding: '10px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}