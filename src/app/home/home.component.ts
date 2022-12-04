import { Component, OnInit } from '@angular/core';

export const sizes = [200, 300, 400, 500, 600];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  numberStr = '';
  keyword = '';
  size = sizes[0];
  sizes = sizes;

  constructor() { }

  ngOnInit(): void {
    this.refresh();
  }


  refresh() {
    this.generateData();
  }

  changeSize(size: number) {
    this.size = size;
    this.refresh();
  }

  onKeywordChange(event: any) {
    console.log(event);
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
