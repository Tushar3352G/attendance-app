import React from "react";
import { SidebarTrigger } from "./sidebar";
import { Separator } from "@radix-ui/react-separator";
import DialogBox from "./DialogBox";
import { useAuth } from "@/Context/AuthProvider";
import { Button } from "./button";
import { useCreateAttendanceHandler } from "@/page/employee/FormHandlers";

const Topbar = () => {
  const { user } = useAuth();
  let path = "/attendance"
  const { handleCreateAttendance } = useCreateAttendanceHandler(path);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between px-3 gap-2 border-b">
      <div className="flex items-center gap-2 px-3">
        <SidebarTrigger className="cursor-pointer size-5" />
        <Separator
          orientation="vertical"
          className="mr-1 border border-r border-zinc-100 h-4"
        />
        <h1 className="text-lg font-medium">
          Hello, {user.name.charAt(0).toUpperCase() + user.name.slice(1)} 🙂
        </h1>
      </div>
      {user.role !== "admin" ? (
        <DialogBox handler={handleCreateAttendance} />
      ) : (
        <Button>Account Settings</Button>
      )}
    </header>
  );
};

export default Topbar;
