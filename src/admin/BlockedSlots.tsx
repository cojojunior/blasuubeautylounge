import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "../lib/supabase";
import { Button } from "../components/ui/Button";
import { PlusCircle, Trash2 } from "lucide-react";
import { formatDateDisplay } from "../lib/datetime";

export function BlockedSlots() {
  const [blockedSlots, setBlockedSlots] = useState<any[]>([]);
  const [formData, setFormData] = useState({ date: "", time: "", reason: "" });
  const [loading, setLoading] = useState(true);

  const fetchBlockedSlots = async () => {
    const { data, error } = await supabase
      .from("blocked_slots")
      .select("*")
      .order("blocked_date", { ascending: true });

    if (!error && data) setBlockedSlots(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlockedSlots();
  }, []);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();

    // Convert "Whole Day" to null for the DB
    const timeToBlock = formData.time === "" ? null : formData.time;

    // Call the secure function we just created
    const { error } = await supabase.rpc("admin_add_block", {
      p_date: formData.date,
      p_time: timeToBlock,
      p_reason: formData.reason,
    });

    if (error) {
      alert("Error blocking slot: " + error.message);
    } else {
      setFormData({ date: "", time: "", reason: "" });
      fetchBlockedSlots();
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Remove this block?")) return;

    // ⚠️ FIX: Use secure RPC to bypass RLS for deleting
    const { error } = await supabase.rpc("admin_delete_block", { p_id: id });

    if (!error) fetchBlockedSlots();
    else alert("Error deleting: " + error.message);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-serif text-elephant mb-6">
        Blocked Slots & Holidays
      </h1>

      <div className="bg-white-pure p-6 rounded-2xl border border-elephant/10 mb-8">
        <h2 className="font-semibold mb-4 text-lg">Block a Time</h2>
        <form
          onSubmit={handleAdd}
          className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-xs text-elephant-muted mb-1">
              Date
            </label>
            <input
              required
              type="date"
              className="w-full p-3 border border-elephant/20 rounded-xl bg-white-soft"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-elephant-muted mb-1">
              Time (Leave blank for whole day)
            </label>
            <select
              className="w-full p-3 border border-elephant/20 rounded-xl bg-white-soft"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }>
              <option value="">Whole Day</option>
              <option value="09:00">09:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="13:00">01:00 PM</option>
              <option value="14:00">02:00 PM</option>
              <option value="15:00">03:00 PM</option>
            </select>
          </div>
          <div className="flex-[2]">
            <label className="block text-xs text-elephant-muted mb-1">
              Reason (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Public Holiday, Staff Training"
              className="w-full p-3 border border-elephant/20 rounded-xl bg-white-soft"
              value={formData.reason}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
            />
          </div>
          <Button type="submit" className="py-3 px-6 h-[46px]">
            <PlusCircle size={18} className="mr-2" /> Add Block
          </Button>
        </form>
      </div>

      <div className="bg-white-pure rounded-2xl border border-elephant/10 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-elephant/5 border-b border-elephant/10">
            <tr>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Time</th>
              <th className="p-4 font-semibold">Reason</th>
              <th className="p-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-elephant/10">
            {loading ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-elephant-muted">
                  Loading...
                </td>
              </tr>
            ) : blockedSlots.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-elephant-muted">
                  No blocked slots.
                </td>
              </tr>
            ) : (
              blockedSlots.map((slot) => (
                <tr key={slot.id} className="hover:bg-elephant/5">
                  <td className="p-4 font-medium">
                    {formatDateDisplay(slot.blocked_date)}
                  </td>
                  <td className="p-4 text-elephant-muted">
                    {slot.blocked_time
                      ? slot.blocked_time.substring(0, 5)
                      : "All Day"}
                  </td>
                  <td className="p-4 text-elephant-muted">
                    {slot.reason || "-"}
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600"
                      onClick={() => handleDelete(slot.id)}>
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
