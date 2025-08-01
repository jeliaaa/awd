// import { useState, useEffect } from "react";

// const MONTH_NAMES = [
//   "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ];
// const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// export default function Calendar() {
//   const today = new Date();
//   const [month, setMonth] = useState(today.getMonth());
//   const [year, setYear] = useState(today.getFullYear());

//   const [noOfDays, setNoOfDays] = useState([]);
//   const [blankDays, setBlankDays] = useState([]);

//   const getNoOfDays = () => {
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const firstDayOfWeek = new Date(year, month).getDay();

//     const blanks = Array.from({ length: firstDayOfWeek }, (_, i) => i) as any;
//     const days = Array.from({ length: daysInMonth }, (_, i) => i + 1) as any;

//     setBlankDays(blanks);
//     setNoOfDays(days);
//   };

//   const isToday = (date: number) => {
//     const d = new Date(year, month, date);
//     return new Date().toDateString() === d.toDateString();
//   };

//   useEffect(() => {
//     getNoOfDays();
//   }, [month]);

//   return (
//       <div className="bg-white rounded-lg">
//         <div className="flex justify-between p-4">
//           <div>
//             <h2 className="text-xl font-bold text-gray-800">{MONTH_NAMES[month]} {year}</h2>
//           </div>
//           <div className="flex space-x-2">
//             <button disabled={month === 0}
//               className="p-2 hover:bg-gray-200 rounded disabled:opacity-30"
//               onClick={() => setMonth(month - 1)}>
//               ←
//             </button>
//             <button disabled={month === 11}
//               className="p-2 hover:bg-gray-200 rounded disabled:opacity-30"
//               onClick={() => setMonth(month + 1)}>
//               →
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-7 text-center text-sm font-bold text-gray-500 border-t">
//           {DAYS.map((day, idx) => <div key={idx} className="py-2">{day}</div>)}
//         </div>

//         <div className="grid grid-cols-7 border-t text-center">
//           {blankDays.map((_, idx) => <div key={idx} className="py-6 border" />)}
//           {noOfDays.map((date) => (
//             <div key={date} className="py-2 border h-24 relative px-1">
//               <div
//                 className={`cursor-pointer inline-flex justify-center items-center rounded-full w-6 h-6 mx-auto mb-1 ${isToday(date) ? 'bg-blue-500 text-white' : 'hover:bg-blue-100 text-gray-700'}`}>
//                 {date}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//   );
// }

const Calendar = () => {
  return (
    <div>Calendar</div>
  )
}
export default Calendar;  