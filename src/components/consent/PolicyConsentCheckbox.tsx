interface PolicyConsentCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function PolicyConsentCheckbox({
  id,
  label,
  checked,
  onChange,
}: PolicyConsentCheckboxProps) {
  return (
    <label htmlFor={id} className="flex items-start gap-3 cursor-pointer mt-4">
      <input
        id={id}
        type="checkbox"
        required
        className="mt-1"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-xs text-elephant-muted">{label}</span>
    </label>
  );
}
