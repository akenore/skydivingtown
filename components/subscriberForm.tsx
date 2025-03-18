"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { gql, useMutation, useQuery } from '@apollo/client';
import client from '../lib/apollo-client';
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
  const router = useRouter();
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
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const selectedTimeSlot = availableTimes.find(t => t.id === selectedTime);
    if (!selectedTimeSlot || selectedTimeSlot.availableSlots < 1) {
      alert("Le créneau horaire sélectionné n'est plus disponible. Veuillez choisir un autre créneau.");
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

      router.push('/success');

    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      alert("Une erreur s'est produite lors de la soumission du formulaire. Veuillez réessayer.");
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
    <div className="mx-auto px-4 py-8">
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
            <div className="bg-azure p-6 rounded-lg space-y-4">
              <h3 className="block font-medium text-white mb-4 text-[1.25rem]">Créneaux horaires disponibles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {availableTimes.map((time) => (
                  <button
                    key={time.id}
                    type="button"
                    onClick={() => setSelectedTime(time.id)}
                    className={`p-3 rounded-lg text-left ${selectedTime === time.id
                      ? 'bg-blue-900 text-white'
                      : 'bg-white hover:bg-blue-50 border border-gray-200'}`}
                  >
                    <div className="font-medium">
                      {new Date(`1970-01-01T${time.time}`).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    <div className="text-sm">
                      {time.availableSlots} Places restantes
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedDate && availableTimes.length === 0 && (
            <div className="bg-red-100 p-4 rounded-lg text-red-700">
              Aucun créneau horaire disponible pour cette date.
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Prénom*"
            className="mt-1 bg-azure border placeholder:text-white border-celticBlue text-white text-[1.2rem] rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            required
          />
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Nom*"
            className="mt-1 bg-azure border placeholder:text-white border-celticBlue text-white text-[1.2rem] rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email*"
            className="mt-1 bg-azure border placeholder:text-white border-celticBlue text-white text-[1.2rem] rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            required
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Téléphone*"
            className="mt-1 bg-azure border placeholder:text-white border-celticBlue text-white text-[1.2rem] rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            required
          />
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="mt-1 bg-azure border placeholder:text-white border-celticBlue text-white text-[1.2rem] rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            required
          />

          <div className="p-4">
            <div className="flex gap-4">
              <label className="flex items-center gap-3 text-white text-[1.25rem]">
                <input
                  type="radio"
                  name="gender"
                  value="M"
                  checked={gender === 'M'}
                  onChange={(e) => setGender(e.target.value)}
                  className="form-radio w-6 h-6 text-black bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
                Male
              </label>
              <label className="flex items-center gap-3 text-white text-[1.25rem]">
                <input
                  type="radio"
                  name="gender"
                  value="F"
                  checked={gender === 'F'}
                  onChange={(e) => setGender(e.target.value)}
                  className="form-radio w-6 h-6 text-black bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                Female
              </label>
            </div>
          </div>

          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="bg-azure border placeholder:text-white border-celticBlue text-white text-[1.2rem] rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            required
          >
            <option value="">Sélectionner un pays*</option>
            {dataCountries?.allCountries.map((c) => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>

          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="Ville/Région*"
            className="bg-azure border placeholder:text-white border-celticBlue text-white text-[1.2rem] rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            required
          />
        </div>
        {selectedEvent && selectedEvent.options && selectedEvent.options.length > 0 && (
          <div className="bg-azure p-6 rounded-lg space-y-4">
            <div className="space-y-4">
              <h3 className="block font-medium text-white mb-4 text-[1.25rem]">Options:</h3>
              {selectedEvent?.options.map((option) => (
                <label key={option.id} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={options.includes(option.name)}
                    onChange={() => handleOptionChange(option.name)}
                    className="form-checkbox w-6 h-6 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className='text-white text-[1.25rem]'>
                    {option.name} (+{parseFloat(option.amount).toFixed(2)} TND)
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
        <div className="bg-azure p-6 rounded-lg space-y-4">
          <div className="space-y-4">
            <h3 className="block font-medium text-white mb-4 text-[1.25rem]">À quelle altitude souhaitez-vous sauter d&apos;un avion ?*</h3>
            {['3000', '3200', '3500'].map((value) => (
              <label key={value} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="altitude"
                  value={value}
                  checked={altitude === value}
                  onChange={(e) => setAltitude(e.target.value)}
                  className="form-radio w-6 h-6 text-black bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
                <span className='text-white text-[1.25rem]'>
                  {value === '3000' ? '3,000m (10,000 pieds)' :
                    value === '3200' ? '3,200m (10,500 pieds)' :
                      '3,500m (11,500 pieds)'}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div className="bg-azure p-6 rounded-lg space-y-4">
          <div className="space-y-4">
            <h3 className="block font-medium text-white mb-4 text-[1.25rem]">Niveau d&apos;expérience</h3>
            {['tandem', 'solo', 'experienced'].map((value) => (
              <label key={value} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="experience"
                  value={value}
                  checked={skydiverOption === value}
                  onChange={(e) => setSkydiverOption(e.target.value)}
                  className="form-radio w-6 h-6 text-black bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
                <span className='text-white text-[1.25rem]'>
                  {value === 'tandem' ? 'Tandem (Débutant)' :
                    value === 'solo' ? 'Saut en solo' : 'Parachutiste expérimenté'}
                </span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-2xl text-xl px-16 py-6 me-2 mb-2 dark:bg-black dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Soumission en cours...' : 'Réserver votre place'}
        </button>

        <p className="text-[1.25] text-white">
          (*) Champs obligatoires
          <br />
          Soyez assuré que vos données sont stockées en toute sécurité.
        </p>
      </form>
    </div>
  );
};

export default SubscriberForm;