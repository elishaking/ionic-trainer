import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { MediaObject, Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-play-audio',
  templateUrl: 'play-audio.html',
})
export class PlayAudioPage {
  curr_playing_file: MediaObject;
  storageDirectory: any;

  is_playing: boolean = false;
  is_in_play: boolean = false;
  is_ready: boolean = false;

  message: any;

  duration: any = -1;
  duration_string: string;
  position: any = 0;

  get_duration_interval: any;
  get_position_interval: any;

  talkName = "";
  talkPath = "";

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private file: File,
    private media: Media) {
      // assign storage directory
      this.platform.ready().then(() => {
        if(this.platform.is('ios')) {
          this.storageDirectory = this.file.applicationStorageDirectory;
        } else if(this.platform.is('android')) {
          this.storageDirectory = this.file.externalDataDirectory;
        }

        this.talkName = this.navParams.get('talkName');
        this.talkPath = this.navParams.get('talkPath');
      });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad PlayAudioPage');
  }

  ionViewWillEnter(){
    // comment out the following line when adjusting UI in browsers
    this.prepareAudioFile();
  }

  prepareAudioFile() {
    this.platform.ready().then(() => {
      this.file.resolveDirectoryUrl(this.storageDirectory).then((resolvedDirectory) => {
        console.log("resolved  directory: " + resolvedDirectory.nativeURL);
        this.file.checkFile(resolvedDirectory.nativeURL, this.talkPath).then((data) => {
          if(data == true) {  // exist
            this.getDurationAndSetToPlay();
          } else {  // not sure if File plugin will return false. go to download
            console.log("not found!");
            throw {code: 1, message: "NOT_FOUND_ERR"};
          }
        }).catch(err => {
          console.log("Error occurred while checking local files:");
          console.error(JSON.stringify(err));
        });
      });
    });
  }

  createAudioFile(pathToDirectory, filename): MediaObject {
    if (this.platform.is('ios')) {  //ios
      return this.media.create((pathToDirectory).replace(/^file:\/\//, '') + '/' + filename);
    } else {  // android
      return this.media.create(pathToDirectory + filename);
    } 
  }

  getDurationAndSetToPlay() {
    this.curr_playing_file = this.createAudioFile(this.storageDirectory, this.talkPath);
    this.curr_playing_file.onError.subscribe((error)=> {
      console.error(JSON.stringify(error));
    });
    console.log(JSON.stringify(this.curr_playing_file));
    this.curr_playing_file.play();
    this.curr_playing_file.setVolume(0.0);  // you don't want users to notice that you are playing the file
    let self = this;
    this.get_duration_interval = setInterval(function() {
      if(self.duration == -1) {
        self.duration = ~~(self.curr_playing_file.getDuration());  // make it an integer
        // self.duration_string = self.fmtMSS(self.duration);   // replaced by the Angular DatePipe
      } else {
        self.curr_playing_file.stop();
        self.curr_playing_file.release();
        self.setRecordingToPlay();
        clearInterval(self.get_duration_interval);
      }
    }, 100);
  }

  getAndSetCurrentAudioPosition() {
    let diff = 1;
    let self = this;
    this.get_position_interval = setInterval(function() {
      let last_position = self.position;
      self.curr_playing_file.getCurrentPosition().then((position) => {
        if (position >= 0 && position < self.duration) {
          if(Math.abs(last_position - position) >= diff) {
            // set position
            self.curr_playing_file.seekTo(last_position*1000);
          } else {
            // update position for display
            self.position = position;
          }
        } else if (position >= self.duration) {
          self.stopPlayRecording();
          self.setRecordingToPlay();
        }
      });
    }, 100);
  }

  setRecordingToPlay() {
    this.curr_playing_file = this.createAudioFile(this.storageDirectory, this.talkPath);
    this.curr_playing_file.onStatusUpdate.subscribe(status => {
      // 2: playing
      // 3: pause
      // 4: stop
      this.message = status;
      switch(status) {
        case 1:
          this.is_in_play = false;
          break;
        case 2:   // 2: playing
          this.is_in_play = true;
          this.is_playing = true;
          break;
        case 3:   // 3: pause
          this.is_in_play = true;
          this.is_playing = false;
          break;
        case 4:   // 4: stop
        default:
          this.is_in_play = false;
          this.is_playing = false;
          break;
      }
    })
    console.log("audio file set");
    this.message = "audio file set";
    this.is_ready = true;
    this.getAndSetCurrentAudioPosition();
  }

  playRecording() {
    this.curr_playing_file.play();
  }

  pausePlayRecording() {
    this.curr_playing_file.pause();
  }

  stopPlayRecording() {
    this.curr_playing_file.stop();
    this.curr_playing_file.release();
    clearInterval(this.get_position_interval);
    this.position = 0;
  }

  controlSeconds(action) {
    let step = 15;
    
    let number = this.position;
    switch(action) {
      case 'back':
        this.position = number < step ? 0.001 : number - step;
        break;
      case 'forward':
        this.position = number + step < this.duration ? number + step : this.duration;
        break;
      default:
        break;
    }
  }

  fmtMSS(s){   // accepts seconds as Number or String. Returns m:ss
    return( s -         // take value s and subtract (will try to convert String to Number)
            ( s %= 60 ) // the new value of s, now holding the remainder of s divided by 60 
                        // (will also try to convert String to Number)
          ) / 60 + (    // and divide the resulting Number by 60 
                        // (can never result in a fractional value = no need for rounding)
                        // to which we concatenate a String (converts the Number to String)
                        // who's reference is chosen by the conditional operator:
            9 < s       // if    seconds is larger than 9
            ? ':'       // then  we don't need to prepend a zero
            : ':0'      // else  we do need to prepend a zero
          ) + s ;       // and we add Number s to the string (converting it to String as well)
  }

}
