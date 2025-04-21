// components/DateRangePicker.tsx

"use client";

import * as React from "react";
import {
  format,
  startOfToday,
  subDays,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { CalendarIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

interface DateRangePickerProps {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}

export function DateRangePicker({ date, setDate }: DateRangePickerProps) {
  const handlePreset = (preset: "today" | "last7" | "thisMonth" | "clear") => {
    const today = startOfToday();

    switch (preset) {
      case "today":
        setDate({ from: today, to: today });
        break;
      case "last7":
        setDate({ from: subDays(today, 6), to: today }); // includes today
        break;
      case "thisMonth":
        setDate({ from: startOfMonth(today), to: endOfMonth(today) });
        break;
      case "clear":
        setDate(undefined);
        break;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className="w-[300px] justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} -{" "}
                {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-4 space-y-4" align="start">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handlePreset("today")}>
              Today
            </Button>
            <Button variant="outline" onClick={() => handlePreset("last7")}>
              Last 7 Days
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handlePreset("thisMonth")}>
              This Month
            </Button>
            <Button variant="ghost" onClick={() => handlePreset("clear")}>
              Clear
            </Button>
          </div>
        </div>

        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
