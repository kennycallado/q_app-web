import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesComponent } from './modules.component';

import { SliderComponent } from './components/slider/slider.component';

@NgModule({
  declarations: [
    ModulesComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModulesModule { }
