import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit {
@Input() message!:string
@Output() end = new EventEmitter<void>()
  constructor() { }

  ngOnInit(): void {
  }

  close(){
    this.end.emit()
  }
}
