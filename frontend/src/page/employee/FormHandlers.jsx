import { useCreate } from "@/lib/Api";

export const useCreateAttendanceHandler = (path) => {
  const { mutate } = useCreate();

  const handleCreateAttendance = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    console.log(formData);

    mutate({ formData, path });
  };

  return { handleCreateAttendance };
};
