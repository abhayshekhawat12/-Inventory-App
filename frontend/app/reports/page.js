'use client';
import { useState, useEffect } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Reports() {
  const [stockData, setStockData] = useState([]);
  const [demandData, setDemandData] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/reports/stock`).then(r => r.json()).then(setStockData).catch(() => {
      setStockData([
        { category: 'Electronics', total_stock: 150, total_value: 74850 },
        { category: 'Furniture', total_stock: 45, total_value: 26910 },
        { category: 'Stationery', total_stock: 500, total_value: 6000 },
      ]);
    });
    fetch(`${API}/api/reports/demand`).then(r => r.json()).then(setDemandData).catch(() => {
      setDemandData([
        { name: 'Wireless Mouse', stock_level: 5, min_stock: 15 },
        { name: 'Office Chair', stock_level: 8, min_stock: 10 },
        { name: 'Laptop Pro X', stock_level: 45, min_stock: 10 },
      ]);
    });
  }, []);

  const handleExport = () => {
    const csv = ['Category,Total Stock,Total Value', ...stockData.map(r => `${r.category},${r.total_stock},${r.total_value}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory_report.csv';
    a.click();
  };

  return (
    <div>
      <h1 style={{ fontSize: '22px', marginBottom: '6px' }}>Reports</h1>
      <p style={{ color: '#666', marginBottom: '24px', fontSize: '14px' }}>Inventory and demand forecasting reports</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div style={{ background: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #ddd' }}>
          <h2 style={{ fontSize: '15px', marginBottom: '16px' }}>📊 Stock by Category</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                {['Category', 'Stock', 'Value'].map(h => (
                  <th key={h} style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #dee2e6', color: '#555' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stockData.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'white' : '#f8f9fa' }}>
                  <td style={{ padding: '8px', borderBottom: '1px solid #dee2e6' }}>{row.category}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #dee2e6', fontWeight: 'bold' }}>{row.total_stock}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #dee2e6', color: '#27ae60' }}>${row.total_value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #ddd' }}>
          <h2 style={{ fontSize: '15px', marginBottom: '16px' }}>📉 Low Stock Items</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                {['Item', 'Stock', 'Min Required'].map(h => (
                  <th key={h} style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #dee2e6', color: '#555' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {demandData.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'white' : '#f8f9fa' }}>
                  <td style={{ padding: '8px', borderBottom: '1px solid #dee2e6' }}>{row.name}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #dee2e6', color: row.stock_level <= row.min_stock ? '#e74c3c' : '#27ae60', fontWeight: 'bold' }}>{row.stock_level}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #dee2e6', color: '#666' }}>{row.min_stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button onClick={handleExport} style={{ background: '#27ae60', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>
        ⬇️ Export Report as CSV
      </button>
    </div>
  );
}