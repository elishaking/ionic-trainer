import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Interview } from '../../models/interfaces';
import { Storage } from '@ionic/storage';
import { Media, MediaObject } from '@ionic-native/media';
import { RecordInterviewPage } from './record-interview/record-interview';

import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture';
import { getDayTime } from '../../models/functions';

@Component({
  selector: 'page-do-interview',
  templateUrl: 'do-interview.html',
})
export class DoInterviewPage {
  interviews: Interview[] = [];
  nInterviews = 0;

  playing = false;
  stopped = true;
  playObj: MediaObject;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastController, private media: Media, private storage: Storage,
    private mediaCapture: MediaCapture) {
    this.storage.get('interviews').then((interviews: Interview[]) => {
      if(interviews)
        this.interviews = interviews;
    });
  }

  ionViewDidLoad() {
    this.storage.get('nInterviews').then((nInterviews) => {
      this.nInterviews = nInterviews ? nInterviews : 0;
    });
  }

  ionViewDidEnter(){
    let videos = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('video-int');
    for(let i = 0; i < videos.length; i++){
      videos[i].style.height = videos[i].clientWidth + 'px';
    }
  }

  videoInterview(){
    this.mediaCapture.captureVideo({ limit: 1 }).then((video: MediaFile[]) => {
      let date = getDayTime();
      let interview: Interview = {
        title: 'Interview ' + (++this.nInterviews),
        name: video[0].fullPath,
        date: date[0] + " " + date[1],
        length: '',
        isVideo: true
      }
      this.interviews.unshift(interview);
      this.storage.set('interviews', this.interviews);
    });
  }

  recordInterview(){
    this.navCtrl.push(RecordInterviewPage, {
      'interviews': this.interviews
    });
  }

  togglePlay(){
    if(this.playing){
      this.playObj.pause();
      this.playing = false;
    } else{
      if(this.stopped){
        this.playObj = this.media.create('interview_2.3gp');
        this.stopped = false;
      }

      this.playObj.play();
      this.playing = true;
    }
  }

  stopPlay(){
    this.playing = false;
    this.stopped = true;
    this.playObj.stop();
    this.playObj.release();
  }

}
