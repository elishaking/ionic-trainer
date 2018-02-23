import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { CreateIdentityPage } from '../pages/create-identity/create-identity';
import { CommitToTodayPage } from '../pages/commit-to-today/commit-to-today';
import { ProducePepTalksPage } from '../pages/produce-pep-talks/produce-pep-talks';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  pages: Array<{ title: string, component: any, icon: string }>;
  currentPage = [];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Home', component: HomePage, icon: "calculator" },
      { title: 'Create Identity', component: CreateIdentityPage, icon: "list-box" },
      { title: 'Commit to Today', component: CommitToTodayPage, icon: "grid" },
      { title: 'Produce pep talks', component: ProducePepTalksPage, icon: "pulse" }
    ];

    this.currentPage[0] = this.pages[0];
  }
}

