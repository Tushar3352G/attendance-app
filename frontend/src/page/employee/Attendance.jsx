import { DataTable } from "@/components/ui/DataTable";
import { useAttendanceRecord } from "@/lib/Api";
import React from "react";
import { useCreateAttendanceHandler } from "./FormHandlers";

const Attendance = () => {
  const { data, isLoading } = useAttendanceRecord();
  let path = "/attendance"
  const { handleCreateAttendance } = useCreateAttendanceHandler(
    (path)
  );
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Employee Attendance</h1>
      <DataTable
        handler={handleCreateAttendance}
        data={isLoading ? [] : data.attendance}
      />
    </div>
  );
};

export default Attendance;
