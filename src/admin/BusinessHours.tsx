import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Button } from "../components/ui/Button";
import { PlusCircle, Trash2, Loader2 } from "lucide-react";
import { formatDateDisplay } from "../lib/datetime";

export function BusinessHours() {
  // --- STATE ---
  const [blockedDates, setBlockedDates] = useState<any[]>([]);
  const [newDate, setNewDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- FETCH BLOCKED DATES ---
  const fetchBlockedDates = async () => {
    // We only fetch dates where blocked_time is null (whole days)
    const { data, error } = await supabase
      .from("blocked_slots")
      .select("id, blocked_date")
      .is("blocked_time", null)
      .order("blocked_date", { ascending: true });

    if (!error && data) {
      setBlockedDates(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlockedDates();
  }, []);

  // --- BLOCK A DATE ---
  const handleAdd = async () => {
    if (!newDate) return;

    // Check if already blocked to prevent duplicates
    if (blockedDates.some((b) => b.blocked_date === newDate)) {
      alert("This date is already blocked.");
      return;
    }

    setIsSubmitting(true);

    // We use the secure RPC function to bypass RLS for inserting
    const { error } = await supabase.rpc("admin_add_block", {
      p_date: newDate,
      p_time: null, // Null time means the whole day is blocked
      p_reason: "Holiday / Day Off",
    });

    if (error) {
      alert("Error blocking date: " + error.message);
    } else {
      setNewDate("");
      fetchBlockedDates(); // Refresh the list
    }
    setIsSubmitting(false);
  };

  // --- UNBLOCK A DATE ---
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to unblock this date?")) return;

    const { error } = await supabase
      .from("blocked_slots")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Error unblocking date: " + error.message);
    } else {
      fetchBlockedDates(); // Refresh the list
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-serif text-elephant mb-6">
        Business Hours & Blocked Dates
      </h1>

      {/* --- ADD BLOCK FORM --- */}
      <div className="bg-white-pure p-6 rounded-2xl border border-elephant/10 mb-8">
        <h2 className="font-semibold mb-4 text-elephant">
          Block a Date (Holiday / Day Off)
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="date"
            className="p-3 border border-elephant/20 rounded-xl bg-white-soft flex-1 outline-none focus:border-burnt"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <Button
            onClick={handleAdd}
            className="px-6 py-3"
            disabled={isSubmitting || !newDate}>
            {isSubmitting ? (
              <Loader2 size={18} className="mr-2 animate-spin" />
            ) : (
              <PlusCircle size={18} className="mr-2" />
            )}
            {isSubmitting ? "Blocking..." : "Block Date"}
          </Button>
        </div>
      </div>

      {/* --- BLOCKED DATES LIST --- */}
      <div className="bg-white-pure rounded-2xl border border-elephant/10 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm min-w-[400px]">
            <thead className="bg-elephant/5 border-b border-elephant/10">
              <tr>
                <th className="p-4 font-semibold text-elephant">Date</th>
                <th className="p-4 font-semibold text-right text-elephant">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-elephant/10">
              {loading ? (
                <tr>
                  <td
                    colSpan={2}
                    className="p-8 text-center text-elephant-muted">
                    Loading blocked dates...
                  </td>
                </tr>
              ) : blockedDates.length === 0 ? (
                <tr>
                  <td
                    colSpan={2}
                    className="p-8 text-center text-elephant-muted">
                    No blocked dates.
                  </td>
                </tr>
              ) : (
                blockedDates.map((item) => (
                  <tr key={item.id} className="hover:bg-elephant/5">
                    <td className="p-4 font-medium text-elephant">
                      {formatDateDisplay(item.blocked_date)}
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleDelete(item.id)}>
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
    </div>
  );
}
