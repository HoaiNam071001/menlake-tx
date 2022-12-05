import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
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
export class TxTableComponent implements OnInit, OnChanges {
  @Input() numberStr = '';
  @Input() keyword = '';

  numbers: number[] = [];
  columns: TxCell[][] = [];
  maxArr = [0, 1, 2, 3, 4];
  searchIndexs: StartEndIndex[] = [];

  selectedIndex!: StartEndIndex;
  constructor(
    protected clipboardService: ClipboardService,
  ) {
    this.resetSelectedIndex();
  }


  ngOnInit(): void {
    // this.fetchData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes', changes);
    this.fetchData();
  }

  resetSelectedIndex() {
    this.selectedIndex = {
      startIndex: -1,
      endIndex: -1,
    };
  }

  fetchData() {
    this.resetSelectedIndex();
    this.convertData();
  }

  convertData() {
    this.columns = [];
    this.numbers = this.numberStr.split(',').map(e => +e) || [];
    this.updateSearchIndex(this.numbers);
    this.getColumns();
  }

  getColumns(){
    const arr: TxCell[] = [];
    this.numbers.forEach((num, index) => {
      const isTai = this.isTai(num);
      const alias = isTai ? 'T' : 'X';
      const isAllTai = arr.every(e => this.isTai(e.num));

      // if (arr.length > 0 && (isTai !== isAllTai || this.numbers.length === index + 1)) {
      if (arr.length > 0 && isTai !== isAllTai) {
        this.pushColumns(arr);
      }

      arr.push({
        num,
        alias,
        index
      });

      if (this.numbers.length === index + 1) {
        this.pushColumns(arr);
      }
    });
  }

  pushColumns(arr: TxCell[] = []) {
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

  updateSearchIndex(numbers: number[]) {
    const searchNums = this.keyword.toUpperCase().split(',').map(e => +e || e);
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

  refresh() {
    this.resetSelectedIndex();
  }

  isSearchedCell(cell: TxCell) {
    return cell && this.searchIndexs.some(e => {
      return e.startIndex <= cell.index && cell.index <= e.endIndex;
    });
  }

  onClickCell(cell: TxCell, event: MouseEvent) {
    // if (!cell || !event.shiftKey) {
    if (!cell) {
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

  isSelectedCell(cell: TxCell) {
    if (!cell) { return false; }

    const index = cell?.index;

    if (this.selectedIndex.startIndex === index && this.selectedIndex.endIndex === -1) {
      return true;
    }

    return this.selectedIndex.startIndex <= index && index <= this.selectedIndex.endIndex;
  }

  get selectedCells() {
    return this.numbers.filter((e, index) => this.selectedIndex.startIndex <= index && index <= this.selectedIndex.endIndex);
  }

  clipboard() {
    this.clipboardService.copy(this.selectedCells.toString());
  }
}
