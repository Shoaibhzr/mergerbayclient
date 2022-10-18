import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/shared/services/user/user.auth';
import { GlobalServiceService } from 'src/app/shared/services/global/global.service';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/forms/form-seller.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  resetPasswordForm: FormGroup; 
  notificationSettingForm: FormGroup; 
  oldPwd: any;
  confirmPwd: any;
  newPwd: any;
  submitted:boolean=false;
  isOldPasswordCorrect:boolean = false;
  isMatch:boolean = false;
    constructor(private userAuth:UserAuthService , fb: FormBuilder,private form: FormService,private router: Router) { 
    }
  ngOnInit(): void {
    this.resetPasswordForm=this.form.initChangedPassword();
    this.notificationSettingForm=this.form.initNewNotificationSetting();
    this.getSetting();
  }

  get oldPassword(){
    return this.resetPasswordForm.get('oldPwd');
  }
  get newPassword(){
    return this.resetPasswordForm.get('newPwd');
  }

  get reEnterPassword(){
    return this.resetPasswordForm.get('confirmPwd');
  }

  public matchpassword():void{
    console.log(this.resetPasswordForm.value)
    if (!this.resetPasswordForm.valid && !this.resetPasswordForm?.pending) {
      for (const control of Object.keys(this.resetPasswordForm.controls)) {
        this.resetPasswordForm.controls[control].markAsTouched();
      }
      setTimeout(() => {
        const collection = document.getElementsByClassName('field_error');
        let el_offsetTop =
          collection[0].getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: el_offsetTop, behavior: 'smooth' });
      }, 100);
      return;
    }
    this.submitted=true;
    //if(this.resetPasswordForm.valid)
   // {
      let formValues=this.resetPasswordForm.value;
      const body = {
        user_Id:localStorage.getItem('userId'),
        password:formValues.confirmPwd
     }
   this.userAuth
     .changePassword(body)
     .subscribe(
       (data:any) => {
        console.log(data);
        localStorage.setItem('existingpassword',formValues.confirmPwd);
        this.router.navigate(['/settings']);
       
       },
       (error:any) => {
         // this.toastr.error(
         //   "Something went wrong while processing your request",
         //   "Error"
         // );
       }
     );
     // }
    
    
  }
  public saveSetting():void{
    console.log(this.notificationSettingForm.value)
    let formValues=this.notificationSettingForm.value;
    const body = {
      user_Id:localStorage.getItem('userId'),
      isPendingAction:formValues.IsPending,
      isFeatureRequirements:formValues.IsFeature
   }
 this.userAuth
   .notificationSetting(body)
   .subscribe(
     (data:any) => {
      console.log(data);
      this.router.navigate(['/settings']);
     
     },
     (error:any) => {
       // this.toastr.error(
       //   "Something went wrong while processing your request",
       //   "Error"
       // );
     }
   );

  }

  public getSetting():void{
    const body = {
      user_Id:localStorage.getItem('userId'),
      isPendingAction:true,
      isFeatureRequirements:true
   }
 this.userAuth
   .getNotificationSetting(body)
   .subscribe(
     (data:any) => {
      console.log(data);  
      this.notificationSettingForm.controls['IsPending'].patchValue(data['isFeatureRequirements']);   
      this.notificationSettingForm.controls['IsFeature'].patchValue(data['isPendingAction']);    
      
     },
     (error:any) => {
       // this.toastr.error(
       //   "Something went wrong while processing your request",
       //   "Error"
       // );
     }
   );

  }


}
