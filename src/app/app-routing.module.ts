import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './providers/guards/auth';

import { HomeComponent }  from './modules/main/components/home/home.component';
import { LoginComponent } from './modules/main/components/login/login.component';
import { AboutComponent } from './modules/main/components/about/about.component';
import { ModulesComponent } from './modules/modules/modules.component';
import { SliderComponent } from './modules/modules/components/slider/slider.component';
import { FormsComponent } from './modules/modules/components/forms/forms.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'module', component: ModulesComponent, canActivate: [authGuard] },
  { path: 'module/slider/:id', component: SliderComponent, canActivate: [authGuard] },
  { path: 'module/forms/:id', component: FormsComponent, canActivate: [authGuard] },

  // { path: 'main',
  //   loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule) },
  // { path: 'main', component: MainComponent },
  // { path: 'slider',
  //   loadChildren: () => import('./modules/slider/slider.module').then(m => m.SliderModule),
  //   canActivate: [AuthGuard] },

  { path: '**', redirectTo: '/home' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
