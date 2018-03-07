import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { DisableSideMenu } from '../../custom-decorators/disable-side-menu.decorator';
import { HomePage } from '../home/home';
import { SigninPage } from '../signin/signin';
import { User, UserDetails } from '../../models/interfaces';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@DisableSideMenu()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signUpForm: FormGroup;

  submitTry = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: Http, private loadingCtrl: LoadingController, private toastCtrl: ToastController,
    private afAuth: AngularFireAuth, private afDb: AngularFireDatabase) {
    this.signUpForm = new FormBuilder().group({
      name: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/), Validators.maxLength(50)])],
      sport: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/), Validators.maxLength(50)])],
      level: ['P'],
      school: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/), Validators.maxLength(50)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9\.\_]*@[a-zA-Z0-9\.\_]*\.[a-zA-Z0-9\.\_]*$/), Validators.maxLength(150)])],
      phoneNumber: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      confirmPassword: ['', Validators.compose([Validators.required, (control)=>{
        let form = control.parent;
        if(form && form.value.password != control.value){
          return {
            passwordMismatch: {
              mismatch: 'password mismatch'
            }
          }
        }
        return null;
      }])],
      // phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(30)])],
      gender: ['M']
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SignupPage');
  }

  ionViewDidEnter(){
    // let pageWidth = document.getElementById('logo').clientWidth;
    // let forms = document.getElementsByClassName('form-container');
    // for(let i = 0; i < forms.length; i++){
    //   (<HTMLElement>forms[i]).style.width = pageWidth + 'px';
    // }
  }

  passwordStrength = '';
  strengthColor = '';

  checkPasswordStrength(){
    let strong = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;
    let medium = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/;
    let password = this.signUpForm.value.password;
    if(strong.test(password)){
      this.passwordStrength = 'strong';
      this.strengthColor = 'green';
    } else if(medium.test(password)){
      this.passwordStrength = 'medium';
      this.strengthColor = 'yellow';
    } else{
      this.passwordStrength = 'weak';
      this.strengthColor = 'red';
    }
  }
  
  async signUp(){
    this.submitTry = true;
    if(this.signUpForm.valid){
      let loading = this.loadingCtrl.create({
        content: 'Creating account',
        enableBackdropDismiss: true
      });
      loading.present();

      try{
        let user: User = {
          email: this.signUpForm.value.email,
          password: this.signUpForm.value.password
        }
        const result = await this.afAuth.auth.createUserWithEmailAndPassword(
          user.email,
          user.password
        );
        if (result) {
          let users: AngularFireList<UserDetails> = this.afDb.list('/users');
          
          let userRef = await users.push({
            id: result.uid,
            name: this.signUpForm.value.name,
            level: this.signUpForm.value.level,
            sport: this.signUpForm.value.sport,
            school: this.signUpForm.value.school,
            phoneNumber: this.signUpForm.value.phoneNumber
          });
          loading.dismiss();
          this.navCtrl.setRoot(HomePage, {
            'userRef': userRef
          });
        }  
      } catch (e) {
        loading.dismiss();
        this.toastCtrl.create({
          message: "Error occurred during sign up",
          duration: 3000,
        }).present();
        console.error(e);
      }

      // setTimeout(()=>{
      //   loading.dismiss();
      //   this.navCtrl.push(HomePage);
      // }, 3000);
    }
  }

  signIn(){
    this.navCtrl.push(SigninPage);
  }

}

// var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
// ref.authWithPassword({
//   email    : "bobtony@firebase.com",
//   password : "invalid-password"
// }, function(error, authData) {
//   if (error) {
//     switch (error.code) {
//       case "INVALID_EMAIL":
//         console.log("The specified user account email is invalid.");
//         break;
//       case "INVALID_PASSWORD":
//         console.log("The specified user account password is incorrect.");
//         break;
//       case "INVALID_USER":
//         console.log("The specified user account does not exist.");
//         break;
//       default:
//         console.log("Error logging user in:", error);
//     }
//   } else {
//     console.log("Authenticated successfully with payload:", authData);
//   }
// });
