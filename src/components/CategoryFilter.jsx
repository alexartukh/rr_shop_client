export default function CategoryFilter({ value, onChange }) {
  return (
    <label className="category-filter">
      Поиск по названию
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="E.g. camera"
      />
    </label>
  )
}
