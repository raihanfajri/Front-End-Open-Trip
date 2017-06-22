import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllChat } from './all-chat';

@NgModule({
  declarations: [
    AllChat,
  ],
  imports: [
    IonicPageModule.forChild(AllChat),
  ],
  exports: [
    AllChat
  ]
})
export class AllChatModule {}
