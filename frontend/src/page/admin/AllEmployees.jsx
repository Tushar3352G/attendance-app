import { DataTable } from "@/components/ui/DataTable";
import React from "react";
import { useCreateAttendanceHandler } from "../employee/FormHandlers";
import { useAllEmployees, useEmployeeDelete } from "@/lib/Api";

const AllEmployees = () => {
  const { data, isLoading } = useAllEmployees();
  let path = "/employees";
  const { handleCreateAttendance } = useCreateAttendanceHandler(path);
  const { mutate } = useEmployeeDelete();

  const handleDeleteEmployee = (id) => {
    mutate({ id });
  };

  let dialogData = [
    {
      title: "Employee Name",
      value: "",
    },
    {
      title: "Email",
      value: "",
    },
    {
      title: "Password",
      value: "",
    },
    {
      title: "Department",
      value: "",
    },
    {
      title: "Leave Balance",
      value: "",
    },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Employees List</h1>
      <DataTable
        handleDeleteEmployee={handleDeleteEmployee}
        isDelete={true}
        dialogTitle="Create Employees"
        dialogData={dialogData}
        handler={handleCreateAttendance}
        data={isLoading ? [] : data.employees}
      />
    </div>
  );
};

export default AllEmployees;
