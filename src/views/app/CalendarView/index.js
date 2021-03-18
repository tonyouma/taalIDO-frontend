import '@fullcalendar/core/main.css';
import '@fullcalendar/list/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import Toolbar from './Toolbar';
import Page from 'src/components/Page';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { PATH_APP } from 'src/routes/paths';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import AddEditEventForm from './AddEditEventForm';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import plusFill from '@iconify-icons/eva/plus-fill';
import useBreakpoints from 'src/hooks/useBreakpoints';
import { DialogAnimate } from 'src/components/Animate';
import { useDispatch, useSelector } from 'react-redux';
import interactionPlugin from '@fullcalendar/interaction';
import React, { useState, useRef, useEffect } from 'react';
import { HeaderDashboard } from 'src/layouts/Common';
import {
  getEvents,
  openModal,
  closeModal,
  updateEvent,
  selectEvent,
  selectRange
} from 'src/redux/slices/calendar';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { Box, Card, Tooltip, Container, DialogTitle } from '@material-ui/core';
import { MFab } from 'src/theme';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  calendar: {
    '& tr:first-child > td > .fc-day-grid-event, .fc-day-grid-event': {
      margin: 0,
      padding: 0
    },
    '& .fc-unthemed th, .fc-unthemed td, .fc-unthemed thead, .fc-unthemed tbody, .fc-unthemed .fc-divider, .fc-unthemed .fc-row, .fc-unthemed .fc-content, .fc-unthemed .fc-popover, .fc-unthemed .fc-list-view, .fc-unthemed .fc-list-heading td': {
      borderColor: theme.palette.divider
    },
    '& .fc-unthemed .fc-highlight': {
      opacity: 1,
      backgroundColor: alpha(theme.palette.primary.main, 0.08)
    },
    '& .fc-unthemed .fc-today': {
      backgroundColor: theme.palette.action.selected
    },
    '& .fc-unthemed .fc-list-empty': {
      backgroundColor: 'transparent',
      borderTop: `solid 1px ${theme.palette.divider}`
    },
    '& a.fc-more': {
      color: theme.palette.text.secondary,
      '&:hover': { color: theme.palette.text.primary }
    },
    '& hr.fc-divider': {
      height: 4,
      borderWidth: 0,
      backgroundColor: theme.palette.divider
    },
    '& thead.fc-head': {
      ...theme.typography.subtitle2,
      height: 48,
      lineHeight: '48px'
    },
    '& .fc-head-container.fc-widget-header': {
      borderLeft: 0,
      borderRight: 0
    },
    '& .fc-event': {
      paddingLeft: 0,
      paddingRight: 0,
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      '& .fc-content': {
        height: '100%',
        borderRadius: 4,
        padding: '3px 4px',
        backgroundColor: 'white',
        transition: theme.transitions.create('filter'),
        '&:hover': { filter: 'brightness(0.92)' },
        '&:before,&:after': {
          top: 0,
          left: 0,
          width: '100%',
          content: "''",
          height: '100%',
          borderRadius: 4,
          position: 'absolute',
          boxSizing: 'border-box'
        },
        '&:before': {
          zIndex: 8,
          opacity: 0.32,
          border: 'solid 1px currentColor'
        },
        '&:after': {
          zIndex: 7,
          opacity: 0.24,
          backgroundColor: 'currentColor'
        }
      },
      '& .fc-time, .fc-title': {
        zIndex: 9,
        position: 'relative',
        filter: 'brightness(0.48)',
        fontSize: `13px !important`
      },
      '& .fc-time': {
        fontWeight: theme.typography.fontWeightMedium
      }
    },
    '& .fc-time-grid-event.fc-event.fc-start.fc-end.fc-draggable.fc-resizable.fc-short': {
      position: 'inherit'
    },
    '& .fc-time-grid-event.fc-allow-mouse-resize .fc-resizer': {
      zIndex: 9,
      height: 16,
      bottom: -16,
      fontSize: 16,
      lineHeight: '20px',
      color: theme.palette.text.secondary
    },

    // Popover
    '& .fc-popover.fc-more-popover': {
      border: 0,
      overflow: 'hidden',
      boxShadow: theme.shadows[25].z20,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.paper,
      '& .fc-header.fc-widget-header': {
        padding: theme.spacing(1),
        backgroundColor: theme.palette.grey[500_12],
        borderBottom: `solid 1px ${theme.palette.divider}`
      },
      '& .fc-close.fc-icon.fc-icon-x': {
        opacity: 1,
        color: theme.palette.text.disabled
      },
      '& .fc-event-container': {
        padding: theme.spacing(1.5),
        '& > *:not(:last-child)': { marginBottom: 4 }
      }
    },

    // Month
    '& .fc-dayGridMonth-view': {
      '& .fc-content': {
        display: 'flex',
        alignItems: 'center',
        '& .fc-title': {
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          display: 'inline-block',
          textOverflow: 'ellipsis',
          marginLeft: theme.spacing(0.5)
        }
      },
      '& .fc-day-number': {
        ...theme.typography.body2,
        paddingTop: theme.spacing(1),
        paddingRight: theme.spacing(1)
      },
      '& .fc-day-header': { borderWidth: 0 },
      '& .fc-body > tr > td.fc-widget-content ': { borderWidth: 0 },
      '& .fc-event-container': { padding: theme.spacing(0.15, 0.5) }
    },

    // Week
    '& .fc-timeGridWeek-view': {
      '& .fc-body > tr > td.fc-widget-content ': { borderWidth: 0 }
    },

    // Day
    '& .fc-timeGridDay-view': {
      borderWidth: 0,
      backgroundColor: theme.palette.background.neutral,
      '& .fc-body > tr > td.fc-widget-content ': { borderWidth: 0 }
    },

    // Agenda
    '& .fc-listWeek-view': {
      '&.fc-list-view': { borderWidth: 0 },
      '& .fc-list-heading-main, .fc-list-heading-alt': {
        fontWeight: theme.typography.fontWeightMedium
      },
      '& .fc-list-item-time': {
        ...theme.typography.body2,
        color: theme.palette.text.secondary
      },
      '& .fc-list-item-title': { ...theme.typography.body2 },
      '& .fc-list-item:hover td': {
        cursor: 'pointer',
        backgroundColor: theme.palette.action.hover
      },
      '& .fc-list-table td': { borderWidth: 0, padding: theme.spacing(1, 2) },
      '& .fc-list-table': {
        '& .fc-widget-header': {
          padding: theme.spacing(1, 2),
          backgroundColor: theme.palette.background.neutral
        }
      }
    }
  },
  main: {
    overflow: 'hidden',
    position: 'relative',
    padding: theme.spacing(3),
    width: `calc(100% - 32px)`,
    boxShadow: theme.shadows[25].dialog,
    borderRadius: theme.shape.borderRadiusLg,
    backgroundColor: theme.palette.background.card,
    [theme.breakpoints.up('sm')]: {
      width: '480px'
    }
  }
}));

