import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useAppointments(
  page: number = 0,
  pageSize: number = 10,
  search: string = "",
  date: string = "",
  clientId: string = ""
) {
  return useQuery({
    queryKey: ["appointments", page, pageSize, search, date, clientId],
    queryFn: async () => {
      const res = await fetch(
        `/api/appointments?page=${page}&size=${pageSize}&search=${search}&date=${date}&clientId=${clientId}`
      );
      if (res.status !== 200) {
        toast.error("خطا در دریافت اطلاعات");
      }
      return res.json();
    },
    placeholderData: (prev) => prev,
  });
}
