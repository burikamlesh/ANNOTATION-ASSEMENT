"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <input
      className="w-full border rounded-md p-2"
      placeholder="Search task..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}