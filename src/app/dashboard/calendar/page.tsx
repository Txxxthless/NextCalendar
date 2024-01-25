import Calendar from "@/app/components/calendar/calendar";
import './style.scss';

export default function Page() {
  return (
    <>
      <p className="page-title">Calendar</p>
      <Calendar></Calendar>
    </>
  );
}
