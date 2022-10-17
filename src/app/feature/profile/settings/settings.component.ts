import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/shared/services/user/user.auth';
import { GlobalServiceService } from 'src/app/shared/services/global/global.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  resetPasswordForm: FormGroup; 
oldPwd: any;
confirmPwd: any;
newPwd: any;
submitted:boolean=false;
isOldPasswordCorrect:boolean = false;
isMatch:boolean = false;
  constructor(private userAuth:UserAuthService , fb: FormBuilder) { 
    this.resetPasswordForm = fb.group({
      'oldPwd': ['',Validators.required],
      'newPwd': ['',Validators.required],
      'confirmPwd': ['',Validators.required]
    });
  }
  get oldPassword(){
    return this.resetPasswordForm.get('oldPwd');
  }

  get newPassword(){
    return this.resetPasswordForm.get('newPwd');
  }

  ngOnInit(): void {

    
  }
  
  public matchpassword():void{
    console.log(this.resetPasswordForm.value)
  
    if (this.resetPasswordForm.controls['oldPwd'].value != null) {
      this.resetPasswordForm.markAllAsTouched();    
    }
    let formValues = this.resetPasswordForm.value;
    let obj={    
      userName: localStorage.getItem('userEmail'),
      password:formValues.oldPwd
    }
     
    let updatePassword = {
      userId: localStorage.getItem('userId'),
      userName: localStorage.getItem('userEmail'),
      password:formValues.newPwd
    }
    this.userAuth.userSignIn(obj).subscribe((res)=>{
      let response:any = res;
      if(response.message ===null)
      {
        this.submitted=true;
        if (formValues.newPwd === formValues.confirmPwd && formValues.newPwd !=null && formValues.confirmPwd !==null) {
          this.userAuth.matchpassword(updatePassword).subscribe(res=>{
            console.log(res);
          })
        }else{
          this.isMatch = true;
        }
        this.isOldPasswordCorrect = false;
      }else{
        formValues.oldPwd != ""? this.isOldPasswordCorrect = true : '';
        //console.log(formValues.oldPwd)
      }
    })
    
    
  }

 
  
}
