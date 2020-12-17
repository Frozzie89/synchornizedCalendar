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

    events: CalendarEvent[] = [
        // {
        //     start: startOfDay(new Date()),
        //     end: addDays(new Date(), 1),
        //     title: 'An event with no end date',
        //     color: colors.yellow,
        //     actions: this.actions,
        // }
    ];

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


    constructor(
        private modal: NgbModal,
        private newEventModal: NgbModal,
        private fb: FormBuilder,
        private eventTypeApi: EventTypeApiService
    ) { }

    ngOnInit(): void {
        this.subscriptions.push(
            this.eventTypeApi.query()
                .subscribe(eventTypes => this.eventTypes = eventTypes)
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(element => {
            element.unsubscribe()
        });
    }

    writeEvent() {
        const start = this.formAddEvent.value["dateStart"] + " " + this.formAddEvent.value["timeStart"];
        const end = this.formAddEvent.value["dateEnd"] + " " + this.formAddEvent.value["timeEnd"];
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