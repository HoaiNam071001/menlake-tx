import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { validateInput } from '../shared/validatorString';

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.scss'],
})
export class MasterDataComponent implements OnInit {
  @ViewChild('textbox') textbox: ElementRef;
  form: FormGroup;
  inputs: number[] = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  constructor(private fb: FormBuilder) {}

  get textform() {
    return this.form.get('textform');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      textform: new FormControl('', [Validators.required, validateInput]),
    });
  }

  onChangeHandler(event:any) {
    this.textbox.nativeElement.style.height = 'auto';
    this.textbox.nativeElement.style.height =
    (this.textbox.nativeElement.scrollHeight + 2) + 'px';
  }

  textCusorEnd() {
    if (this.textbox) {
      let end = this.textbox.nativeElement;
      let len = end.value.length;
      if (end.setSelectionRange) {
        end.focus();
        end.setSelectionRange(len, len);
      } else if (end.createTextRange) {
        var t = end.createTextRange();
        t.collapse(true);
        t.moveEnd('character', len);
        t.moveStart('character', len);
        t.select();
      }
    }
  }

  add(input: number) {
    const end = this.textform?.value[this.textform?.value.length - 1];
    const newValue =
      this.textform?.value === ''
        ? input
        : this.textform?.value + (end !== ',' ? ',' : '') + input;
    this.form.controls['textform'].setValue(newValue);
    this.textCusorEnd();

  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const formValue: string = this.form.getRawValue().text;
    console.log(formValue);
    console.log(formValue.split(','));
    // this.form.controls['textform'].reset();
  }

  subStart(index: number) {
    return this.textform?.value?.slice(0, index);
  }
  subEnd(index: number) {
    return this.textform?.value?.slice(index);
  }
}
