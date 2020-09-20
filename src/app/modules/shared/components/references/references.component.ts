import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss']
})
export class ReferencesComponent implements OnInit {

  @Input() links:string[]=[];
  constructor() { }

  ngOnInit(): void {
  }

}
