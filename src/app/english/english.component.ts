import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-english',
  templateUrl: './english.component.html',
  styleUrls: ['./english.component.css']
})
export class EnglishComponent implements OnInit {
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
