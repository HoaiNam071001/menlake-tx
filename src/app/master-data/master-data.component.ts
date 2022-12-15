import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { validateInput } from '../shared/validatorString';
import { TxRequest } from '../_model/tx.model';
import { TxService } from '../_services/tx.service';

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: [
    './master-data.component.scss',
    '../_components/tx-table/tx-table.component.scss',
  ],
})
export class MasterDataComponent implements OnInit, OnDestroy {
  @ViewChild('textbox') textbox: ElementRef;
  form: FormGroup;
  inputs: number[] = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  resultNumber: string;
  resultTX: string;
  reqSub: Subscription;
  isSuccess = false;
  isFailure = false;
  constructor(private fb: FormBuilder, private txService: TxService) {}

  get textform() {
    return this.form.get('textform');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      textform: new FormControl('', [Validators.required, validateInput]),
    });
  }

  // onChangeHandler(event:any) {
  //   this.textbox.nativeElement.style.height = 'auto';
  //   this.textbox.nativeElement.style.height =
  //   (this.textbox.nativeElement.scrollHeight + 2) + 'px';
  // }

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
    const val: TxRequest = {
      numbers: this.form.getRawValue().textform,
      createdAt: new Date().toISOString(),
    };

    this.reqSub?.unsubscribe();

    this.reqSub = this.txService.add(val).subscribe((res) => {
      this.resultNumber = val.numbers;
      this.resultTX = this.convertTX(val.numbers.split(',')).toString();
      this.form.controls['textform'].setValue('');

      this.isSuccess = true;
      setTimeout(() => {
        this.isSuccess = false;
      }, 3000);
    },(err)=> {
      this.isFailure = true;
      setTimeout(() => {
        this.isFailure = false;
      }, 3000);
    });
  }

  convertTX(val: string[]) {
    return val.map((item) => (Number(item) <= 10 ? 'X' : 'T'));
  }

  ngOnDestroy(): void {
    this.reqSub?.unsubscribe();
  }
}
