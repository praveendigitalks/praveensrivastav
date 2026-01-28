import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../userservice/user.service';
import { SHARED_IMPORTS } from '../../../components/sharedImport';
import { AuthService } from '../../../authentication/authservice/auth.service';
import { MODULE } from '../../../components/module';
import { ACTIONS } from '../../../components/permission';

@Component({
  selector: 'app-adduser',
  imports: [RouterLink,SHARED_IMPORTS ],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css',
})
export class AdduserComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService : UserService, private router : Router, private authService : AuthService) {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      age: [ Validators.required],
      contact_no: [ Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit(){
    if(!this.authService.hasActionPermission(MODULE.USER, ACTIONS.CREATE)){
      alert("You Are not Authorized to Acess this Mdoule");
      this.router.navigateByUrl("/user");
    }

  }

  OnSubmit() {
    if(this.userForm.invalid){
      console.log("Please Fill Form Correctly")
    }

    // console.log(this.userForm.value, "user data")
    this.userService.postUser(this.userForm.value).subscribe({
      next:(res)=>{
        console.log("🚀 ~ AdduserComponent ~ OnSubmit ~ res:", res)
        this.router.navigateByUrl("/user");
        this.userForm.reset();
      }, error : (err) =>{
        console.log("🚀 ~ AdduserComponent ~ OnSubmit ~ err:", err)

      }
    })
  }
}
