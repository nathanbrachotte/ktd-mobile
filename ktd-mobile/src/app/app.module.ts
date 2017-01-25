import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { UsersPage } from '../pages/users/users';
import { MenuPage } from '../pages/menu/menu';
import { PresetPage } from '../pages/preset/preset';
import { AddPage } from '../pages/add/add';
import { ServicePage } from '../pages/service/service';
import { GlobalVariables } from '../services/global_variables';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UsersPage,
    MenuPage,
    PresetPage,
    AddPage,
    ServicePage

  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UsersPage,
    MenuPage,
    PresetPage,
    AddPage,
    ServicePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler, }, GlobalVariables]
})
export class AppModule {}
