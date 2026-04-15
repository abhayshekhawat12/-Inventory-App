export default function AlertBadge({ type, message, time, onRead }) {
  const colors = { LOW_STOCK: '#e74c3c', OVERSTOCK: '#f39c12', INFO: '#3498db' };
  return (
    <div style={{
      background: 'white', borderRadius: '8px', padding: '16px',
      border: '1px solid #ddd', marginBottom: '10px',
      borderLeft: `4px solid ${colors[type] || '#ddd'}`,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }}>
      <div>
        <span style={{ fontSize: '12px', color: colors[type], fontWeight: 'bold' }}>{type}</span>
        <p style={{ color: '#333', marginTop: '4px', fontSize: '14px' }}>{message}</p>
        <p style={{ color: '#999', fontSize: '12px', marginTop: '4px' }}>{time}</p>
      </div>
      <button onClick={onRead} style={{
        background: '#ecf0f1', color: '#666', border: '1px solid #ddd',
        padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px'
      }}>Mark Read</button>
    </div>
  );
}