import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { formatCurrency } from "../lib/currency";
import { formatDateDisplay } from "../lib/datetime";
import { DollarSign, TrendingUp, AlertCircle } from "lucide-react";

export function Payments() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    collected: 0,
    outstanding: 0,
    total: 0,
  });

  useEffect(() => {
    async function fetchPayments() {
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
    }
    fetchPayments();
  }, []);

  if (loading) return <div className="p-8">Loading payments...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-serif text-elephant mb-6">
        Payments & Revenue
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white-pure p-6 rounded-2xl border border-elephant/10">
          <div className="flex items-center gap-3 mb-2 text-green-600">
            <DollarSign size={20} />
            <h2 className="text-sm font-semibold uppercase tracking-wider">
              Deposits Collected
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
              Total Expected Revenue
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
              Outstanding Balances
            </h2>
          </div>
          <p className="text-3xl font-serif text-elephant">
            {formatCurrency(stats.outstanding)}
          </p>
        </div>
      </div>

      {/* Payment Table */}
      {/* Payment Table */}
      <div className="bg-white-pure rounded-2xl border border-elephant/10 overflow-hidden">
        {/* The overflow-x-auto class makes it scrollable horizontally on mobile */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm min-w-[800px]">
            <thead className="bg-elephant/5 border-b border-elephant/10">
              <tr>
                <th className="p-4 font-semibold whitespace-nowrap">Date</th>
                <th className="p-4 font-semibold whitespace-nowrap">
                  Customer
                </th>
                <th className="p-4 font-semibold whitespace-nowrap">Service</th>
                <th className="p-4 font-semibold whitespace-nowrap">Status</th>
                <th className="p-4 font-semibold text-right whitespace-nowrap">
                  Total
                </th>
                <th className="p-4 font-semibold text-right whitespace-nowrap">
                  Deposit
                </th>
                <th className="p-4 font-semibold text-right whitespace-nowrap">
                  Balance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-elephant/10">
              {payments.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
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
                      <td className="p-4 text-elephant-muted whitespace-nowrap">
                        {apt.service_name}
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
                      <td className="p-4 text-right text-elephant-muted whitespace-nowrap">
                        {formatCurrency(balance)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
