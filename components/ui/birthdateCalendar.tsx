import { Calendar } from "@heroui/react";
import { parseDate } from "@internationalized/date";

export default function BirthDateCalendar() {
     return (
          <Calendar
               
               defaultValue={parseDate("2020-07-01")}
          />
     );
}

// Just Testing for the cheroui calendar component.