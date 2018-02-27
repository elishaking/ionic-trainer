import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Routine, Activity } from '../../../models/interfaces';
import { getDayTime } from '../../../models/functions';

@Component({
  selector: 'page-create-routine',
  templateUrl: 'create-routine.html',
})
export class CreateRoutinePage {
  createRoutineForm: FormGroup;

  submitText = 'Next';
  submitTry = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage, private toastCtrl: ToastController) {
    this.createRoutineForm = new FormBuilder().group({
      title: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]*$/), Validators.maxLength(2000)])],
      stepsList: ['', Validators.compose([Validators.maxLength(2000)])],
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CreateRoutinePage');
  }

  save(){
    this.submitTry = true;

    if(this.createRoutineForm.valid){
      this.submitTry = false;

      let date = getDayTime();
      let routine: Routine = this.createRoutineForm.value;
      let routines: Routine[] = this.navParams.get('routines');
      routines.unshift({
        title: routine.title,
        stepsList: routine.stepsList
      });
      this.navParams.get('checked').unshift(false);

      this.storage.set('routines', routines).then(() => {
        this.storage.get('activities').then((activities: Activity[]) => {
          let a = activities ? activities : [];
          a.push({
            title: 'Created New Routine',
            date: date[0] + " " + date[1]
          });
          this.storage.set('activities', a);
        });
        this.navCtrl.pop();
      }, () => {
        this.toastCtrl.create({
          message: "Unable to create routine, Please try again",
          duration: 3000,
          dismissOnPageChange: true
        }).present();
      });
    }
  }

  close(){
    this.navCtrl.pop();
  }

}
