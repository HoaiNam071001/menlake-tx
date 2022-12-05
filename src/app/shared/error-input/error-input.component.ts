import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-input',
  templateUrl: './error-input.component.html',
  styleUrls: ['./error-input.component.scss']
})
export class ErrorInputComponent implements OnInit {
  @Input() textform!: AbstractControl | null;
  constructor() { }

  ngOnInit(): void {
  }
  subStart(index: number) {
    return this.textform?.value?.slice(0, index);
  }
  subEnd(index: number) {
    return this.textform?.value?.slice(index);
  }
}
