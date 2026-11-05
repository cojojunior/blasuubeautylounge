interface StepTimeProps {
  time: string;
  onTimeChange: (time: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function StepTime({
  time,
  onTimeChange,
  onNext,
  onPrev,
}: StepTimeProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-serif">Choose a Time</h2>

      <div>
        <label className="block text-sm mb-2 text-elephant-muted">
          Available Slots
        </label>
        <select
          required
          className="w-full p-3 border border-elephant/20 rounded-lg bg-white-soft"
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}>
          <option value="">Select a time...</option>
          <option value="09:00">09:00 AM</option>
          <option value="10:00">10:00 AM</option>
          <option value="11:00">11:00 AM</option>
          <option value="13:00">01:00 PM</option>
          <option value="14:00">02:00 PM</option>
          <option value="15:00">03:00 PM</option>
        </select>
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
          disabled={!time}>
          Continue
        </button>
      </div>
    </div>
  );
}
