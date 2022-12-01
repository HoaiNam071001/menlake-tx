import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tx-table',
  templateUrl: './tx-table.component.html',
  styleUrls: ['./tx-table.component.scss']
})
export class TxTableComponent implements OnInit {
  @Input() numberStr = '';

  columns: number[][] = [];
  maxArr = [0, 1, 2, 3, 4];

  startCellIndex: number | undefined;
  endCellIndex: number | undefined;
  startColIndex: number | undefined;
  endColIndex: number | undefined;
  constructor() { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.createData();
    console.log('numberStr', this.numberStr);
    this.convertData();
  }

  createData() {
    const arr = [];
    for (let index = 0; index < 200; index++) {
      arr.push(this.random());
    }

    this.numberStr = arr.join(',');
  }

  convertData() {
    this.columns = [];
    const numbers = this.numberStr.split(',').map(e => +e);
    const arr: number[] = [];
    numbers.forEach((num, index) => {


      const isTai = this.isTai(num);
      const isAllTai = arr.every(e => this.isTai(e));

      if (arr.length > 0 && (isTai !== isAllTai || numbers.length === index + 1)) {
        const sodu = arr.length % 5;
        if (sodu > 0) {
          this.columns.push(arr.splice(0, sodu));
        }

        while (arr.length > 0) {
          this.columns.push(arr.splice(0, 5));
        }
      }

      arr.push(num);
    });
  }

  isTai(x = 0) {
    return x > 10;
  }

  isXiu(x = 0) {
    return !this.isTai(x);
  }

  random(min = 3, max = 18) {

    // find diff
    const difference = max - min;

    // generate random number
    let rand = Math.random();

    // multiply with difference
    rand = Math.floor(rand * difference);

    // add with min value
    rand = rand + min;

    return rand;
  }

  refresh() {
    this.resetSelectedIndex();
    this.fetchData();
  }

  isSelectedCell(cellIndex: number, colIndex: number) {
    if (colIndex > 5) {
      return false;
    }
    // console.log('cellIndex', cellIndex);
    console.log('colIndex', colIndex);
    return Boolean(this.startCellIndex && this.endCellIndex && this.startColIndex && this.endColIndex
      // && this.startCellIndex <= cellIndex && cellIndex <= this.endCellIndex
      && this.startColIndex <= colIndex && colIndex <= this.endColIndex);
  }

  onClickCell(cellIndex: number, colIndex: number) {
    const value = this.columns[colIndex]?.[cellIndex];
    console.log(cellIndex, colIndex);
    console.log('value', value);
    if (!value || (this.startCellIndex && this.endCellIndex)) {
      this.resetSelectedIndex();
    }
    // debugger

    if (this.startCellIndex === undefined) {
      this.startCellIndex = cellIndex;
      this.startColIndex = colIndex;
      return;
    }

    this.endCellIndex = cellIndex;
    this.endColIndex = colIndex;
  }

  resetSelectedIndex() {
    console.log('reset');
    this.startCellIndex = undefined;
    this.startColIndex = undefined;
    this.endCellIndex = undefined;
    this.endCellIndex = undefined;
  }

}
