'use client';
import { useState, useEffect } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', stock_level: '', min_stock: '', max_stock: '', unit_price: '' });
  const [status, setStatus] = useState('');

  const fetchItems = () => {
    fetch(`${API}/api/inventory`).then(r => r.json()).then(setItems).catch(() => {});
  };

  useEffect(() => { fetchItems(); }, []);

  const handleAdd = async () => {
    try {
      await fetch(`${API}/api/inventory`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      setStatus('✅ Item added successfully!');
      setForm({ name: '', category: '', stock_level: '', min_stock: '', max_stock: '', unit_price: '' });
      fetchItems();
    } catch { setStatus('⚠️ Could not connect to backend'); }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/api/inventory/${id}`, { method: 'DELETE' });
      fetchItems();
    } catch {}
  };

  const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' };
  const labelStyle = { fontSize: '13px', color: '#555', marginBottom: '4px', display: 'block' };

  return (
    <div>
      <h1 style={{ fontSize: '22px', marginBottom: '6px' }}>Inventory Management</h1>
      <p style={{ color: '#666', marginBottom: '24px', fontSize: '14px' }}>Add and manage your stock items</p>

      <div style={{ background: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #ddd', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '16px', marginBottom: '16px' }}>Add New Item</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          {[['name','Product Name'],['category','Category'],['stock_level','Stock Level'],['min_stock','Min Stock'],['max_stock','Max Stock'],['unit_price','Unit Price (₹)']].map(([key, label]) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              <input style={inputStyle} value={form[key]} onChange={e => setForm({...form, [key]: e.target.value})} placeholder={label} />
            </div>
          ))}
        </div>
        {status && <p style={{ color: status.includes('✅') ? 'green' : 'orange', marginBottom: '12px', fontSize: '14px' }}>{status}</p>}
        <button onClick={handleAdd} style={{ background: '#3498db', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>
          Add Item
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #ddd' }}>
        <h2 style={{ fontSize: '16px', marginBottom: '16px' }}>All Items ({items.length})</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              {['Name','Category','Stock','Min','Price','Action'].map(h => (
                <th key={h} style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #dee2e6', color: '#555' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id} style={{ background: i % 2 === 0 ? 'white' : '#f8f9fa' }}>
                <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>{item.name}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6', color: '#666' }}>{item.category}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6', color: item.stock_level <= item.min_stock ? '#e74c3c' : '#27ae60', fontWeight: 'bold' }}>{item.stock_level}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6', color: '#666' }}>{item.min_stock}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6', color: '#666' }}>₹{item.unit_price}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>
                  <button onClick={() => handleDelete(item.id)} style={{ background: '#fdecea', color: '#e74c3c', border: '1px solid #e74c3c', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Delete</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={6} style={{ padding: '20px', textAlign: 'center', color: '#999' }}>No items yet. Add your first item above!</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}