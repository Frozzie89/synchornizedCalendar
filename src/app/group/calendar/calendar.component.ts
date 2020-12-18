import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    TemplateRef,
    OnInit,
    OnDestroy,
} from '@angular/core';
import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours,
} from 'date-fns';
import { Subject, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView,
} from 'angular-calendar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventTypeApiService } from 'src/app/common/eventType/event-type-api.service';
import { EventTypes } from 'src/app/common/eventType/event-type';
import { Eventts } from 'src/app/common/event/eventt';
import { EventApiService } from 'src/app/common/event/event-api.service';

const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF',
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA',
    },
};

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {
    @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

    view: CalendarView = CalendarView.Month;

    CalendarView = CalendarView;

    viewDate: Date = new Date();

    modalData: {
        action: string;
        event: CalendarEvent;
    };

    actions: CalendarEventAction[] = [
        {
            label: '<i class="fas fa-fw fa-pencil-alt"></i>',
            a11yLabel: 'Edit',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.handleEvent('Edited', event);
            },
        },
        {
            label: '<i class="fas fa-fw fa-trash-alt"></i>',
            a11yLabel: 'Delete',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.events = this.events.filter((iEvent) => iEvent !== event);
                this.handleEvent('Deleted', event);
            },
        },
    ];

    refresh: Subject<any> = new Subject();

    events: CalendarEvent[] = [];

    activeDayIsOpen: boolean = true;

    formAddEvent: FormGroup = this.fb.group({
        dateStart: ['', Validators.required],
        dateEnd: ['', Validators.required],
        timeStart: [''],
        timeEnd: [''],
        title: ['', Validators.required],
        actions: this.actions,
        eventType: ['', Validators.required]
    });

    private subscriptions: Subscription[] = [];
    eventTypes: EventTypes;
    eventsBackEnd: Eventts;


    constructor(
        private modal: NgbModal,
        private newEventModal: NgbModal,
        private fb: FormBuilder,
        private eventTypeApi: EventTypeApiService,
        private eventApi: EventApiService
    ) { }

    ngOnInit(): void {
        this.subscriptions.push(
            this.eventTypeApi.query()
                .subscribe(eventTypes => {
                    this.eventTypes = eventTypes;

                    this.eventApi.queryFromPlanning(1)
                        .subscribe(events => {
                            this.eventsBackEnd = events;

                            this.eventsBackEnd.forEach(event_backend => {
                                let colorType;

                                this.eventTypes.forEach(event_type => {
                                    if (event_type.id == event_backend.idEventCategory)
                                        colorType = event_type.color;
                                });

                                this.events = [
                                    ...this.events,
                                    {
                                        start: this.sqlDateToJsDate(event_backend.start),
                                        end: this.sqlDateToJsDate(event_backend.end),
                                        title: event_backend.label,
                                        color: colorType,
                                        actions: this.actions
                                    },
                                ];


                            });
                            console.log(this.events);

                        })
                })
        );
    }

    sqlDateToJsDate(date: string) {
        let fullDate = date.split(" ");
        let datee = fullDate[0].split("-");
        let time = fullDate[1].split(":");

        return new Date(parseInt("20" + datee[2]), parseInt(datee[1]) - 1, parseInt(datee[0]), parseInt(time[0]), parseInt(time[1]), parseInt(time[2]));
    }


    ngOnDestroy(): void {
        this.subscriptions.forEach(element => {
            element.unsubscribe()
        });
    }

    writeEvent() {
        const noTimeStart = this.formAddEvent.value["timeStart"] == "";
        const noTimeEnd = this.formAddEvent.value["timeEnd"] == "";

        const start = this.formAddEvent.value["dateStart"] + (!noTimeStart ? " " + this.formAddEvent.value["timeStart"] : "");
        const end = this.formAddEvent.value["dateEnd"] + (!noTimeEnd ? " " + this.formAddEvent.value["timeEnd"] : "");
        const color = this.formAddEvent.value["eventType"].split("-")[1];


        this.events.push(
            {
                start: new Date(start),
                end: new Date(end),
                title: this.formAddEvent.value["title"],
                color: color,
                actions: this.actions
            }
        );

        let createdEvent: Eventts = [
            {
                idEventCategory: parseInt(this.formAddEvent.value["eventType"].split("-")[0]),
                idPlanning: 1,
                label: this.formAddEvent.value["title"],
                start: start + (!noTimeStart ? ":00" : " 00:00:00"),
                end: end + (!noTimeEnd ? ":00" : " 00:00:00")
            }
        ]

        this.subscriptions.push(
            this.eventApi.create(createdEvent[0])
                .subscribe()
        )

        this.events.forEach(element => {
            console.log(element);

        });
    }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
            }
            this.viewDate = date;
        }
    }

    eventTimesChanged({
        event,
        newStart,
        newEnd,
    }: CalendarEventTimesChangedEvent): void {
        this.events = this.events.map((iEvent) => {
            if (iEvent === event) {
                return {
                    ...event,
                    start: newStart,
                    end: newEnd,
                };
            }
            return iEvent;
        });
        this.handleEvent('Dropped or resized', event);
    }

    handleEvent(action: string, event: CalendarEvent): void {
        this.modalData = { event, action };
        this.modal.open(this.modalContent, { size: 'lg' });
    }

    addEvent(): void {
        this.events = [
            ...this.events,
            {
                title: 'New event',
                start: startOfDay(new Date()),
                end: endOfDay(new Date()),
                color: colors.red,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true,
                },
            },
        ];
    }

    deleteEvent(eventToDelete: CalendarEvent) {
        this.events = this.events.filter((event) => event !== eventToDelete);
    }

    setView(view: CalendarView) {
        this.view = view;
    }

    closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
    }

    openModal(content: any) {
        this.newEventModal.open(content, { ariaLabelledBy: 'Ajouter un nouvel évenemment' })
    }
}