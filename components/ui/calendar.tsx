'use client';

import { Datepicker } from 'flowbite-react';
import { CustomFlowbiteTheme } from 'flowbite-react';
import { useMemo, useCallback } from 'react';


interface CalendarProps {
     availableDates: {
          id: string;
          date: string;
     }[];
     selectedDate: Date | null;
     onChange: (date: Date | null, eventDateId: string) => void;
}

const customTheme: CustomFlowbiteTheme['datepicker'] = {
     root: {
          base: "relative w-full",
          input: {
               field: {
                    base: "bg-azure border border-celticBlue text-[1.2rem] rounded-2xl focus:ring-azure focus:border-azure block w-full p-4",
               }
          }
     },
     popup: {
          root: {
               base: "absolute top-10 z-50 block pt-2",
               inline: "relative top-0 z-auto",
               inner: "rounded-2xl bg-azure p-4 shadow-lg border border-celticBlue"
          },
          header: {
               base: "p-2",
               title: "px-2 py-3 text-center font-semibold text-white text-xl",
               selectors: {
                    base: "mb-2 flex justify-between",
                    button: {
                         base: "rounded-lg bg-azure px-5 py-2.5 text-lg font-semibold text-white hover:bg-celticBlue focus:outline-none focus:ring-2 focus:ring-celticBlue",
                         prev: "",
                         next: "",
                         view: ""
                    }
               }
          },
          view: {
               base: "p-2"
          },
          footer: {
               base: "mt-2 flex space-x-2",
               button: {
                    base: "w-full rounded-lg px-5 py-2 text-center text-lg font-medium focus:ring-4 focus:ring-celticBlue",
                    today: "bg-celticBlue text-white hover:bg-blue-700",
                    clear: "border border-celticBlue bg-azure text-white hover:bg-celticBlue"
               }
          }
     },
     views: {
          days: {
               header: {
                    base: "mb-2 grid grid-cols-7",
                    title: "h-10 text-center md:text-2xl font-extrabold leading-6 text-white"
               },
               items: {
                    base: "grid w-full grid-cols-7 gap-2",
                    item: {
                         base: "block flex-1 cursor-pointer rounded-lg border text-center md:text-2xl font-semibold leading-10 text-white hover:bg-celticBlue h-10",
                         selected: "bg-green-200 text-black hover:bg-azure bg-green-200",
                         disabled: "text-gray-900 cursor-not-allowed hover:bg-transparent"
                    }
               }
          },
          months: {
               items: {
                    base: "grid w-full grid-cols-4 gap-2",
                    item: {
                         base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-2xl font-bold leading-10 text-white hover:bg-celticBlue h-10",
                         selected: "bg-celticBlue text-white hover:bg-azure",
                         disabled: "text-gray-900 cursor-not-allowed hover:bg-transparent"
                    }
               }
          },
          years: {
               items: {
                    base: "grid w-full grid-cols-4 gap-2",
                    item: {
                         base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-2xl font-bold leading-10 text-white hover:bg-celticBlue h-10",
                         selected: "bg-celticBlue text-white hover:bg-azure",
                         disabled: "text-gray-900 cursor-not-allowed hover:bg-transparent"
                    }
               }
          },
          decades: {
               items: {
                    base: "grid w-full grid-cols-4 gap-2",
                    item: {
                         base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-2xl font-bold leading-10 text-white hover:bg-celticBlue h-10",
                         selected: "bg-celticBlue text-white hover:bg-azure",
                         disabled: "text-gray-900 cursor-not-allowed hover:bg-transparent"
                    }
               }
          }
     }
};

const Calendar = ({ availableDates, selectedDate, onChange }: CalendarProps) => {
     const eventDates = useMemo(() => availableDates.map(d => new Date(d.date)), [availableDates]);
 
     const minDate = useMemo(() => eventDates.length ? new Date(Math.min(...eventDates.map(d => d.getTime()))) : undefined, [eventDates]);
     const maxDate = useMemo(() => eventDates.length ? new Date(Math.max(...eventDates.map(d => d.getTime()))) : undefined, [eventDates]);
 
     const handleChange = useCallback((date: Date | null) => {
         const eventDate = date ? availableDates.find(d => new Date(d.date).toDateString() === date.toDateString()) : null;
         onChange(date, eventDate?.id || '');
     }, [availableDates, onChange]);
 
     return (
         <Datepicker
             theme={customTheme}
             inline
             minDate={minDate}
             maxDate={maxDate}
             value={selectedDate}
             defaultValue={minDate}
             onChange={handleChange}
             showTodayButton={false}
             showClearButton={false}
             language="fr-FR"
             weekStart={1}
         />
     );
 };

export default Calendar;