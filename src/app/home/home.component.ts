import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TxSearchRequest, TxSearchResponse } from '../_model/tx.model';
import { TxService } from '../_services/tx.service';

export const sizes = [200, 300, 400, 500, 600];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  keyword = '';
  size = sizes[0];
  sizes = sizes;
  isAllToday = -1;
  txResponses: TxSearchResponse[] = [];
  numberStr = '';

  constructor(
    private txService: TxService,
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.fetch();
    // this.generateData();
  }

  fetch() {
    let payload: TxSearchRequest;
    if (this.size === this.isAllToday) {
      payload = {
        allDaysFlag: true,
        time: moment().format('YYYY-MM-DD'),
      };
    } else {
      payload = {
        numberOfRecords: this.size,
      };
    }

    this.txService.search(payload)
      .subscribe(res => {
        this.txResponses = res;
      // this.numberStr = res.map(e => e.numbers).join(',');
      console.log('this.numberStr', this.txResponses.map(e => e.numbers));
    });
  }

  changeSize(size: number) {
    this.size = size;
    this.refresh();
  }

  onKeywordChange(event: any) {
  }

  onSearch(input: any) {
    const keyword = input?.value || '';

    if (keyword && keyword !== this.keyword) {
      this.keyword = keyword;
    }
  }

  generateData() {
    const arr = [];
    for (let index = 0; index < this.size; index++) {
      const random = this.random();
      arr.push(random);
    }

    this.numberStr = arr.join(',');
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

}
