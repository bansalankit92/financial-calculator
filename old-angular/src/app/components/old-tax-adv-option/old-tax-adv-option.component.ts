import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OldRegime } from '../../models/old-regime19';

@Component({
  selector: 'app-old-tax-adv-option',
  templateUrl: './old-tax-adv-option.component.html',
  styleUrls: ['./old-tax-adv-option.component.scss']
})
export class OldTaxAdvOptionComponent implements OnInit {

  @Input() oldRegime:OldRegime;
  @Output() inputChanged = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  inputChange() {
    this.inputChanged.emit(true);
  }

}
