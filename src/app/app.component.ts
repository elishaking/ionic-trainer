import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
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
  @ViewChild(Nav) nav: Nav;

  rootPage:any = SignupPage;
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
      { title: 'Produce PEP talks', component: ProducePepTalksPage, icon: "pulse" }
    ];

    this.currentPage[0] = this.pages[0];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component == null) {
      // let currentPage = this.nav.getActive().instance;
      // // console.log(home);
      // this.app.getRootNav().push(HistoryPage, {
      //   'hist_selection': currentPage.histSelection,
      //   'hist_pos': currentPage.histPos,
      //   'tab': currentPage.tab,
      //   'call_page': this.currentPage
      // });
    } else {
      // console.log(page, this.currentPage[0]);
      if (page != this.currentPage[0]) {
        this.currentPage[0] = page;
        this.nav.setRoot(page.component);
      }
      // this.menu.close();
    }
  }
}

