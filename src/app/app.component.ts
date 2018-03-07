import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { CreateIdentityPage } from '../pages/create-identity/create-identity';
import { CommitToTodayPage } from '../pages/commit-to-today/commit-to-today';
import { ProducePepTalksPage } from '../pages/produce-pep-talks/produce-pep-talks';
import { LogProgressPage } from '../pages/log-progress/log-progress';
import { DevelopRoutinesPage } from '../pages/develop-routines/develop-routines';
import { DoInterviewPage } from '../pages/do-interview/do-interview';
import { TrackCharacterPage } from '../pages/track-character/track-character';
import { HaveFaithPage } from '../pages/have-faith/have-faith';
import { RecordTalkPage } from '../pages/produce-pep-talks/record-talk/record-talk';
import { SigninPage } from '../pages/signin/signin';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;
  pages: Array<{ title: string, component: any, icon: string }>;
  currentPage = [];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private loadingCtrl: LoadingController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Home', component: HomePage, icon: "home" },
      { title: 'Create Identity', component: CreateIdentityPage, icon: "contact" },
      { title: 'Commit to Today', component: CommitToTodayPage, icon: "list" },
      { title: 'Produce PEP talks', component: ProducePepTalksPage, icon: "chatbubbles" },
      { title: 'Log Progress', component: LogProgressPage, icon: "analytics" },
      { title: 'Develop Routines', component: DevelopRoutinesPage, icon: "paper" },
      { title: 'Do Interview', component: DoInterviewPage, icon: "microphone" },
      { title: 'Track Character', component: TrackCharacterPage, icon: "podium" },
      { title: 'Have Faith', component: HaveFaithPage, icon: "rose" },
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
        let userRef = this.nav.getActive().instance.userRef
        this.currentPage[0] = page;
        this.nav.setRoot(page.component, {
          'userRef': userRef
        });
      }
      // this.menu.close();
    }
  }

  signOut(){
    let loader = this.loadingCtrl.create({
      content: "Signing Out...",

    });
    loader.present();

    setTimeout(()=>{
      loader.dismiss();
      this.nav.setRoot(SigninPage);
    }, 500);
  }
}

