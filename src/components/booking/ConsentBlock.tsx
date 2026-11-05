interface ConsentBlockProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function ConsentBlock({ checked, onChange }: ConsentBlockProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer mt-4">
      <input
        type="checkbox"
        required
        className="mt-1"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-xs text-elephant-muted">
        I accept the Terms & Conditions, Booking Fee Policy, and Cancellation
        Policy.
      </span>
    </label>
  );
}
