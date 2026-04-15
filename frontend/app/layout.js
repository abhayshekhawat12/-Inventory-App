import './globals.css';
import Sidebar from '../components/Sidebar';

export const metadata = { title: 'Inventory System' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <main style={{ flex: 1, padding: '24px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1 }}>
              {children}
            </div>
            <footer style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #eaeaea', textAlign: 'center', color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
              <p><strong>Founder:</strong> Abhay Shekhawat</p>
              <p><strong>College:</strong> Arya College</p>
              <p><strong>Email:</strong> <a href="mailto:abhayshekhawat57@gmail.com" style={{ color: '#0070f3', textDecoration: 'none' }}>abhayshekhawat57@gmail.com</a></p>
            </footer>
          </main>
        </div>
      </body>
    </html>
  );
}