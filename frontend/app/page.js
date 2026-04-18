'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StockCard from '../components/StockCard';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Dashboard() {
  const [summary, setSummary] = useState({ total_items: 0, low_stock: 0, total_value: 0, categories: 0 });
  const [inventory, setInventory] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      router.push('/login');
    } else {
      fetch(`${API}/api/inventory/summary`).then(r => r.json()).then(setSummary).catch(() => {});
      fetch(`${API}/api/inventory`).then(r => r.json()).then(setInventory).catch(() => {});
    }
  }, [router]);

  const displayInventory = inventory;
  const displaySummary = summary;

  return (
    <div>
      <h1 style={{ fontSize: '22px', marginBottom: '6px' }}>Dashboard</h1>
      <p style={{ color: '#666', marginBottom: '24px', fontSize: '14px' }}>Welcome to your inventory management system</p>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
        <StockCard title="Total Items" value={displaySummary.total_items} icon="📦" color="#3498db" />
        <StockCard title="Low Stock" value={displaySummary.low_stock} icon="⚠️" color="#e74c3c" />
        <StockCard title="Total Value" value={`₹${displaySummary.total_value}`} icon="💰" color="#2ecc71" />
        <StockCard title="Categories" value={displaySummary.categories} icon="🏷️" color="#9b59b6" />
      </div>

      <div style={{ background: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #ddd' }}>
        <h2 style={{ fontSize: '16px', marginBottom: '16px' }}>Stock Overview</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              {['Product', 'Category', 'Stock', 'Min Stock', 'Price', 'Status'].map(h => (
                <th key={h} style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #dee2e6', color: '#555' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayInventory.map((item, i) => (
              <tr key={item.id} style={{ background: i % 2 === 0 ? 'white' : '#f8f9fa' }}>
                <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>{item.name}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6', color: '#666' }}>{item.category}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6', fontWeight: 'bold' }}>{item.stock_level}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6', color: '#666' }}>{item.min_stock}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6', color: '#666' }}>₹{item.unit_price}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>
                  <span style={{
                    background: item.stock_level <= item.min_stock ? '#fdecea' : '#eafaf1',
                    color: item.stock_level <= item.min_stock ? '#e74c3c' : '#27ae60',
                    padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold'
                  }}>
                    {item.stock_level <= item.min_stock ? '⚠️ Low' : '✅ OK'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}