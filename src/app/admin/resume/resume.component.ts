import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
  users: any;

  constructor(
    private active: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.active.params.subscribe(params => {
      this.users = params['id'];
    })
  }

}
