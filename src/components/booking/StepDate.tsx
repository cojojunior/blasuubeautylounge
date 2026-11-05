interface StepDateProps {
  date: string;
  onDateChange: (date: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function StepDate({
  date,
  onDateChange,
  onNext,
  onPrev,
}: StepDateProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-serif">Choose a Date</h2>

      <div>
        <label className="block text-sm mb-2 text-elephant-muted">Date</label>
        <input
          type="date"
          required
          className="w-full p-3 border border-elephant/20 rounded-lg bg-white-soft"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
        />
      </div>

      <div className="flex gap-4 mt-6">
        <button
          type="button"
          onClick={onPrev}
          className="w-1/3 px-6 py-3 border border-elephant/20 rounded-full hover:bg-elephant/5 transition-colors">
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="w-2/3 bg-burnt text-white-pure px-6 py-3 rounded-full hover:bg-burnt-dark transition-colors disabled:opacity-50"
          disabled={!date}>
          Continue
        </button>
      </div>
    </div>
  );
}
