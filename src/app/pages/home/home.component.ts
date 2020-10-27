import {Component, OnInit} from '@angular/core';
import {Task} from '../../models/Task';
import * as moment from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allTask: Array<Task> = [];
  editMe: Task;

  constructor() {
  }

  ngOnInit(): void {
    console.log('*******homeComponent onInit********');

    for (let i = 1; i < 5; i++) {
      this.allTask.push({
          id: i,
          description: '',
          createdAt: moment().subtract(i * 2, 'days').startOf('day').toDate(),
          doneAt: i % 2 === 0 ? moment().subtract(i, 'days').startOf('day').toDate() : null,
          title: 'Angular ' + i * 2,
          isDone: i % 2 === 0
        },
      );
    }
    // Recuperation des tasks depuis la base de donnee
    // Mettre les donnees dans allTask
  }

  onAdd(newTask: Task): void {
    this.allTask.push({...newTask, id: this.allTask.length + 1, createdAt: new Date()});
    this.allTask = this.allTask.filter(x => true);
  }

  onDone(taskToBeDone: Task): void {
    const task = this.allTask.find(task => task.id === taskToBeDone.id);
    task.isDone = true;
    task.doneAt = new Date();
  }

  onDelete(id: number): void {
    this.allTask = this.allTask.filter(task => task.id !== id);
  }

  onEdit(taskToEdit: Task): void {
    this.editMe = {...taskToEdit};
  }

  handleEdit(editedTask: Task): void {
    const task = this.allTask.find(task => task.id === editedTask.id);
    task.description = editedTask.description;
    task.title = editedTask.title;
  }
}
