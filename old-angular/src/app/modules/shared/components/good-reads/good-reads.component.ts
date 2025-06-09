import { Component, OnInit, Input } from '@angular/core';
import { GoodReads } from '../../models/good-reads';

@Component({
  selector: 'app-good-reads',
  templateUrl: './good-reads.component.html',
  styleUrls: ['./good-reads.component.scss']
})
export class GoodReadsComponent implements OnInit {
  
  @Input() links:GoodReads[]=[];

  constructor() { }

  ngOnInit(): void {
  }

}
