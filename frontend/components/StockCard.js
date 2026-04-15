export default function StockCard({ title, value, icon, color }) {
  return (
    <div style={{
      background: 'white', borderRadius: '8px', padding: '20px',
      border: '1px solid #ddd', flex: 1, minWidth: '180px',
      borderTop: `4px solid ${color}`
    }}>
      <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>{icon} {title}</p>
      <p style={{ fontSize: '26px', fontWeight: 'bold', color: '#333' }}>{value}</p>
    </div>
  );
}