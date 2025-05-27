// ✅ frontend/components/TableFilter.jsx
export default function TableFilter({ type, value, onChange, options = [], name, label }) {
  const className = `filter_${type}_${name}`

  if (type === 'text') {
    return (
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className={`px-2 py-1 border rounded text-sm ${className}`}
        placeholder={`${label} ara`}
      />
    )
  }

  if (type === 'select') {
    return (
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className={`px-2 py-1 border rounded text-sm ${className}`}
      >
        <option value="">{label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    )
  }

  return null
}
