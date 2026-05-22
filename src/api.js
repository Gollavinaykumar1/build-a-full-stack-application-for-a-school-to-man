// No need for a separate api.js file as API calls are handled in App.jsx

// Auto-generated missing exports by VIA
export const createItem = async (data) => {
  const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/items`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  if (!r.ok) throw new Error('createItem failed');
  return r.json();
};
export const deleteItem = async (id) => {
  const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/items/${id}`, { method: 'DELETE' });
  if (!r.ok) throw new Error('deleteItem failed');
  return r.json();
};
export const getItems = async (params) => {
  const q = params ? '?' + new URLSearchParams(params).toString() : '';
  const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/items${q}`);
  if (!r.ok) throw new Error('getItems failed');
  return r.json();
};
export const getStats = async () => {
  const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/stats`);
  if (!r.ok) throw new Error('getStats failed');
  return r.json();
};
