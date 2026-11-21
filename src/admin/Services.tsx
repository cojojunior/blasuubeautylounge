import { allServices as services } from "../content";
import { formatCurrency } from "../lib/currency";

export function Services() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-serif text-elephant mb-6">Service Menu</h1>
      <div className="bg-white-pure rounded-2xl border border-elephant/10 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-elephant/5 border-b border-elephant/10">
            <tr>
              <th className="p-4 font-semibold">Service Name</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Duration</th>
              <th className="p-4 font-semibold">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-elephant/10">
            {services.map((s) => (
              <tr key={s.id} className="hover:bg-elephant/5">
                <td className="p-4 font-medium">{s.name}</td>
                <td className="p-4 text-elephant-muted">{s.category}</td>
                <td className="p-4 text-elephant-muted">
                  {s.durationMinutes} mins
                </td>
                <td className="p-4">{formatCurrency(s.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
