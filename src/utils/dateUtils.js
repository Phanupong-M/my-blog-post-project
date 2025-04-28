import { format } from "date-fns";

export const formatDate = (isoDate) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  return format(date, "dd MMMM yyyy");
}; 