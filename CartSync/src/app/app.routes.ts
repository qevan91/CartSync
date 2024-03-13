import { Routes } from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {ConnectionPageComponent} from "./connection-page/connection-page.component";

export const routes: Routes = [
  {
    path: 'mainPage',
    component: MainPageComponent,
  },
  {
    path: 'connectionPage',
    component: ConnectionPageComponent,
  },
];
