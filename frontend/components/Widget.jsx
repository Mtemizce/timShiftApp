// ✅ frontend/components/Widget.jsx

export default function Widget({ title, value, icon, color = 'bg-blue-600' }) {
  return (
    <div className={`flex items-center justify-between p-4 rounded shadow text-white ${color}`}>
      <div>
        <p className="text-sm opacity-80">{title}</p>
        <h3 className="text-xl font-bold">{value}</h3>
      </div>
      <div className="text-3xl opacity-30">
        {icon}
      </div>
    </div>
  )
}
