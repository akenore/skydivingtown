// "use client";
// import React, { useState, useEffect, useRef } from 'react';
// import { gql, useMutation, useQuery } from '@apollo/client';
// import client from '../lib/apollo-client';
// import SuccessMessage from '../components/ui/successMessage';
// import SkeletonForm from '../components/ui/skeletonForm';
// import CalendarModalProps from '../components/ui/calendar';

// const GET_EVENT_DATES = gql`
//   query GetEventDates {
//     allEvents {
//       id
//       name
//       options {
//         id
//         name
//         amount
//       }
//     }
//   }
// `;

// const GET_COUNTRIES = gql`
//   query GetCountries {
//     allCountries {
//       code
//       name
//     }
//   }
// `;

// const GET_EVENT_DATES_BY_EVENT = gql`
//   query GetEventDatesByEvent($eventId: ID!) {
//     allEventDates(eventId: $eventId) {
//       id
//       date
//     }
//   }
// `;

// const CREATE_SUBSCRIBER = gql`
//   mutation CreateSubscriber(
//     $eventDateId: ID!,
//     $name: String!,
//     $surname: String!,
//     $email: String!,
//     $phone: String!,
//     $birthDate: Date!,
//     $gender: String!,
//     $altitude: String!,
//     $skydiverOption: String!,
//     $country: String!,
//     $region: String!,
//     $options: [String!]
//   ) {
//     createSubscriber(
//       eventDateId: $eventDateId,
//       name: $name,
//       surname: $surname,
//       email: $email,
//       phone: $phone,
//       birthDate: $birthDate,
//       gender: $gender,
//       altitude: $altitude,
//       skydiverOption: $skydiverOption,
//       country: $country,
//       region: $region,
//       options: $options
//     ) {
//       subscriber {
//         eventDate {
//           id
//           date
//           maxSubscribers
//           event {
//             id
//             options {
//               id
//               name
//               amount
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// const SubscriberForm = () => {
//   const successRef = useRef<HTMLDivElement>(null);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [eventId, setEventId] = useState('');
//   const [eventDateId, setEventDateId] = useState('');
//   const [name, setName] = useState('');
//   const [surname, setSurname] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [birthDate, setBirthDate] = useState('');
//   const [gender, setGender] = useState('');
//   const [altitude, setAltitude] = useState('');
//   const [skydiverOption, setSkydiverOption] = useState('');
//   const [country, setCountry] = useState('');
//   const [region, setRegion] = useState('');
//   const [options, setOptions] = useState<string[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const { loading: loadingEvents, error: errorEvents, data: dataEvents } = useQuery(GET_EVENT_DATES, { client });
//   const { loading: loadingCountries, error: errorCountries, data: dataCountries } = useQuery(GET_COUNTRIES, { client });
//   const { loading: loadingEventDates, error: errorEventDates, data: dataEventDates, refetch: refetchEventDates } = useQuery(GET_EVENT_DATES_BY_EVENT, {
//     variables: { eventId },
//     skip: !eventId,
//     client,
//   });
//   const [createSubscriber] = useMutation(CREATE_SUBSCRIBER, {
//     client,
//   });

//   const handleDateChange = (date: Date | null, eventDateId: string) => {
//     setSelectedDate(date);
//     setEventDateId(eventDateId);
//   };

//   useEffect(() => {
//     if (dataEvents && dataEvents.allEvents.length > 0) {
//       const latestEvent = dataEvents.allEvents[dataEvents.allEvents.length - 1];
//       setEventId(latestEvent.id);
//     }
//   }, [dataEvents]);

//   useEffect(() => {
//     if (eventId) {
//       refetchEventDates();
//     }
//   }, [eventId, refetchEventDates]);

//   useEffect(() => {
//     if (dataEventDates) {
//       // console.log('Fetched event dates:', dataEventDates.allEventDates);
//     }
//   }, [dataEventDates]);

