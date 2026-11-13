export const formatDateForDB = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatDateDisplay = (dateString: string) => {
  if (!dateString) return "";
  // Add 'T00:00:00' to prevent timezone issues from shifting the day
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatTimeDisplay = (timeString: string) => {
  if (!timeString) return "";
  const [hour, minute] = timeString.split(":");
  const displayHour = parseInt(hour) > 12 ? parseInt(hour) - 12 : hour;
  const ampm = parseInt(hour) >= 12 ? "PM" : "AM";
  return `${displayHour}:${minute} ${ampm}`;
};
