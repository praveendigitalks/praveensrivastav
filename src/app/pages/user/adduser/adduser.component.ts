import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../userservice/user.service';
import { SHARED_IMPORTS } from '../../../components/sharedImport';

@Component({
  selector: 'app-adduser',
  imports: [RouterLink,SHARED_IMPORTS ],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css',
})
export class AdduserComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService : UserService, private router : Router) {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      age: [ Validators.required],
      contact_no: [ Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
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
