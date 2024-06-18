import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('date', { unique: true })
  startDate: string;

  @Column('date', { unique: true })
  endDate: string;
}

