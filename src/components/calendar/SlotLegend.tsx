export function SlotLegend() {
  return (
    <div className="flex items-center gap-6 mt-6 justify-center">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded border border-burnt/20 bg-burnt/5"></div>
        <span className="text-xs text-elephant-muted">Available</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded border border-elephant/5 bg-elephant/5"></div>
        <span className="text-xs text-elephant-muted">Booked</span>
      </div>
    </div>
  );
}
