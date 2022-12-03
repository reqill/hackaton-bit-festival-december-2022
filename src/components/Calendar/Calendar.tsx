import React, { useState, useEffect } from 'react';
import { CalendarView, OnEventDragFinish } from 'kalend';
import 'kalend/dist/styles/index.css';
import dynamic from 'next/dynamic';
import { CalendarForm } from '../CalendarForm';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Circle, Icon } from '@chakra-ui/react';
import { DEFAULT_TRANSITION } from 'src/constants';

const Kalend = dynamic(() => import('kalend'), { ssr: false });

export const Calendar = (props: any) => {
  const [events, setEvents] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if (props.events) {
      setEvents(JSON.parse(JSON.stringify(props.events)));
    }
  }, [props.events]);

  const onNewEventClick = (data: any) => {
    setSelectedEvent(data);
    setIsFormOpen(true);
  };

  const onEventClick = (data: any) => {
    setSelectedEvent(data);
    setIsFormOpen(true);
  };

  const onEventDragFinish: OnEventDragFinish = (prev: any, current: any, data: any) => {
    setEvents(data);
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
      <Circle
        position="absolute"
        zIndex={99}
        bottom={6}
        right={6}
        backgroundColor="teal.300"
        size={12}
        shadow="base"
        transition={DEFAULT_TRANSITION}
        _hover={{ shadow: 'xl' }}
        cursor="pointer"
        onClick={() => setIsFormOpen(true)}
      >
        <Icon fontSize="2xl" color="white">
          <PlusIcon />
        </Icon>
      </Circle>
      <CalendarForm
        open={isFormOpen}
        onClose={() => {
          setSelectedEvent(null);
          setIsFormOpen(false);
        }}
        event={selectedEvent}
      />
    </>
  );
};
