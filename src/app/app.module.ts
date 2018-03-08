import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule, Injector } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule } from '@ionic/storage';

import { Media } from '@ionic-native/media';
import { MediaCapture } from '@ionic-native/media-capture';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { EmailComposer } from '@ionic-native/email-composer';

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

// import { FirebaseProvider } from '../providers/firebase/firebase';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireModule } from 'angularfire2';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { InterviewDetailsPage } from '../pages/do-interview/interview-details/interview-details';
import { PepTalkDetailsPage } from '../pages/produce-pep-talks/pep-talk-details/pep-talk-details';
import { ContactUsPage } from '../pages/contact-us/contact-us';
 
const firebaseConfig = {
  apiKey: "AIzaSyBfn3exrL4oCh_c7jX2nLoxPJri7QHZ9aw",
  authDomain: "bd-tough.firebaseapp.com",
  databaseURL: "https://bd-tough.firebaseio.com",
  projectId: "bd-tough",
  storageBucket: "bd-tough.appspot.com",
  messagingSenderId: "296357447594"
};

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
    PepTalkDetailsPage,

    LogProgressPage,
    CreateLogPage,

    DevelopRoutinesPage,
    CreateRoutinePage,

    DoInterviewPage,
    InterviewDetailsPage,
    RecordInterviewPage,

    TrackCharacterPage,
    SetUpTrackerPage,

    HaveFaithPage,

    ContactUsPage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    HttpModule,
    // AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp, {
      mode: 'wp'
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
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
    PepTalkDetailsPage,

    LogProgressPage,
    CreateLogPage,

    DevelopRoutinesPage,
    CreateRoutinePage,

    DoInterviewPage,
    InterviewDetailsPage,
    RecordInterviewPage,

    TrackCharacterPage,
    SetUpTrackerPage,

    HaveFaithPage,

    ContactUsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
    Media,
    MediaCapture,
    LocalNotifications,
    EmailComposer
    // FirebaseProvider,
  ]
})

export class AppModule {
  static injector: Injector;

    constructor(injector: Injector) {    
      // Make the injector to be available in the entire module
      AppModule.injector = injector;    
    }
}
