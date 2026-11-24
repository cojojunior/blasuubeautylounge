import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { formatCurrency } from "../lib/currency";
import { formatDateDisplay } from "../lib/datetime";
import { DollarSign, TrendingUp, AlertCircle, X } from "lucide-react";
import { Button } from "../components/ui/Button";

export function Payments() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    collected: 0,
    outstanding: 0,
    total: 0,
  });

  // --- SETTLE MODAL STATE ---
  const [settlingId, setSettlingId] = useState<string | null>(null);
  const [settleAmount, setSettleAmount] = useState<number>(0);
const [settleMethod, setSettleMethod] = useState<"cash" | "momo" | "bank">(
  "cash",
);

  const fetchPayments = async () => {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .neq("status", "cancelled")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPayments(data);

      // Calculate stats
      let collected = 0;
      let total = 0;

      data.forEach((apt) => {
        total += Number(apt.total_price);
        if (apt.status === "confirmed") {
          collected += Number(apt.deposit_amount);
        }
      });

      setStats({
        collected,
        outstanding: total - collected,
        total,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // --- HANDLE BALANCE SETTLEMENT ---
  const handleSettleBalance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settlingId) return;

    const apt = payments.find((p) => p.id === settlingId);
    if (!apt) return;

    // Add the new payment to the existing deposit
    const newDepositAmount = Number(apt.deposit_amount) + settleAmount;

    const { error } = await supabase
      .from("appointments")
      .update({
        deposit_amount: newDepositAmount,
        payment_method:
          apt.payment_method === "online" ? settleMethod : apt.payment_method,
      })
      .eq("id", settlingId);

    if (error) {
      alert("Error settling balance: " + error.message);
    } else {
      setSettlingId(null);
      setSettleAmount(0);
      fetchPayments(); // Refresh the list
    }
  };

  if (loading) return <div className="p-8">Loading payments...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-serif text-elephant mb-6">
        Payments & Revenue
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white-pure p-6 rounded-2xl border border-elephant/10">
          <div className="flex items-center gap-3 mb-2 text-green-600">
            <DollarSign size={20} />
            <h2 className="text-sm font-semibold uppercase tracking-wider">
              Collected
            </h2>
          </div>
          <p className="text-3xl font-serif text-elephant">
            {formatCurrency(stats.collected)}
          </p>
        </div>

        <div className="bg-white-pure p-6 rounded-2xl border border-elephant/10">
          <div className="flex items-center gap-3 mb-2 text-blue-600">
            <TrendingUp size={20} />
            <h2 className="text-sm font-semibold uppercase tracking-wider">
              Expected Revenue
            </h2>
          </div>
          <p className="text-3xl font-serif text-elephant">
            {formatCurrency(stats.total)}
          </p>
        </div>

        <div className="bg-white-pure p-6 rounded-2xl border border-elephant/10">
          <div className="flex items-center gap-3 mb-2 text-red-600">
            <AlertCircle size={20} />
            <h2 className="text-sm font-semibold uppercase tracking-wider">
              Outstanding
            </h2>
          </div>
          <p className="text-3xl font-serif text-elephant">
            {formatCurrency(stats.outstanding)}
          </p>
        </div>
      </div>

      {/* Payment Table */}
      <div className="bg-white-pure rounded-2xl border border-elephant/10 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm min-w-[900px]">
            <thead className="bg-elephant/5 border-b border-elephant/10">
              <tr>
                <th className="p-4 font-semibold whitespace-nowrap">Date</th>
                <th className="p-4 font-semibold whitespace-nowrap">
                  Customer
                </th>
                <th className="p-4 font-semibold whitespace-nowrap">Method</th>
                <th className="p-4 font-semibold whitespace-nowrap">Status</th>
                <th className="p-4 font-semibold text-right whitespace-nowrap">
                  Total
                </th>
                <th className="p-4 font-semibold text-right whitespace-nowrap">
                  Paid
                </th>
                <th className="p-4 font-semibold text-right whitespace-nowrap">
                  Balance
                </th>
                <th className="p-4 font-semibold text-right whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-elephant/10">
              {payments.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="p-8 text-center text-elephant-muted">
                    No payment records yet.
                  </td>
                </tr>
              ) : (
                payments.map((apt) => {
                  const balance =
                    Number(apt.total_price) -
                    (apt.status === "confirmed"
                      ? Number(apt.deposit_amount)
                      : 0);
                  return (
                    <tr key={apt.id} className="hover:bg-elephant/5">
                      <td className="p-4 whitespace-nowrap text-elephant-muted">
                        {formatDateDisplay(apt.created_at.split("T")[0])}
                      </td>
                      <td className="p-4 font-medium whitespace-nowrap">
                        {apt.customer_name}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            apt.payment_method === "momo"
                              ? "bg-blue-100 text-blue-700"
                              : apt.payment_method === "cash"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                          }`}>
                          {apt.payment_method?.toUpperCase() || "ONLINE"}
                        </span>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            apt.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : apt.status === "pending_payment"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                          }`}>
                          {apt.status === "pending_payment"
                            ? "UNPAID"
                            : apt.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        {formatCurrency(apt.total_price)}
                      </td>
                      <td className="p-4 text-right text-green-600 font-medium whitespace-nowrap">
                        {apt.status === "confirmed"
                          ? formatCurrency(apt.deposit_amount)
                          : "-"}
                      </td>
                      <td className="p-4 text-right text-red-600 font-medium whitespace-nowrap">
                        {formatCurrency(balance)}
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        {balance > 0 && (
                          <Button
                            size="sm"
                            onClick={() => {
                              setSettlingId(apt.id);
                              setSettleAmount(balance);
                            }}>
                            Settle
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- SETTLE BALANCE MODAL --- */}
      {settlingId && (
        <div className="fixed inset-0 bg-elephant/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white-pure rounded-2xl p-6 w-full max-w-sm shadow-xl relative">
            <button
              onClick={() => setSettlingId(null)}
              className="absolute top-4 right-4 text-elephant-muted">
              <X size={20} />
            </button>
            <h2 className="text-xl font-serif text-elephant mb-4">
              Settle Balance
            </h2>
            <form onSubmit={handleSettleBalance} className="space-y-4">
              <div>
                <label className="block text-xs text-elephant-muted mb-1">
                  Amount to Pay
                </label>
                <input
                  type="number"
                  required
                  className="w-full p-3 border border-elephant/20 rounded-xl bg-white-soft"
                  value={settleAmount}
                  onChange={(e) => setSettleAmount(Number(e.target.value))}
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSettleMethod("cash")}
                  className={`flex-1 py-3 rounded-xl border font-medium text-sm ${settleMethod === "cash" ? "bg-green-50 border-green-600 text-green-700" : "bg-white border-elephant/20"}`}>
                  Cash
                </button>
                <button
                  type="button"
                  onClick={() => setSettleMethod("momo")}
                  className={`flex-1 py-3 rounded-xl border font-medium text-sm ${settleMethod === "momo" ? "bg-blue-50 border-blue-600 text-blue-700" : "bg-white border-elephant/20"}`}>
                  MoMo
                </button>
                <button
                  type="button"
                  onClick={() => setSettleMethod("bank")}
                  className={`flex-1 py-3 rounded-xl border font-medium text-sm ${settleMethod === "bank" ? "bg-gray-100 border-gray-600 text-gray-700" : "bg-white border-elephant/20"}`}>
                  Bank
                </button>
              </div>
              <Button type="submit" className="w-full py-3 mt-4">
                Save Payment
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
