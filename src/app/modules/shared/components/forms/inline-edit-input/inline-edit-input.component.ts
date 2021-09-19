import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalculatorService } from '../../../services/calculator.service';

@Component({
  selector: 'app-inline-edit-input',
  templateUrl: './inline-edit-input.component.html',
  styleUrls: ['./inline-edit-input.component.scss'],
})
export class InlineEditInputComponent implements OnInit {
  isEdit = false;
  @Input() value: string | number;
  @Input() type: 'text' | 'number' | 'currency' = 'text';
  @Input() currencyShowWords: boolean = false;
  @Input() name: string = 'some value';
  @Input() placeholder: string = 'Please enter ' + this.name;
  @Input() step: number = 1;
  @Input() disabled = false;
  @Input() max = 100000000000;
  @Output() valueChanged: EventEmitter<string | number> = new EventEmitter<string | number>();
  @Output() focus: EventEmitter<string | number> = new EventEmitter<string | number>();
  constructor() {}

  ngOnInit(): void {
    console.log(this.placeholder, this.max);
  }

  inputChange() {
    this.valueChanged.emit(this.value);
  }
  inwords(): string {
    return CalculatorService.inWords(this.value);
  }
}
