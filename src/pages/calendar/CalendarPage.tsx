import RecordCard from "components/RecordCard";
import { MONTH } from "constants/mockup";
import React from "react";

function CalendarPage() {
  return (
    <div>
      {MONTH.map((data) => (
        <RecordCard key={data.id} data={data} />
      ))}
    </div>
  );
}

export default CalendarPage;
