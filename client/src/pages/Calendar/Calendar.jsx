// import { useState, useContext, useEffect } from "react";
// import "./Calendar.css";
// import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";

// export default function Calendar() {
//   const config = {
//     viewType: "Week",
//     durationBarVisible: false,
//   };

//   return (
//     <>
//       <DayPilotCalendar {...config} />
//     </>
//   );
// }
import React, { useState, useEffect } from "react";
import { format, startOfWeek, addDays, subWeeks, addWeeks } from "date-fns";
import "./Calendar.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [week, setWeek] = useState([]);

  console.log(week);
  console.log(currentDate.toLocaleDateString("en-CA"));

  for (let i = 0; i < week.length; i++) {
    console.log(format(week[i], "yyyy-mm-dd"));
  }

  //   const events = week.map((day) => {
  //     <div key={day.toString()} className="day">
  //       <div className="date">{format(day, "d")}</div>
  //       {/* You can add events or other content for each day here */}
  //     </div>;
  //   });

  const fetchAPI = async () => {
    const response = await axios.get(`http://localhost:3001/calendar`);

    console.log(response);
  };

  useEffect(() => {
    fetchAPI;
  }, [currentDate]);

  useEffect(() => {
    const weekStart = startOfWeek(currentDate);
    const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    setWeek(days);
  }, [currentDate]);

  const goToPreviousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };

  const goToNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  return (
    <div className="weekly-calendar">
      <div className="calendar-header">
        <button onClick={goToPreviousWeek}>Previous Week</button>
        <h2>{format(currentDate, "MMMM yyyy")}</h2>
        <button onClick={goToNextWeek}>Next Week</button>
      </div>
      <div className="calendar-body">
        <div className="day-names">
          {[
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ].map((day) => (
            <div key={day} className="day-name">
              {day}
            </div>
          ))}
        </div>
        <div className="week">
          {week.map((day) => (
            <div key={day.toString()} className="day">
              <div className="date">{format(day, "d")}</div>
              {/* You can add events or other content for each day here */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
