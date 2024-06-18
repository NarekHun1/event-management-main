import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateEventDto } from './create-event.dto';
import { Event } from '../entity/event.entity';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const { name, startDate, endDate } = createEventDto;

    const conflict = await this.eventRepository
      .createQueryBuilder('event')
      .where('event.startDate <= :endDate AND event.endDate >= :startDate', {
        startDate,
        endDate,
      })
      .getOne();

    if (conflict) {
      this.logger.error(
        `Event dates conflict with an existing event. startDate - ${startDate} endDate - ${endDate}`,
      );
      throw new ConflictException(
        'Event dates conflict with an existing event.',
      );
    }

    const event = this.eventRepository.create({ name, startDate, endDate });
    return this.eventRepository.save(event);
  }

  async findAllEvents(): Promise<Event[]> {
    return this.eventRepository.find();
  }
}
