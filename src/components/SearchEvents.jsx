import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const SearchEvents = ({ events }) => {
    const [filterKeyword, setFilterKeyword] = useState(''); // State for filter input

    return (
        <div className='mt-5'>
            <input
                type='text'
                placeholder='Search events'
                value={filterKeyword}
                onChange={(e) => setFilterKeyword(e.target.value)}
                className='search-input p-2 bg-blue-500 text-white rounded-md placeholder:text-white'
            />
            {filterKeyword.length > 0 && Object.keys(events).length > 0 ? (
                <ul className='flex flex-wrap h-full justify-center items-center gap-4 overflow-y-scroll overflow-x-hidden mt-4 transition-all duration-300 ease-in-out scrollbar'>
                    {Object.entries(events) // Object.entries to get key-value pairs
                        .flatMap(([dateKey, eventList]) =>
                            eventList
                                .filter(
                                    (event) =>
                                        event.name
                                            .toLowerCase()
                                            .includes(
                                                filterKeyword.toLowerCase()
                                            ) ||
                                        event.description
                                            ?.toLowerCase()
                                            .includes(
                                                filterKeyword.toLowerCase()
                                            )
                                )
                                .map((event, index) => {
                                    // to create a consistent date without timezone issues
                                    const eventDate = new Date(
                                        Date.UTC(
                                            ...dateKey
                                                .split('-')
                                                .map((part, i) =>
                                                    i === 1
                                                        ? parseInt(part) - 1
                                                        : parseInt(part)
                                                )
                                        )
                                    );
                                    const formattedDate =
                                        eventDate.toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        });
                                    return (
                                        <li
                                            key={index}
                                            className='border-black rounded-lg border px-3 py-3'>
                                            <h3>{formattedDate}</h3>{' '}
                                            <strong>{event.name}</strong> (
                                            {event.startTime} - {event.endTime})
                                            <br />
                                            <p>{event.description}</p>
                                        </li>
                                    );
                                })
                        )}
                </ul>
            ) : (
                <div className='my-2'>{'No events match the filter'}</div>
            )}
        </div>
    );
};

export default SearchEvents;
