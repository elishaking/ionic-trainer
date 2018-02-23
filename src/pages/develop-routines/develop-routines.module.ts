import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DevelopRoutinesPage } from './develop-routines';

@NgModule({
  declarations: [
    DevelopRoutinesPage,
  ],
  imports: [
    IonicPageModule.forChild(DevelopRoutinesPage),
  ],
})
export class DevelopRoutinesPageModule {}
