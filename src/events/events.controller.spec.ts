import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsController', () => {
  let controller: EventsController;
  let mockEventsService;

  beforeEach(async () => {
    mockEventsService = {
      createEvent: jest.fn(),
      findAllEvents: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: mockEventsService,
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  describe('create', () => {
    it('should call EventsService.createEvent and return the result', async () => {
      const createEventDto = {
        name: 'Event Name',
        startDate: '2023-01-01',
        endDate: '2023-01-01',
      };
      const eventResponse = { ...createEventDto, id: 1 };

      mockEventsService.createEvent.mockResolvedValue(eventResponse);

      expect(await controller.create(createEventDto)).toEqual(eventResponse);
      expect(mockEventsService.createEvent).toHaveBeenCalledWith(
        createEventDto,
      );
    });
  });

  describe('getEvents', () => {
    it('should call EventsService.findAllEvents and return the result', async () => {
      const eventResponse = [
        {
          id: 1,
          name: 'Event 1',
          startDate: '2023-01-01',
          endDate: '2023-01-01',
        },
        {
          id: 2,
          name: 'Event 2',
          startDate: '2023-01-02',
          endDate: '2023-01-02',
        },
      ];

      mockEventsService.findAllEvents.mockResolvedValue(eventResponse);

      expect(await controller.getEvents()).toEqual(eventResponse);
      expect(mockEventsService.findAllEvents).toHaveBeenCalled();
    });
  });
});