//   const handleOptionChange = (option: string) => {
//     setOptions((prevOptions) =>
//       prevOptions.includes(option)
//         ? prevOptions.filter((o) => o !== option)
//         : [...prevOptions, option]
//     );
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!eventId || !eventDateId || !country || !region) {
//       alert('Please fill in all required fields.');
//       return;
//     }

//     setIsSubmitting(true);

//     const variables = {
//       eventDateId,
//       name,
//       surname,
//       email,
//       phone,
//       birthDate,
//       gender,
//       altitude,
//       skydiverOption,
//       country,
//       region,
//       options
//     };

//     //console.log('Submitting with variables:', variables);

//     try {
//       await createSubscriber({
//         variables
//       });
//       setIsSubmitted(true);
//       setTimeout(() => {
//         successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       }, 100);
//     } catch (error) {
//       console.error('Error creating subscriber:', error);
//       alert(`Error creating subscriber: ${(error instanceof Error) ? error.message : 'Unknown error'}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loadingEvents || loadingCountries || (eventId && loadingEventDates)) return <SkeletonForm />;
//   if (errorEvents || errorCountries || errorEventDates) {
//     console.error('Error loading data:', errorEvents || errorCountries || errorEventDates);
//     return <p>Error loading data</p>;
//   }

//   const selectedEvent = dataEvents.allEvents.find((event: { id: string }) => event.id === eventId);

//   return (
//     <div>
//       {isSubmitted && (
//         <div ref={successRef} className="thank-you-message">
//           <div className="py-4 px-2">
//             <SuccessMessage />
//           </div>
//         </div>
//       )}
//       <form onSubmit={handleSubmit} className="subscriber-form space-y-4 mx-5">
//         <div className='hidden'>
//           <label htmlFor="eventId" className="block text-sm font-medium text-gray-700">Event:</label>
//           <select
//             id="eventId"
//             value={eventId}
//             onChange={(e) => setEventId(e.target.value)}
//             required
//             className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           >
//             <option value="">Select an event</option>
//             {dataEvents.allEvents.map((event: { id: string; name: string }) => (
//               <option key={event.id} value={event.id}>
//                 {event.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         {eventId && (
//           <div>
//             <label htmlFor="eventDateId" className="hidden mb-2 text-[1rem] font-medium text-white">Choisissez une date pour votre saut:</label>
//             <CalendarModalProps
//               availableDates={dataEventDates?.allEventDates || []}
//               selectedDate={selectedDate}
//               onChange={handleDateChange}
//             />
//           </div>
//         )}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label htmlFor="name" className="hidden text-sm font-medium text-gray-700">Nom:</label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               placeholder='Nom*'
//               className="mt-1 bg-azure border placeholder:text-white border-celticBlue text-white text-[1.2rem] rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
//             />
//           </div>
//           <div>
//             <label htmlFor="surname" className="hidden text-sm font-medium text-gray-700">Surname:</label>
//             <input
//               type="text"
//               id="surname"
//               value={surname}
//               onChange={(e) => setSurname(e.target.value)}
//               required
//               placeholder='Prénom*'
//               className="mt-1 bg-azure border placeholder:text-white border-celticBlue text-white text-[1.2rem] rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
//             />
//           </div>
//           <div>
//             <label htmlFor="email" className="hidden text-sm font-medium text-gray-700">Email:</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               placeholder='Email*'
//               className="mt-1 bg-azure border placeholder:text-white border-celticBlue text-white text-[1.2rem] rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
//             />
//           </div>
//           <div>
//             <label htmlFor="phone" className="hidden text-sm font-medium text-gray-700">Téléphone:</label>
//             <input
//               type="text"
//               id="phone"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               required
//               placeholder='Numéro de téléphone*'
//               className="mt-1 bg-azure border placeholder:text-white border-celticBlue text-white text-[1.2rem] rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
//             />
//           </div>
//           <div>
//             <label htmlFor="birthDate" className="hidden text-sm font-medium text-gray-700">Birth Date:</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 end-4 flex items-center ps-3.5 pointer-events-none">
//                 <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
//                   <path fillRule="evenodd" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <input
//                 type="date"
//                 id="birthDate"
//                 value={birthDate}
//                 onChange={(e) => setBirthDate(e.target.value)}
//                 required
//                 placeholder='Date de naissance'
//                 className="mt-1 bg-azure border placeholder:text-white border-celticBlue text-white text-[1.2rem] rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
//               />
//             </div>

//           </div>
//           <div className='flex items-center'>
//             <label className="hidden text-sm font-medium text-gray-700 ">Gender:</label>
//             <div className="mt-1 ml-2">
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="M"
//                   checked={gender === 'M'}
//                   onChange={(e) => setGender(e.target.value)}
//                   required
//                   className="form-radio w-6 h-6 text-black bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                 />
//                 <span className="ml-2 text-white text-[1.25rem]">Male</span>
//               </label>
//               <label className="inline-flex items-center ml-6">
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="F"
//                   checked={gender === 'F'}
//                   onChange={(e) => setGender(e.target.value)}
//                   required
//                   className="form-radio w-6 h-6 text-black bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                 />
//                 <span className="ml-2 text-white text-[1.25rem]">Female</span>
//               </label>
//             </div>
//           </div>
//           <div>
//             <label htmlFor="country" className="hidden text-sm font-medium text-gray-700">Country:</label>
//             <select
//               id="country"
//               value={country}
//               onChange={(e) => setCountry(e.target.value)}
//               required
//               className="mt-1 bg-azure border placeholder:text-white border-celticBlue text-white text-[1.2rem] rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
//             >
//               <option value="">Pays*</option>
//               {dataCountries.allCountries.map((country: { code: string; name: string }) => (
//                 <option key={country.code} value={country.code}>
//                   {country.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label htmlFor="region" className="hidden text-sm font-medium text-gray-700">Region:</label>
//             <input
//               type="text"
//               id="region"
//               value={region}
//               onChange={(e) => setRegion(e.target.value)}
//               required
//               placeholder='Région*'
//               className="mt-1 bg-azure border placeholder:text-white border-celticBlue text-white text-[1.2rem] rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
//             />
//           </div>
//         </div>
//         <div className='bg-azure p-10 rounded-2xl'>
//           <label className="block font-medium text-white mb-4 text-[1.25rem]">À quelle altitude souhaitez-vous sauter d&apos;un avion ?*</label>
//           <div className="mt-1">
//             <label className="flex items-center mb-4">
//               <input
//                 type="radio"
//                 name="altitude"
//                 value="3000"
//                 checked={altitude === '3000'}
//                 onChange={(e) => setAltitude(e.target.value)}
//                 required
//                 className="form-radio w-6 h-6 text-black bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//               />
//               <span className="ml-2 text-white text-[1.25rem]">3 000 m (10 000 feet)</span>
//             </label>
//             <label className="flex items-center mb-4">
//               <input
//                 type="radio"
//                 name="altitude"
//                 value="3200"
//                 checked={altitude === '3200'}
//                 onChange={(e) => setAltitude(e.target.value)}
//                 required
//                 className="form-radio w-6 h-6 text-black bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//               />
//               <span className="ml-2 text-white text-[1.25rem]">3 200 m (10 500 feet)</span>
//             </label>
//             <label className="flex items-center mb-4">
//               <input
//                 type="radio"
//                 name="altitude"
//                 value="3500"
//                 checked={altitude === '3500'}
//                 onChange={(e) => setAltitude(e.target.value)}
//                 required
//                 className="form-radio w-6 h-6 text-black bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//               />
//               <span className="ml-2 text-white text-[1.25rem]">3 500 m (11 500 feet)</span>
//             </label>
//           </div>
//         </div>
//         <div className='bg-azure p-10 rounded-2xl'>
//           <label className="block font-medium text-white mb-4 text-[1.25rem]">Vous êtes un(e) Skydiver*:</label>
//           <div className="mt-1">
//             <label className="flex items-center mb-4">
//               <input
//                 type="radio"
//                 name="skydiverOption"
//                 value="tandem"
//                 checked={skydiverOption === 'tandem'}
//                 onChange={(e) => setSkydiverOption(e.target.value)}
//                 required
//                 className="form-radio w-6 h-6 text-black bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//               />
//               <span className="ml-2 text-white text-[1.25rem]">Tandem (Beginner)</span>
//             </label>
//             <label className="flex items-center mb-4">
//               <input
//                 type="radio"
//                 name="skydiverOption"
//                 value="solo"
//                 checked={skydiverOption === 'solo'}
//                 onChange={(e) => setSkydiverOption(e.target.value)}
//                 required
//                 className="form-radio w-6 h-6 text-black bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//               />
//               <span className="ml-2 text-white text-[1.25rem]">Solo</span>
//             </label>
//             <label className="flex items-center mb-4">
//               <input
//                 type="radio"
//                 name="skydiverOption"
//                 value="experienced"
//                 checked={skydiverOption === 'experienced'}
//                 onChange={(e) => setSkydiverOption(e.target.value)}
//                 required
//                 className="form-radio w-6 h-6 text-black bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//               />
//               <span className="ml-2 text-white text-[1.25rem]">Experienced</span>
//             </label>
//           </div>
//         </div>

//         {selectedEvent && selectedEvent.options && selectedEvent.options.length > 0 && (
//           <div className='bg-azure p-10 rounded-2xl'>
//             <label className="block font-medium text-white mb-4 text-[1.25rem]">Options:</label>
//             <div className="mt-1">
//               {selectedEvent.options.map((option: { name: string, amount: string }) => (
//                 <label key={option.name} className="flex items-center mb-4">
//                   <input
//                     type="checkbox"
//                     value={option.name}
//                     checked={options.includes(option.name)}
//                     onChange={() => handleOptionChange(option.name)}
//                     className="form-checkbox w-6 h-6 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                   />
//                   <span className="ml-2 text-white text-[1.25rem]">{option.name} -- {parseFloat(option.amount).toFixed(2)} TND</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}
//         <p className="text-[1.25] text-white mt-5">
//           (*) Champs obligatoires
//           <br />
//           Soyez assuré que vos données sont stockées en toute sécurité.
//         </p>
//         <div className="flex justify-end mr-20">
//           <button
//             type="submit"
//             className="mt-4 text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-2xl text-xl px-16 py-6 me-2 mb-2 dark:bg-black dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? 'Submitting...' : 'Subscribe'}
//           </button>
//         </div>
//       </form>

//     </div>
//   );
// };

// export default SubscriberForm;

"use client";
import React, { useState, useEffect, useRef } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import client from '../lib/apollo-client';
import SuccessMessage from '../components/ui/successMessage';
import SkeletonForm from '../components/ui/skeletonForm';
import CalendarModalProps from '../components/ui/calendar';

interface Event {
  id: string;
  name: string;
  options: EventOption[];
}

interface EventOption {
  id: string;
  name: string;
  amount: string;
}

interface EventDate {
  id: string;
  date: string;
  eventTimes: EventTime[];
}

interface EventTime {
  id: string;
  time: string;
  maxSubscribers: number;
  currentSubscriberCount: number;
  availableSlots: number;
  isFull: boolean;
}

interface Country {
  code: string;
  name: string;
}

const GET_EVENT_DATES = gql`
  query GetEventDates {
    allEvents {
      id
      name
      options {
        id
        name
        amount
      }
    }
  }
`;

const GET_COUNTRIES = gql`
  query GetCountries {
    allCountries {
      code
      name
    }
  }
`;

const GET_EVENT_DATES_BY_EVENT = gql`
  query GetEventDatesByEvent($eventId: ID!) {
    allEventDates(eventId: $eventId) {
      id
      date
      eventTimes {
        id
        time
        maxSubscribers
        currentSubscriberCount
        availableSlots
        isFull
      }
    }
  }
`;

const CREATE_SUBSCRIBER = gql`
  mutation CreateSubscriber(
    $eventTimeId: ID!,
    $name: String!,
    $surname: String!,
    $email: String!,
    $phone: String!,
    $birthDate: Date!,
    $gender: String!,
    $altitude: String!,
    $skydiverOption: String!,
    $country: String!,
    $region: String!,
    $options: [String!]
  ) {
    createSubscriber(
      eventTimeId: $eventTimeId,
      name: $name,
      surname: $surname,
      email: $email,
      phone: $phone,
      birthDate: $birthDate,
      gender: $gender,
      altitude: $altitude,
      skydiverOption: $skydiverOption,
      country: $country,
      region: $region,
      options: $options
    ) {
      subscriber {
        id
      }
    }
  }
`;

const SubscriberForm = () => {
  const successRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [eventId, setEventId] = useState<string>('');
  const [availableTimes, setAvailableTimes] = useState<EventTime[]>([]);
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [altitude, setAltitude] = useState<string>('');
  const [skydiverOption, setSkydiverOption] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { loading: loadingEvents, error: errorEvents, data: dataEvents } = useQuery<{ allEvents: Event[] }>(GET_EVENT_DATES, { client });
  const { loading: loadingCountries, error: errorCountries, data: dataCountries } = useQuery<{ allCountries: Country[] }>(GET_COUNTRIES, { client });
  const { 
    loading: loadingEventDates, 
    error: errorEventDates, 
    data: dataEventDates, 
    refetch: refetchEventDates 
  } = useQuery<{ allEventDates: EventDate[] }>(GET_EVENT_DATES_BY_EVENT, {
    variables: { eventId },
    skip: !eventId,
    client,
  });

  const [createSubscriber] = useMutation(CREATE_SUBSCRIBER, { client });

  const handleDateChange = (date: Date | null, eventDateId: string) => {
      setSelectedDate(date);
      setSelectedTime('');
      const eventDate = dataEventDates?.allEventDates.find(eventDate => eventDate.id === eventDateId);
      if (eventDate) {
          const times = eventDate.eventTimes.filter(time => !time.isFull);
          setAvailableTimes(times);
      }
  };

  useEffect(() => {
    if (dataEvents?.allEvents?.length) {
      setEventId(dataEvents.allEvents[0].id);
    }
  }, [dataEvents]);

  useEffect(() => {
    if (eventId) refetchEventDates();
  }, [eventId, refetchEventDates]);

  const handleOptionChange = (option: string) => {
    setOptions(prev => prev.includes(option) 
      ? prev.filter(o => o !== option) 
      : [...prev, option]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTime || !country || !region) {
      alert('Please fill in all required fields.');
      return;
    }

    const selectedTimeSlot = availableTimes.find(t => t.id === selectedTime);
    if (!selectedTimeSlot || selectedTimeSlot.availableSlots < 1) {
      alert('Selected time slot is no longer available. Please choose another time.');
      return;
    }

    setIsSubmitting(true);

    try {
      await createSubscriber({
        variables: {
          eventTimeId: selectedTime,
          name,
          surname,
          email,
          phone,
          birthDate,
          gender,
          altitude,
          skydiverOption,
          country,
          region,
          options
        }
      });
      setIsSubmitted(true);
      successRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingEvents || loadingCountries || loadingEventDates) return <SkeletonForm />;
  if (errorEvents || errorCountries || errorEventDates) {
    console.error('Error:', errorEvents || errorCountries || errorEventDates);
    return <p>Error loading data</p>;
  }

  const selectedEvent = dataEvents?.allEvents.find(e => e.id === eventId);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {isSubmitted && (
        <div ref={successRef} className="mb-8">
          <SuccessMessage />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="hidden">
          <select
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {dataEvents?.allEvents.map((event) => (
              <option key={event.id} value={event.id}>{event.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <CalendarModalProps
            availableDates={dataEventDates?.allEventDates || []}
            selectedDate={selectedDate}
            onChange={handleDateChange}
          />

          {selectedDate && availableTimes.length > 0 && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {availableTimes.map((time) => (
                  <button
                    key={time.id}
                    type="button"
                    onClick={() => setSelectedTime(time.id)}
                    className={`p-3 rounded-lg text-left ${selectedTime === time.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white hover:bg-blue-50 border border-gray-200'}`}
                  >
                    <div className="font-medium">
                      {new Date(`1970-01-01T${time.time}`).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                    <div className="text-sm">
                      {time.availableSlots} spots remaining
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedDate && availableTimes.length === 0 && (
            <div className="bg-red-100 p-4 rounded-lg text-red-700">
              No available time slots for this date
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First Name*"
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Last Name*"
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email*"
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone*"
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
          
          <div className="p-3 border rounded-lg bg-white">
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="M"
                  checked={gender === 'M'}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-5 h-5"
                  required
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="F"
                  checked={gender === 'F'}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-5 h-5"
                />
                Female
              </label>
            </div>
          </div>

          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          >
            <option value="">Select Country*</option>
            {dataCountries?.allCountries.map((c) => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>

          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="City/Region*"
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Jump Options</h3>
            {selectedEvent?.options.map((option) => (
              <label key={option.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                <input
                  type="checkbox"
                  checked={options.includes(option.name)}
                  onChange={() => handleOptionChange(option.name)}
                  className="w-5 h-5"
                />
                <span>
                  {option.name} (+{parseFloat(option.amount).toFixed(2)} TND)
                </span>
              </label>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Altitude Preference</h3>
            {['3000', '3200', '3500'].map((value) => (
              <label key={value} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                <input
                  type="radio"
                  name="altitude"
                  value={value}
                  checked={altitude === value}
                  onChange={(e) => setAltitude(e.target.value)}
                  className="w-5 h-5"
                  required
                />
                <span>
                  {value === '3000' ? '3,000m (10,000 feet)' :
                   value === '3200' ? '3,200m (10,500 feet)' :
                   '3,500m (11,500 feet)'}
                </span>
              </label>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Experience Level</h3>
            {['tandem', 'solo', 'experienced'].map((value) => (
              <label key={value} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                <input
                  type="radio"
                  name="experience"
                  value={value}
                  checked={skydiverOption === value}
                  onChange={(e) => setSkydiverOption(e.target.value)}
                  className="w-5 h-5"
                  required
                />
                <span>
                  {value === 'tandem' ? 'Tandem (Beginner)' :
                   value === 'solo' ? 'Solo Jump' : 'Experienced Skydiver'}
                </span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white p-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Submitting...' : 'Complete Booking'}
        </button>

        <p className="text-sm text-gray-600">
          * Required fields
          <br />
          Your information is securely stored and never shared with third parties.
        </p>
      </form>
    </div>
  );
};

export default SubscriberForm;