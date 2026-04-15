'use client';
import { useState, useEffect } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', rating: '5' });
  const [status, setStatus] = useState('');

  const fetchSuppliers = () => {
    fetch(`${API}/api/suppliers`).then(r => r.json()).then(setSuppliers).catch(() => {});
  };

  useEffect(() => { fetchSuppliers(); }, []);

  const handleAdd = async () => {
    try {
      await fetch(`${API}/api/suppliers`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      setStatus('✅ Supplier added!');
      setForm({ name: '', email: '', phone: '', address: '', rating: '5' });
      fetchSuppliers();
    } catch { setStatus('⚠️ Could not connect to backend'); }
  };

  const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' };
  const labelStyle = { fontSize: '13px', color: '#555', marginBottom: '4px', display: 'block' };

  const sampleSuppliers = [
    { id: 1, name: 'TechSupply Co.', email: 'contact@techsupply.com', phone: '+1-555-0101', rating: 5 },
    { id: 2, name: 'Global Parts Inc.', email: 'info@globalparts.com', phone: '+1-555-0102', rating: 4 },
    { id: 3, name: 'FastShip Ltd.', email: 'orders@fastship.com', phone: '+1-555-0103', rating: 3 },
  ];

  const displaySuppliers = suppliers.length > 0 ? suppliers : sampleSuppliers;

  return (
    <div>
      <h1 style={{ fontSize: '22px', marginBottom: '6px' }}>Supplier Management</h1>
      <p style={{ color: '#666', marginBottom: '24px', fontSize: '14px' }}>Manage your supply chain partners</p>

      <div style={{ background: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #ddd', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '16px', marginBottom: '16px' }}>Add New Supplier</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          {[['name','Supplier Name'],['email','Email'],['phone','Phone'],['address','Address']].map(([key, label]) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              <input style={inputStyle} value={form[key]} onChange={e => setForm({...form, [key]: e.target.value})} placeholder={label} />
            </div>
          ))}
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Rating (1-5)</label>
          <input style={{...inputStyle, width: '100px'}} type="number" min="1" max="5" value={form.rating} onChange={e => setForm({...form, rating: e.target.value})} />
        </div>
        {status && <p style={{ color: status.includes('✅') ? 'green' : 'orange', marginBottom: '12px', fontSize: '14px' }}>{status}</p>}
        <button onClick={handleAdd} style={{ background: '#3498db', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>
          Add Supplier
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #ddd' }}>
        <h2 style={{ fontSize: '16px', marginBottom: '16px' }}>All Suppliers ({displaySuppliers.length})</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              {['Name', 'Email', 'Phone', 'Rating'].map(h => (
                <th key={h} style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #dee2e6', color: '#555' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displaySuppliers.map((s, i) => (
              <tr key={s.id} style={{ background: i % 2 === 0 ? 'white' : '#f8f9fa' }}>
                <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6', fontWeight: 'bold' }}>{s.name}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6', color: '#666' }}>{s.email}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6', color: '#666' }}>{s.phone}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6', color: '#f39c12' }}>{'⭐'.repeat(s.rating)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}