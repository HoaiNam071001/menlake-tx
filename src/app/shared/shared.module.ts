import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { CollapseDirective, CollapseModule } from 'ngx-bootstrap/collapse';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ClipboardModule } from 'ngx-clipboard';

const angularModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  ClipboardModule,
];

const libraryModules = [
  BsDatepickerModule,
  BsDropdownModule,
  AlertModule,
  TimepickerModule,
  ButtonsModule,
  ModalModule,
  TooltipModule,
  PopoverModule,
  TabsModule,
  AccordionModule,
  CollapseModule,
];
@NgModule({
  declarations: [
  ],
  imports: [
    ...angularModules,
    ...libraryModules,
  ],
  providers: [
  ],
  exports: [
    ...angularModules,
    ...libraryModules,
  ],
})
export class SharedModule { }
