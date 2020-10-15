import { injectable, inject } from 'tsyringe';
import { getHours, isBefore, startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';

import SchedulesModel from '@models/SchedulesModel';
import ISchedulesRepository from '@modules/schedules/repositories/interfaces/ISchedulesRepository';
import ICreateScheduleDTO from '@modules/schedules/dtos/ICreateScheduleDTO';

@injectable()
export default class CreateScheduleService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: ICreateScheduleDTO): Promise<SchedulesModel> {
    const scheduleDate = startOfHour(date);

    if (user_id === provider_id) {
      throw new AppError(`You can't create a schedule for yourself`);
    }

    if (isBefore(scheduleDate, Date.now())) {
      throw new AppError(`You can't create a schedule in the past`);
    }

    if (getHours(scheduleDate) < 8 || getHours(scheduleDate) > 17) {
      throw new AppError(`You can't create a schedule in this hours`);
    }

    const thereIsScheduleOnTheSameDate = await this.schedulesRepository.findByDate(
      scheduleDate,
    );

    if (thereIsScheduleOnTheSameDate) {
      throw new AppError('This schedule is already taken', 400);
    }

    const schedule = await this.schedulesRepository.insert({
      provider_id,
      user_id,
      date: scheduleDate,
    });

    return schedule;
  }
}
