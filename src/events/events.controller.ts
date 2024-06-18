import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @Get()
  getEvents() {
    return this.eventsService.findAllEvents();
  }
}
