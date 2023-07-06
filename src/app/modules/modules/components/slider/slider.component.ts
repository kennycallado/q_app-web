import { register } from 'swiper/element/bundle'

import { CommonModule } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.sass'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // imports: [CommonModule, InputComponent, MediaComponent],
  imports: [CommonModule]
})
export class SliderComponent implements OnInit, AfterViewInit{

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    register()
  }
}
