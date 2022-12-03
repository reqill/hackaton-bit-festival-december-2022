import React, { useState, useEffect } from 'react';
import { CalendarView, OnEventDragFinish } from 'kalend';
import 'kalend/dist/styles/index.css';
import dynamic from 'next/dynamic';
import { CalendarForm } from '../CalendarForm';

const Kalend = dynamic(() => import('kalend'), { ssr: false });

export const Calendar = (props: any) => {
  const [events, setEvents] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if (props.events) {
      console.log('Events');
      console.log(props.events);
      setEvents(props.events);
    }
  }, [props]);
  const onNewEventClick = (data: any) => {
    // const msg = `New event click action\n\n Callback data:\n\n${JSON.stringify({
    //   hour: data.hour,
    //   day: data.day,
    //   startAt: data.startAt,
    //   endAt: data.endAt,
    //   view: data.view,
    //   event: 'click event ',
    // })}`;
    setSelectedEvent(data);
    setIsFormOpen(true);
  };

  const onEventClick = (data: any) => {
    // const msg = `Click on event action\n\n Callback data:\n\n${JSON.stringify(data)}`;
    setSelectedEvent(data);
    setIsFormOpen(true);
  };

  const onEventDragFinish: OnEventDragFinish = (prev: any, current: any, data: any) => {
    setEvents(data);
    // just call api i guess
  };

  return (
    <>
      <Kalend
        kalendRef={props.kalendRef}
        onNewEventClick={onNewEventClick}
        initialView={CalendarView.WEEK}
        disabledViews={[]}
        onEventClick={onEventClick}
        events={events}
        initialDate={new Date().toISOString()}
        hourHeight={60}
        timezone={'Europe/Berlin'}
        onEventDragFinish={onEventDragFinish}
        onStateChange={props.onStateChange}
        selectedView={props.selectedView}
        showTimeLine={true}
        isDark={false}
        autoScroll={true}
        colors={{
          light: {
            primaryColor: '#1A202C',
          },
          dark: {
            primaryColor: '#1A202C',
          },
        }}
      />
      <CalendarForm open={isFormOpen} onClose={() => setIsFormOpen(false)} event={selectedEvent} />
    </>
  );
};
