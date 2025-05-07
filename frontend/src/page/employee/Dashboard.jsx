import { Charts } from "@/components/ui/Charts";
import { useAuth } from "@/Context/AuthProvider";
import React from "react";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-muted/50 px-5 py-6">
          <h3 className="text-2xl font-medium">Total Attendance</h3>
          <p className="text-5xl mt-2 font-bold">{user.attendance.length}</p>
        </div>
        <div className="rounded-xl bg-muted/50 px-5 py-6">
          <h3 className="text-2xl font-medium">Leave Requests</h3>
          <p className="text-5xl mt-2 font-bold">{user.leaveRequests.length}</p>
        </div>
        <div className="rounded-xl bg-muted/50 px-5 py-6">
          <h3 className="text-2xl font-medium">Leave balance</h3>
          <p className="text-5xl mt-2 font-bold">{user.leaveBalance}</p>
        </div>
      </div>
      <div className="flex-1 rounded-xl bg-muted/50">
        <Charts />
      </div>
    </div>
  );
};

export default Dashboard;
