import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { TxTableComponent } from './_components/tx-table/tx-table.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrightComponent } from './bright/bright.component';

import { HomeComponent } from './home/home.component';
import { StandardBridgeComponent } from './standard-bridge/standard-bridge.component';

@NgModule({
  declarations: [
    AppComponent,
    TxTableComponent,
    MasterDataComponent,
    BrightComponent,
    HomeComponent,
    StandardBridgeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
