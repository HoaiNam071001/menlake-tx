import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { TxTableComponent } from './_components/tx-table/tx-table.component';
import { MasterDataComponent } from './master-data/master-data.component';

@NgModule({
  declarations: [
    AppComponent,
    TxTableComponent,
    MasterDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
