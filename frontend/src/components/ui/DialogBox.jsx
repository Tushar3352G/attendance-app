import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Selectbox from "./Selectbox";
import { Input } from "./input";

const DialogBox = ({ dialogData, dialogTitle, handler }) => {
  const now = new Date();

  // Format date as DD-MM-YYYY
  const formattedDate = now.toLocaleDateString("en-GB").split("/").join("-");

  // Format time as 12-hour with AM/PM
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  let attendance = [
    {
      title: "Status",
      value: ["clock-in", "clock-out"],
    },
    {
      title: "Date",
      value: formattedDate,
    },
    {
      title: "Time",
      value: formattedTime,
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="ml-3">
          {dialogTitle ? dialogTitle : "Log Attendance"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle || "Add Your Attendance"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => handler(e)}>
          <div className="grid gap-5 py-4">
            {(dialogData || attendance).map((items, key) => (
              <div key={`${items.title}-${key}`} className="grid gap-4">
                <Label className="text-right">{items.title}</Label>
                {Array.isArray(items.value) ? (
                  <Selectbox value={items.value} name={items.title.toLowerCase()} />
                ) : (
                  <Input
                    name={items.title.split(" ").join("").toLowerCase()}
                    type="text"
                    placeholder={items.title}
                    defaultValue={items.value}
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit">
              {dialogTitle ? dialogTitle : "Create Log"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
