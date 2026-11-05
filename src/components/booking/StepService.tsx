import { services } from "../../content/services";
import { Button } from "../ui/Button";

interface StepServiceProps {
  selectedId: string;
  onChange: (id: string) => void;
  onNext: () => void;
}

export function StepService({
  selectedId,
  onChange,
  onNext,
}: StepServiceProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-serif">Select Service</h2>
      <select
        className="w-full p-3 border border-elephant/20 rounded-lg bg-white-soft focus:ring-burnt focus:border-burnt"
        value={selectedId}
        onChange={(e) => onChange(e.target.value)}>
        {services.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name} - GH₵{s.price}
          </option>
        ))}
      </select>
      <Button type="button" onClick={onNext} className="w-full mt-4">
        Continue to Date
      </Button>
    </div>
  );
}
