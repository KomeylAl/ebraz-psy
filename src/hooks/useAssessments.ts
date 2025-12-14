import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useAssessments(
  page: number = 0,
  pageSize: number = 10,
  search: string = "",
  date: string = ""
) {
  return useQuery({
    queryKey: ["assessments", page, pageSize, search, date],
    queryFn: async () => {
      const res = await fetch(
        `/api/assessments?page=${page}&size=${pageSize}&search=${search}&date=${date}`
      );
      if (res.status !== 200) {
        toast.error("خطا در دریافت اطلاعات");
      }
      return res.json();
    },
    placeholderData: (prev) => prev,
  });
}
