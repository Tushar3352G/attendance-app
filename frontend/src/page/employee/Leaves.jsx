import { DataTable } from "@/components/ui/DataTable";
import { useLeaveRecord } from "@/lib/Api";
import React from "react";
import { useCreateAttendanceHandler } from "./FormHandlers";

const Leaves = () => {
  const { data, isLoading } = useLeaveRecord();
  let path = "/leave"
  const { handleCreateAttendance } = useCreateAttendanceHandler(path);
  let dialogData = [
    {
      title: "leaveType",
      value: ["sick", "vacation", "casual", "other"],
    },
    {
      title: "Start Date",
      value: "03-05-2025",
    },
    {
      title: "End Date",
      value: "08-05-2025",
    },
  ];
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Employee Leaves</h1>
      <DataTable
        dialogTitle="Add Your Leave"
        dialogData={dialogData}
        handler={handleCreateAttendance}
        data={isLoading ? [] : data.leaves}
      />
    </div>
  );
};

export default Leaves;
