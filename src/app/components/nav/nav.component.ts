import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  openDrawer = false;
  @Output() openDrawerToggle = new EventEmitter<boolean>(); 
  constructor() { }

  ngOnInit(): void {
  }

  toggleDrawer(){
    this.openDrawer = !this.openDrawer;
    this.openDrawerToggle.emit(this.openDrawer);
  }

}