// ----------------------------------------------------------------------

const selectedEventSelector = (state) => {
  const { events, selectedEventId } = state.calendar;
  if (selectedEventId) {
    return events.find((_event) => _event.id === selectedEventId);
  } else {
    return null;
  }
};

function CalendarView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useBreakpoints('down', 'sm');
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(isMobile ? 'listWeek' : 'dayGridMonth');
  const selectedEvent = useSelector(selectedEventSelector);
  const { events, isOpenModal, selectedRange } = useSelector(
    (state) => state.calendar
  );

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = isMobile ? 'listWeek' : 'dayGridMonth';
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [isMobile]);

  const handleClickToday = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleChangeView = (newView) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleClickDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleClickDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const handleSelectRange = (arg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }
    dispatch(selectRange(arg.start, arg.end));
  };

  const handleSelectEvent = (arg) => {
    dispatch(selectEvent(arg.event.id));
  };

  const handleResizeEvent = async ({ event }) => {
    try {
      dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end
        })
      );
      enqueueSnackbar('Update event success', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropEvent = async ({ event }) => {
    try {
      dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end
        })
      );
      enqueueSnackbar('Update event success', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddEvent = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <Page className={classes.root} title="Calendar-App | Minimal-UI">
      <Container maxWidth="xl">
        <HeaderDashboard
          heading="Calendar"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Calendar' }
          ]}
          moreLink="https://fullcalendar.io/docs/react"
        />

        <Box sx={{ position: 'fixed', bottom: 40, right: 40, zIndex: 99 }}>
          <Tooltip title="Add Event">
            <MFab onClick={handleAddEvent}>
              <Icon icon={plusFill} width={20} height={20} />
            </MFab>
          </Tooltip>
        </Box>

        <Card className={classes.calendar}>
          <Toolbar
            date={date}
            view={view}
            onNextDate={handleClickDateNext}
            onPrevDate={handleClickDatePrev}
            onToday={handleClickToday}
            onChangeView={handleChangeView}
          />
          <FullCalendar
            allDayMaintainDuration
            defaultDate={date}
            defaultView={view}
            droppable
            editable
            eventClick={handleSelectEvent}
            eventDrop={handleDropEvent}
            eventLimit
            eventResizableFromStart
            eventResize={handleResizeEvent}
            events={events}
            header={false}
            aspectRatio={1.75}
            ref={calendarRef}
            rerenderDelay={10}
            select={handleSelectRange}
            selectable
            weekends
            plugins={[
              listPlugin,
              dayGridPlugin,
              timelinePlugin,
              timeGridPlugin,
              interactionPlugin
            ]}
          />
        </Card>

        <DialogAnimate open={isOpenModal} onClose={handleCloseModal}>
          <DialogTitle>
            {selectedEvent ? 'Edit Event' : 'Add Event'}
          </DialogTitle>

          <AddEditEventForm
            event={selectedEvent}
            range={selectedRange}
            onCancel={handleCloseModal}
          />
        </DialogAnimate>
      </Container>
    </Page>
  );
}

export default CalendarView;
