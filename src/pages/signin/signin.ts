import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupPage } from '../signup/signup';

import { User, UserDetails } from '../../models/interfaces';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  signInForm: FormGroup;
  submitTry = false;

  userDetails: UserDetails;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl: LoadingController, private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase, private storage: Storage) {
      this.signInForm = new FormBuilder().group({
        email: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9\.\_]*@[a-zA-Z0-9\.\_]*\.[a-zA-Z0-9\.\_]*$/), Validators.maxLength(150)])],
        password: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      });
  }

  ionViewDidLoad() {
  }

  async signIn(){
    this.submitTry = true;
    if(this.signInForm.valid){
      let loading = this.loadingCtrl.create({
        content: 'Signing In',
        enableBackdropDismiss: true
      });
      loading.present();

      try{
        let user: User = {
          email: this.signInForm.value.email,
          password: this.signInForm.value.password
        }
        const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
        if (result) {
          console.log('id', result.uid);
          this.afDb.database.ref('users')
            .orderByChild('id').equalTo(result.uid)
            .once('child_added', (data) => {
              this.userDetails = data.val();
              console.log(this.userDetails);
            });
          loading.dismiss();
          // this.navCtrl.setRoot(HomePage, {
          //   'userDetails': this.userDetails
          // });
          this.storage.set('loggedIn', true);
          this.navCtrl.setRoot(HomePage);
        }  
      }
      catch (e) {
        loading.dismiss();
        console.error(JSON.stringify(e));
      }
      // setTimeout(()=>{
      //   loading.dismiss();
      //   this.navCtrl.setRoot(HomePage);
      // }, 3000);
    }
  }

  signUp(){
    // review - pop or push
    this.navCtrl.push(SignupPage);
  }

}
