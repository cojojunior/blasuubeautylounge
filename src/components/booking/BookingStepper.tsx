interface BookingStepperProps {
  currentStep: number;
}

const steps = ["Service", "Date", "Time", "Details"];

export function BookingStepper({ currentStep }: BookingStepperProps) {
  return (
    <div className="flex justify-between mb-8 pb-4 border-b border-elephant/10">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep >= stepNumber;
        return (
          <span
            key={label}
            className={`text-sm font-medium ${
              isActive ? "text-burnt" : "text-elephant-muted"
            }`}>
            {stepNumber}. {label}
          </span>
        );
      })}
    </div>
  );
}
