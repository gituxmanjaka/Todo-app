import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Task} from '../../models/Task';
import {MatDialog} from '@angular/material/dialog';
import {DetailsTaskComponent} from '../../dialog/details-task/details-task.component';
import * as moment from 'moment';
import {AlertRemoveComponent} from '../../dialog/alert-remove/alert-remove.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit, AfterViewInit, OnChanges{
  @Input() tasks: Task[];
  dataSource = new MatTableDataSource<Task>();
  @Output() doneEvent: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() editEvent: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() deleteEvent: EventEmitter<Task> = new EventEmitter<Task>();
  readonly moment = moment;
  displayedColumns: string[] = ['id', 'title', 'isDone', 'createdAt', 'doneAt', 'actions'];
  @Input() a;
  b: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.b = this.a;
    console.log('*******ListTaskComponent onInit********');
    this.dataSource.data = this.tasks;
  }

  ngAfterViewInit(): void{
    console.log('*******ListTaskComponent afterViewInit********');
    this.dataSource.paginator = this.paginator;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('*******ListTaskComponent onChanges********', changes);
    this.dataSource.data = this.tasks;
  }

  done(task: Task): void {
    if (task.isDone) {return;}
    this.doneEvent.emit(task);
  }

  remove(task: Task): void {
    const sub = this.dialog.open(AlertRemoveComponent, {data: task})
      .afterClosed().subscribe(confirm => {
        if (confirm) {
          this.deleteEvent.emit(task);
        }
      }).add(() => sub.unsubscribe());
  }

  edit(task: Task): void {
    this.editEvent.emit(task);
  }

  showMore(task: Task): void {
    this.dialog.open(DetailsTaskComponent, {
      data: task
    });
  }

}
