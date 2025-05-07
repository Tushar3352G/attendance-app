import * as React from "react";
import {
  ClipboardCheck,
  ClipboardPaste,
  FileSpreadsheet,
  GalleryVerticalEnd,
  LayoutDashboard,
  UsersRound,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { useAuth } from "@/Context/AuthProvider";

// This is sample data.
const navMain = [
  {
    title: "Dashboard",
    url: "/employee",
    icon: LayoutDashboard,
  },
  {
    title: "Employee Attendance",
    url: "/employee/attendance",
    icon: ClipboardCheck,
  },
  {
    title: "Employee Leaves",
    url: "/employee/leave",
    icon: ClipboardPaste,
  },
];

const navMainAdmin = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "All Employees",
    url: "/admin/employees",
    icon: UsersRound,
  },
  {
    title: "Employee Leaves",
    url: "/admin/employees-leaves",
    icon: FileSpreadsheet,
  },
];

export function AppSidebar({ ...props }) {
 const {user} =  useAuth()

 let navLinks = user.role === 'employee' ? navMain : navMainAdmin

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-start">
                <div className="bg-teal-900 flex aspect-square size-10 px-2 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-full stroke-white" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium text-lg leading-[1.1]">
                    Employee Attendance Board
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="mt-5">
        <SidebarGroup>
          <SidebarMenu>
            {navLinks.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className="hover:bg-teal-800 hover:text-white"
                >
                  <Link to={item.url} className="font-medium py-5 text-base">
                    {<item.icon className="!size-5"/>}
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
