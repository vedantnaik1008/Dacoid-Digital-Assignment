import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const EditEvents = ({events, setEvents, selectedDate, index}) => {
const [isEditing, setIsEditing] = useState(false);
const [editingEvent, setEditingEvent] = useState(null);


    const handleEditEvent = (dateKey, eventIndex) => {
        const eventToEdit = events[dateKey][eventIndex];
        setEditingEvent({ ...eventToEdit, dateKey, eventIndex });
        setIsEditing(true); // Open the edit modal
    };

    const handleSaveEdit = () => {
        const { dateKey, eventIndex, name, startTime, endTime, description } =
            editingEvent;

        setEvents((prevEvents) => {
            const updatedEvents = { ...prevEvents };
            updatedEvents[dateKey] = [
                ...updatedEvents[dateKey].slice(0, eventIndex),
                { name, startTime, endTime, description },
                ...updatedEvents[dateKey].slice(eventIndex + 1)
            ];
            return updatedEvents;
        });

        setIsEditing(false); // Close the modal
    };
  return (
      <>
          {isEditing && (
              <div className='edit-modal fixed top-0 md:-top-20 left-0 bg-black  rounded-xl w-full h-[70dvh] md:h-[60dvh] flex flex-col gap-4 justify-center items-center z-[1001]'>
                  <h3 className='text-white font-bold text-3xl'>Edit Event</h3>
                  <input
                      type='text'
                      value={editingEvent.name}
                      onChange={(e) =>
                          setEditingEvent({
                              ...editingEvent,
                              name: e.target.value
                          })
                      }
                      className='p-2 bg-blue-500 text-white w-[70%]'
                  />
                  <div className='flex flex-col md:flex-row gap-[10px] w-[70%]'>
                      <input
                          type='time'
                          value={editingEvent.startTime}
                          onChange={(e) =>
                              setEditingEvent({
                                  ...editingEvent,
                                  startTime: e.target.value
                              })
                          }
                          className='p-2 bg-blue-500 text-white w-full'
                      />
                      <input
                          type='time'
                          value={editingEvent.endTime}
                          onChange={(e) =>
                              setEditingEvent({
                                  ...editingEvent,
                                  endTime: e.target.value
                              })
                          }
                          className='p-2 bg-blue-500 text-white w-full'
                      />
                  </div>
                  <textarea
                      value={editingEvent.description}
                      onChange={(e) =>
                          setEditingEvent({
                              ...editingEvent,
                              description: e.target.value
                          })
                      }
                      className='p-2 bg-blue-500 text-white w-[70%]'
                  />
                  <div className='flex gap-[10px]'>
                      <button
                          onClick={handleSaveEdit}>
                          Save
                      </button>
                      <button
                          onClick={() => setIsEditing(false)}>
                          Cancel
                      </button>
                  </div>
              </div>
          )}

          <button onClick={() => handleEditEvent(selectedDate, index)}>
              Edit
          </button>
      </>
  );
}

export default EditEvents
