import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule, Injector } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Firebase } from '@ionic-native/firebase';
import { IonicStorageModule } from '@ionic/storage';

import { Media } from '@ionic-native/media';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { CreateIdentityPage } from '../pages/create-identity/create-identity';
import { ProducePepTalksPage } from '../pages/produce-pep-talks/produce-pep-talks';

import { CommitToTodayPage } from '../pages/commit-to-today/commit-to-today';
import { CreateTaskPage } from '../pages/commit-to-today/create-task/create-task';

import { LogProgressPage } from '../pages/log-progress/log-progress';
import { CreateLogPage } from '../pages/log-progress/create-log/create-log';

import { DevelopRoutinesPage } from '../pages/develop-routines/develop-routines';
import { CreateRoutinePage } from '../pages/develop-routines/create-routine/create-routine';

import { DoInterviewPage } from '../pages/do-interview/do-interview';
import { TrackCharacterPage } from '../pages/track-character/track-character';
import { SetUpTrackerPage } from '../pages/track-character/set-up-tracker/set-up-tracker';
import { HaveFaithPage } from '../pages/have-faith/have-faith';
import { RecordTalkPage } from '../pages/produce-pep-talks/record-talk/record-talk';
import { RecordInterviewPage } from '../pages/do-interview/record-interview/record-interview';
import { SigninPage } from '../pages/signin/signin';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    SigninPage,
    CreateIdentityPage,

    CommitToTodayPage,
    CreateTaskPage,
    
    ProducePepTalksPage,
    RecordTalkPage,

    LogProgressPage,
    CreateLogPage,

    DevelopRoutinesPage,
    CreateRoutinePage,

    DoInterviewPage,
    RecordInterviewPage,

    TrackCharacterPage,
    SetUpTrackerPage,

    HaveFaithPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    SigninPage,
    CreateIdentityPage,

    CommitToTodayPage,
    CreateTaskPage,

    ProducePepTalksPage,
    RecordTalkPage,

    LogProgressPage,
    CreateLogPage,

    DevelopRoutinesPage,
    CreateRoutinePage,

    DoInterviewPage,
    RecordInterviewPage,

    TrackCharacterPage,
    SetUpTrackerPage,

    HaveFaithPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
    Firebase,
    Media
  ]
})

export class AppModule {
  static injector: Injector;

    constructor(injector: Injector) {    
      // Make the injector to be available in the entire module
      AppModule.injector = injector;    
    }
}
