import { EntitiesFeatureHomepageModule } from '@angular-monorepo/entities/feature-homepage';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AvatarModule,
    PanelMenuModule,
    BadgeModule,
    SidebarModule,
    ButtonModule,
    AvatarGroupModule,
    EntitiesFeatureHomepageModule,
    ToastModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
