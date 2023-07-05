import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesComponent } from './modules.component';

import { SliderComponent } from './components/slider/slider.component';

@NgModule({
  declarations: [
    ModulesComponent,
    SliderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModulesModule { }
