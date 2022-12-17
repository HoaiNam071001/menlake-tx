import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ClipboardService } from 'ngx-clipboard';
import { validateInput } from '../shared/validatorString';
import { TxTableComponent } from '../_components/tx-table/tx-table.component';

@Component({
  selector: 'app-bright',
  templateUrl: './bright.component.html',
  styleUrls: ['./bright.component.scss', '../_components/tx-table/tx-table.component.scss','../master-data/master-data.component.scss']
})
export class BrightComponent extends TxTableComponent implements OnInit {
  @ViewChild('textbox') textbox: ElementRef;
  form: FormGroup;
  inputs: number[] = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  modalRef!: BsModalRef;
  resultNumber: string;
  resultTX: string;
  length: number = 0;

  constructor(private fb: FormBuilder, private modalService: BsModalService,    protected clipboardService: ClipboardService,
    ) {
    super(clipboardService);
  }

  get textform() {
    return this.form.get('textform');
  }
  get name() {
    return this.form.get('name');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      textform: new FormControl('', [Validators.required, validateInput]),
      name: new FormControl('', [Validators.required]),
    });
  }

  change(){
    this.length = String(this.textform?.value).split(",").length || 0;
  }

  convertData() {
    this.numberStr = String(this.textform?.value);
    this.columns = [];
    this.numbers = this.numberStr.split(',').map(e => +e) || [];
    this.getColumns();
  }

  textCusorEnd() {
    if (this.textbox?.nativeElement?.value) {
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
    if (this.textform?.valid) this.convertData();
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const formValue: string = this.form.getRawValue().textform;
    this.resultNumber = formValue;
    const TX: string[] = this.convertTX(formValue.split(','));
    this.resultTX = TX.toString();
  }

  convertTX(val: string[]) {
    return val.map((item) => (Number(item) <= 10 ? 'X' : 'T'));
  }

  openModal(template: TemplateRef<any>) {
    this.convertData();
    this.modalRef = this.modalService.show(template);
  }

  reset(){
    this.form.controls['textform'].reset('');
    this.form.controls['name'].reset('');
    this.convertData();
  }

  hide(){
    this.modalRef.hide();
    this.reset();
  }
}
