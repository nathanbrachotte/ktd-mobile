import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { KTDAppRootComponent } from './ktd-app-root/ktd-app-root.component';
import { KTDSessionPageComponent } from './ktd-app-root/ktd-session-page.component';
import { KTDTracklistPageComponent } from './ktd-app-root/ktd-tracklist-page.component';


const appRoutes: Routes = [
  { path: 'session', component: KTDSessionPageComponent },
  { path: 'session/:id', component: KTDTracklistPageComponent },
  { path: '', component: KTDSessionPageComponent },
  { path: '**', component: KTDSessionPageComponent }
];


@NgModule({
  declarations: [
    KTDAppRootComponent,
    KTDSessionPageComponent,
    KTDTracklistPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  bootstrap: [KTDAppRootComponent],
  providers: []
})
export class AppModule {}
