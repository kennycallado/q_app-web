import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './modules/layout/layout.module';

import { AppComponent } from './app.component';

import { ModulesComponent } from './modules/modules/modules.component';

@NgModule({
  declarations: [
    AppComponent,
    ModulesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
