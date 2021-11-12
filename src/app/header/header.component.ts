import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  previousid = 'list';

  constructor() { }

  ngOnInit(): void {

  }

  changePage(event : Event){
    const elementId: string = (event.target as Element).id;
    const element = document.getElementById(elementId);
    const previousElement = document.getElementById(this.previousid);

    if(previousElement)
      previousElement.classList.remove('active');

    if(element)
      element.classList.add('active');

    this.previousid = elementId;
  }

}
