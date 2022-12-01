import { Component, Input, OnInit } from '@angular/core';

export interface SelectedPosition {
  colIndex: number;
  cellIndex: number;
}

export interface StartEndIndex {
  startIndex: number;
  endIndex: number;
}

@Component({
  selector: 'app-tx-table',
  templateUrl: './tx-table.component.html',
  styleUrls: ['./tx-table.component.scss']
})
export class TxTableComponent implements OnInit {
  @Input() numberStr = '';
  @Input() searchStr = '';

  columns: number[][] = [];
  maxArr = [0, 1, 2, 3, 4];
  searchPositions: SelectedPosition[] = [];
  searchIndexs: StartEndIndex[] = [];

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
    this.convertData();
    console.log('numberStr', this.numberStr);
    console.log('searchStr', this.searchStr);
    console.log('searchPositions', this.searchPositions);
  }

  createData() {
    const arr = [];
    const searchArr = [];
    this.searchStr = '';
    for (let index = 0; index < 200; index++) {
      const random = this.random();
      arr.push(random);

      if (index > 9 && index < 21) {
        searchArr.push(random);
      }
    }

    this.numberStr = arr.join(',');
    this.searchStr = searchArr.join(',');

    this.numberStr = '3,4,5,6,7,8,9,10,3,4,5,6,7,8,4,5,6';
    this.searchStr = '4,5,6';
  }

  convertData() {
    this.columns = [];
    this.searchPositions = [];
    const numbers = this.numberStr.split(',').map(e => +e);
    this.updateSearchIndex(numbers);

    const arr: number[] = [];
    numbers.forEach((num, index) => {
      const isTai = this.isTai(num);
      const isAllTai = arr.every(e => this.isTai(e));

      if (arr.length > 0 && (isTai !== isAllTai || numbers.length === index + 1)) {
        const sodu = arr.length % 5;
        if (sodu > 0) {
          const nums = arr.splice(0, sodu);
          this.addSearchPositions(this.columns.length, nums.length);
          this.columns.push(nums);
        }

        while (arr.length > 0) {
          const nums = arr.splice(0, 5);
          this.addSearchPositions(this.columns.length, nums.length);
          this.columns.push(nums);
        }
      }

      arr.push(num);
    });
  }


  updateSearchIndex(numbers: number[]) {
    const searchNums = this.searchStr.split(',').map(e => +e);
    console.log('searchNums', searchNums);
    this.searchIndexs = [];

    if (searchNums.length < 1) {
      return;
    }

    numbers.forEach((num, index) => {
      if (searchNums.every((n, i) => {
        return n === numbers[index + i];
      })) {
        this.searchIndexs.push({
          startIndex: index,
          endIndex: index + searchNums.length - 1,
        });
      }
    });

    console.log('searchIndexs', this.searchIndexs);
  }

  addSearchPositions(colIndex: number, cell: number) {
    // const searchStrIdx: number = this.searchStr ? this.numberStr.indexOf(this.searchStr) : -1;

    // if (searchStrIdx === -1) {
    //   return;
    // }

    // let cellIndex = 0;
    // while (cellIndex < length) {
    //   this.searchPositions.push({
    //     colIndex,
    //     cellIndex
    //   });
    //   cellIndex++;
    // }
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
    return Boolean(this.startCellIndex! && this.endCellIndex! && this.startColIndex! && this.endColIndex!
      && this.startColIndex! <= colIndex && colIndex <= this.endColIndex!);
    // return Boolean(this.startCellIndex && this.endCellIndex && this.startColIndex && this.endColIndex
    //   && this.startCellIndex <= cellIndex && cellIndex <= this.endCellIndex
    //   && this.startColIndex <= colIndex && colIndex <= this.endColIndex);
  }

  onClickCell(cellIndex: number, colIndex: number) {
    const value = this.columns[colIndex]?.[cellIndex];
    if (!value || this.startColIndex !== undefined && this.endColIndex !== undefined) {
      this.resetSelectedIndex();
    }
    // debugger

    if (this.startColIndex === undefined || colIndex <= this.startColIndex) {
      this.startColIndex = colIndex;
      this.startCellIndex = cellIndex;
      return;
    }

    this.endColIndex = colIndex;
    this.endCellIndex = cellIndex;
  }

  resetSelectedIndex() {
    console.log('reset');
    this.startColIndex = undefined;
    this.endColIndex = undefined;
    this.startCellIndex = undefined;
    this.endCellIndex = undefined;
  }

}
