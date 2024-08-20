import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {
  users: any

  constructor(
    private renderer: Renderer2,
    private active: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const script = this.renderer.createElement('script');
    script.src = 'assets/js/index.js';
    this.renderer.appendChild(document.body, script);

    this.active.paramMap.subscribe(data => {
      this.users = data.get('id')
    })
  }

}
