'use client';
import { useState, useEffect } from 'react';
import AlertBadge from '../../components/AlertBadge';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  const fetchAlerts = () => {
    fetch(`${API}/api/alerts`).then(r => r.json()).then(setAlerts).catch(() => {
      setAlerts([
        { id: 1, type: 'LOW_STOCK', message: 'Wireless Mouse has only 5 units left!', created_at: new Date().toISOString(), is_read: false },
        { id: 2, type: 'LOW_STOCK', message: 'Office Chair stock is below minimum!', created_at: new Date().toISOString(), is_read: false },
        { id: 3, type: 'INFO', message: 'New supplier added successfully', created_at: new Date().toISOString(), is_read: true },
      ]);
    });
  };

  useEffect(() => { fetchAlerts(); }, []);

  const markRead = async (id) => {
    try {
      await fetch(`${API}/api/alerts/${id}/read`, { method: 'PUT' });
      fetchAlerts();
    } catch { setAlerts(alerts.map(a => a.id === id ? {...a, is_read: true} : a)); }
  };

  const unread = alerts.filter(a => !a.is_read);
  const read = alerts.filter(a => a.is_read);

  return (
    <div>
      <h1 style={{ fontSize: '22px', marginBottom: '6px' }}>Alerts</h1>
      <p style={{ color: '#666', marginBottom: '24px', fontSize: '14px' }}>Automated stock and supply chain notifications</p>

      {unread.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '15px', color: '#e74c3c', marginBottom: '12px' }}>⚠️ Unread Alerts ({unread.length})</h2>
          {unread.map(alert => (
            <AlertBadge key={alert.id} type={alert.type} message={alert.message} time={new Date(alert.created_at).toLocaleString()} onRead={() => markRead(alert.id)} />
          ))}
        </div>
      )}

      {read.length > 0 && (
        <div>
          <h2 style={{ fontSize: '15px', color: '#999', marginBottom: '12px' }}>✅ Read ({read.length})</h2>
          {read.map(alert => (
            <div key={alert.id} style={{ opacity: 0.6 }}>
              <AlertBadge type={alert.type} message={alert.message} time={new Date(alert.created_at).toLocaleString()} onRead={() => {}} />
            </div>
          ))}
        </div>
      )}

      {alerts.length === 0 && (
        <div style={{ background: 'white', borderRadius: '8px', padding: '40px', border: '1px solid #ddd', textAlign: 'center' }}>
          <p style={{ fontSize: '32px', marginBottom: '12px' }}>✅</p>
          <p style={{ color: '#999' }}>No alerts — everything is fine!</p>
        </div>
      )}
    </div>
  );
}