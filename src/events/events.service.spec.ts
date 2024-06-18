import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Event } from '../entity/event.entity';
import { ConflictException } from '@nestjs/common';

describe('EventsService', () => {
  let service: EventsService;
  let mockEventRepository;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    mockEventRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      createQueryBuilder: jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn(),
      })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getRepositoryToken(Event),
          useValue: mockEventRepository,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  describe('createEvent', () => {
    it('should create and save a new event', async () => {
      const eventDto = {
        name: 'Test Event',
        startDate: '2023-01-01',
        endDate: '2023-01-01',
      };
      mockEventRepository
        .createQueryBuilder()
        .getOne.mockResolvedValueOnce(null);
      mockEventRepository.create.mockReturnValue(eventDto);
      mockEventRepository.save.mockResolvedValue(eventDto);

      expect(await service.createEvent(eventDto)).toEqual(eventDto);
      expect(mockEventRepository.create).toHaveBeenCalledWith(eventDto);
      expect(mockEventRepository.save).toHaveBeenCalledWith(eventDto);
    });

    it('should throw a conflict exception if event dates overlap', async () => {
      const eventDto = {
        name: 'Test Event',
        startDate: '2023-01-01',
        endDate: '2023-01-01',
      };
      mockEventRepository.createQueryBuilder.mockReturnValue({
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValueOnce(eventDto)
      });

      await expect(service.createEvent(eventDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAllEvents', () => {
    it('should return an array of events', async () => {
      const testEvents = [
        { name: 'Event 1', startDate: '2023-01-01', endDate: '2023-01-01' },
        { name: 'Event 2', startDate: '2023-01-02', endDate: '2023-01-02' },
      ];
      mockEventRepository.find.mockResolvedValue(testEvents);

      expect(await service.findAllEvents()).toEqual(testEvents);
    });
  });
});
