import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-standard-bridge',
  templateUrl: './standard-bridge.component.html',
  styleUrls: ['./standard-bridge.component.scss'],
})
export class StandardBridgeComponent extends HomeComponent implements OnInit {
  @ViewChild('popup') popup: TemplateRef<any>;

  ngOnInit(): void {}

}
