import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-science',
  templateUrl: './science.component.html',
  styleUrls: ['./science.component.css']
})
export class ScienceComponent implements OnInit {
  topic:string = '';
  title:string = '';
  body: string = '';

  entries = [];

  onSubmit(){
    this.entries.push({topic: this.topic, title: this.title, body: this.body});
    this.topic = '';
    this.title = '';
    this.body = '';
    console.log(this.entries)
  };

  constructor() { }

  ngOnInit(): void {
  }

}
