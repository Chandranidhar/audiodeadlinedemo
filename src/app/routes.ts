import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from '../app/homepage/homepage.component';
import {Home1Component} from '../app/home1/home1.component';

const approutes: Routes = [

  {path: '', component: HomepageComponent },
  {path: 'home1', component: Home1Component}
];
export const appRoutingProviders: any = [ ];
export const routing: ModuleWithProviders = RouterModule.forRoot(approutes, { useHash: true });
