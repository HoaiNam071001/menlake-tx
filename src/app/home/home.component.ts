import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { forkJoin } from 'rxjs';
import { GameTypes } from '../_consts/consts';
import { TxSearchRecordsRequest, TxResponse, TxSearchRequest } from '../_model/tx.model';
import { TxService } from '../_services/tx.service';

export const sizes = [200, 300, 400, 500, 600];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('popup') popup: TemplateRef<any>;

  keyword = '';
  size = sizes[0];
  sizes = sizes;
  isAllToday = -1;
  txResponses: TxResponse[] = [];
  numberStr = '';
  GameTypes = GameTypes;
  modalRef!: BsModalRef;
  isBridge: boolean = false;
  gameTypeCtrl = new FormControl(GameTypes[0].value);
  searchTxResponses: TxResponse[] = [];
  searchBridgeResponses: TxResponse[] = [];
  selected: TxResponse;

  constructor(
    private txService: TxService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.fetch();
    // this.generateData();
  }

  fetch() {
    let payload: TxSearchRecordsRequest;
    if (this.size === this.isAllToday) {
      payload = {
        allDaysFlag: true,
        time: moment().format('YYYY-MM-DD'),
        type: this.gameTypeCtrl?.value
      };
    } else {
      payload = {
        numberOfRecords: this.size,
        type: this.gameTypeCtrl?.value
      };
    }

    this.txService.records(payload)
      .subscribe(res => {
        this.txResponses = res;
      });
  }

  changeSize(size: number) {
    this.size = size;
    this.refresh();

    this.search();
  }

  onKeywordChange(event: any) {
  }

  onSearch(input: any) {
    const keyword = input?.value || '';

    if (keyword && keyword !== this.keyword) {
      this.keyword = keyword;
    }

    this.search();
  }

  search() {
    if (!this.keyword) {
      this.resetSearchData();
      return;
    }

    const searchPayload: TxSearchRequest = {
      keyword: this.keyword,
      numberOfRecords: this.size === this.isAllToday ? null : this.size,
      type: this.gameTypeCtrl?.value,
    };

    forkJoin([
      this.txService.search(searchPayload),
      this.txService.searchBridge(searchPayload),
    ])
      .subscribe(
        (datas) => {
          this.searchTxResponses = datas[0];
          this.searchBridgeResponses = datas[1];
        },
        (error) => {
          this.resetSearchData();
        }
      );
  }

  resetSearchData() {
    this.searchTxResponses = [];
    this.searchBridgeResponses = [];
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

  getTimeUI(time: string) {
    return moment(time).format('HH:mm DD/MM/YYYY');
  }

  openModal(Tx: TxResponse, type: boolean) {
    this.isBridge = type;
    this.selected = Tx;
    this.modalRef = this.modalService.show(this.popup);
  }

  hide(){
    this.modalRef.hide();
  }
}
