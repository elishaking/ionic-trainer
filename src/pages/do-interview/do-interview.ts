import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, PopoverController, ModalController } from 'ionic-angular';
import { Interview, Activity } from '../../models/interfaces';
import { Storage } from '@ionic/storage';
import { Media, MediaObject } from '@ionic-native/media';
import { RecordInterviewPage } from './record-interview/record-interview';

import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture';
import { getDayTime } from '../../models/functions';
import { InterviewDetailsPage } from './interview-details/interview-details';

@Component({
  selector: 'page-do-interview',
  templateUrl: 'do-interview.html',
})
export class DoInterviewPage {
  interviews: Interview[] = [];
  nInterviews = [0];

  playObj: MediaObject;

  checked: boolean[] = [];
  showDeleteBtn = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastController, private media: Media, private storage: Storage,
    private mediaCapture: MediaCapture, private modalCtrl: ModalController) {
    this.storage.get('interviews').then((interviews: Interview[]) => {
      if(interviews){
        this.interviews = interviews;
        this.updateChecked();
      }
    });
  }

  ionViewDidLoad() {
    this.storage.get('nInterviews').then((nInterviews) => {
      this.nInterviews[0] = nInterviews ? nInterviews : 0;
    });
  }

  ionViewDidEnter(){
    let videos = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('video-int');
    for(let i = 0; i < videos.length; i++){
      videos[i].style.height = videos[i].clientWidth + 'px';
    }
  }

  toggleChecked(){
    this.showDeleteBtn = this.checked.indexOf(true) != -1;
  }

  updateChecked(){
    for(let i = 0; i < this.interviews.length; i++){
      this.checked.push(false);
    }
  }

  videoInterview(){
    let interviewDetails = {
      title: '',
      description: ''
    }
    let modal = this.modalCtrl.create(InterviewDetailsPage, {
      'interview': interviewDetails
    });
    modal.present();

    modal.onDidDismiss(() => {
      if(interviewDetails.title != ''){
        this.mediaCapture.captureVideo({ limit: 1 }).then((video: MediaFile[]) => {
          let date = getDayTime();
          let interview: Interview = {
            title: interviewDetails.title,
            description: interviewDetails.description,
            name: video[0].fullPath,
            date: date[0] + " " + date[1],
            length: '',
            isVideo: true
          }
          this.interviews.unshift(interview);
          this.storage.set('nInterviews', this.nInterviews[0]);
          this.storage.set('interviews', this.interviews).then(() => {
            this.storage.get('activities').then((activities: Activity[]) => {
              let a = activities ? activities : [];
              a.unshift({
                title: 'Recorded new Interview - video',
                date: date[0] + " " + date[1]
              });
              this.storage.set('activities', a);
            });
          });
        });
      }
    });
  }

  recordInterview(){
    this.navCtrl.push(RecordInterviewPage, {
      'interviews': this.interviews,
      'nInterviews': this.nInterviews
    });
  }

  delete(){
    for(let i = 0; i < this.interviews.length; i++){
      if(this.checked[i] == true){
        this.interviews.splice(i, 1);
        this.checked.splice(i, 1);
        i--;
      }
    }
    this.storage.set('interviews', this.interviews);
    this.showDeleteBtn = false;
  }

}
