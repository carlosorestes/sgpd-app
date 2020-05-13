import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterListPipe } from './filter-list.pipe';

@NgModule({
  declarations: [FilterListPipe],
  imports: [
    CommonModule
  ],
  exports: [FilterListPipe]
})
export class UtilsModule { }
