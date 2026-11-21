import { useState } from "react";
import { Button } from "../components/ui/Button";
import { PlusCircle, Trash2 } from "lucide-react";

export function BusinessHours() {
  // In a real app, you would fetch these from Supabase
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [newDate, setNewDate] = useState("");

  const handleAdd = () => {
    if (newDate && !blockedDates.includes(newDate)) {
      setBlockedDates([...blockedDates, newDate]);
      setNewDate("");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-serif text-elephant mb-6">
        Business Hours & Blocked Dates
      </h1>

      <div className="bg-white-pure p-6 rounded-2xl border border-elephant/10 mb-8">
        <h2 className="font-semibold mb-4">Block a Date (Holiday / Day Off)</h2>
        <div className="flex gap-4">
          <input
            type="date"
            className="p-3 border border-elephant/20 rounded-xl bg-white-soft flex-1"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <Button onClick={handleAdd} className="px-6">
            <PlusCircle size={18} className="mr-2" /> Block Date
          </Button>
        </div>
      </div>

      <div className="bg-white-pure rounded-2xl border border-elephant/10 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-elephant/5 border-b border-elephant/10">
            <tr>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-elephant/10">
            {blockedDates.length === 0 ? (
              <tr>
                <td colSpan={2} className="p-8 text-center text-elephant-muted">
                  No blocked dates.
                </td>
              </tr>
            ) : (
              blockedDates.map((date) => (
                <tr key={date}>
                  <td className="p-4 font-medium">{date}</td>
                  <td className="p-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600"
                      onClick={() =>
                        setBlockedDates(blockedDates.filter((d) => d !== date))
                      }>
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
