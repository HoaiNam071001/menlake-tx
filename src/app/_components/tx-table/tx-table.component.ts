import { Component, Input, OnInit } from '@angular/core';

export interface StartEndIndex {
  startIndex: number;
  endIndex: number;
}

export interface TxCell {
  num: number;
  alias: string;
  index: number;
}

@Component({
  selector: 'app-tx-table',
  templateUrl: './tx-table.component.html',
  styleUrls: ['./tx-table.component.scss']
})
export class TxTableComponent implements OnInit {
  @Input() numberStr = '';
  @Input() searchStr = 'T,X,T,X';

  numbers: number[] = [];
  columns: TxCell[][] = [];
  maxArr = [0, 1, 2, 3, 4];
  searchIndexs: StartEndIndex[] = [];

  selectedIndex!: StartEndIndex;
  constructor() {
    this.resetSelectedIndex();
  }


  ngOnInit(): void {
    this.fetchData();
  }

  resetSelectedIndex() {
    this.selectedIndex = {
      startIndex: -1,
      endIndex: -1,
    };
  }

  fetchData() {
    this.createData();
    this.convertData();
  }

  createData() {
    const arr = [];
    for (let index = 0; index < 200; index++) {
      const random = this.random();
      arr.push(random);
    }

    this.numberStr = arr.join(',');
  }

  convertData() {
    this.columns = [];
    this.numbers = this.numberStr.split(',').map(e => +e) || [];
    this.updateSearchIndex(this.numbers);

    const arr: TxCell[] = [];
    this.numbers.forEach((num, index) => {
      const isTai = this.isTai(num);
      const alias = isTai ? 'T' : 'X';
      const isAllTai = arr.every(e => this.isTai(e.num));

      if (arr.length > 0 && (isTai !== isAllTai || this.numbers.length === index + 1)) {
        const sodu = arr.length % 5;
        if (sodu > 0) {
          const nums = arr.splice(0, sodu);
          this.columns.push(nums);
        }

        while (arr.length > 0) {
          const nums = arr.splice(0, 5);
          this.columns.push(nums);
        }
      }

      arr.push({
        num,
        alias,
        index
      });
    });
    console.log('this.columns', this.columns);
  }


  updateSearchIndex(numbers: number[]) {
    const searchNums = this.searchStr.split(',').map(e => +e || e);
    this.searchIndexs = [];

    if (searchNums.length < 1) {
      return;
    }

    numbers.forEach((num, index) => {
      if (searchNums.every((n, i) => {
        return (n === numbers[index + i])
          || (n === 'X' && !this.isTai(numbers[index + i]))
          || (n === 'T' && this.isTai(numbers[index + i]));
      })) {
        this.searchIndexs.push({
          startIndex: index,
          endIndex: index + searchNums.length - 1,
        });
      }
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

  isSearchedCell(cell: TxCell) {
    return cell && this.searchIndexs.some(e => {
      return e.startIndex <= cell.index && cell.index <= e.endIndex;
    });
  }

  onClickCell(cell: TxCell, event: MouseEvent) {
    if (!cell || !event.shiftKey) {
      this.resetSelectedIndex();
      return;
    }

    const index = cell.index;

    if (this.selectedIndex.startIndex > index) {
      this.selectedIndex.endIndex = this.selectedIndex.startIndex;
      this.selectedIndex.startIndex = index;
      return;
    }

    if (this.selectedIndex.startIndex === -1 || this.selectedIndex.startIndex > index || this.selectedIndex.endIndex !== -1) {
      this.selectedIndex.startIndex = index;
      this.selectedIndex.endIndex = -1;
      return;
    }

    this.selectedIndex.endIndex = index;
  }

  isSelectedCell(index: number) {
    if (!index) { return false; }

    if (this.selectedIndex.startIndex === index && this.selectedIndex.endIndex === -1) {
      return true;
    }

    return this.selectedIndex.startIndex <= index && index <= this.selectedIndex.endIndex;
  }

  getSelectedCells() {
    return this.numbers.filter((e, index) => this.selectedIndex.startIndex <= index && index <= this.selectedIndex.endIndex);
  }
}
