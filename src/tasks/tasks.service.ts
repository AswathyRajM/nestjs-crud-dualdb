import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  public async createTask(createTaskDto: CreateTaskDto) {
    return await this.taskRepository.save(createTaskDto);
  }

  public async findAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  public async findOneTask(id: number): Promise<Task> {
    return await this.taskRepository.findOne({ where: { id } });
  }

  public async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.findOneTask(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.taskRepository.update({ id }, updateTaskDto);
    return task;
  }

  public async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
