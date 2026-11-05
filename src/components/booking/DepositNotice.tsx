import { policies } from "../../content/policies/bookingFee";

export function DepositNotice() {
  return (
    <div className="bg-burnt/5 p-4 rounded-lg border border-burnt/20 text-sm">
      <p className="font-medium text-elephant mb-2">Non-Refundable Notice</p>
      <p className="text-elephant-muted mb-3">{policies.bookingFee.content}</p>
    </div>
  );
}
