import { Component } from '@angular/core';
import { AuthService } from '../../../authentication/authservice/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MODULE } from '../../../components/module';
import { ACTIONS } from '../../../components/permission';
import { SHARED_IMPORTS } from '../../../components/sharedImport';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addabout',
  imports: [RouterLink, SHARED_IMPORTS],
  templateUrl: './addabout.component.html',
  styleUrl: './../about.component.css',
})
export class AddaboutComponent {
  aboutForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.aboutForm = this.fb.group({
      position: ['', Validators.required],
      description: [''],
      dob: ['', Validators.required],
      phone: [''],
      city: [''],
      state: [''],
      country: [''],
      degree: [''],
      email: [''],
    });
  }

  ngOnInit() {
    if (!this.authService.hasActionPermission(MODULE.ABOUT, ACTIONS.CREATE)) {
      alert('You are not Authorized to Access this Module!');
      this.router.navigateByUrl('/about');
    }
  }

  OnSubmit() {}

  // image uplaod

  selectedFile: File | null = null;

  triggerFileInput() {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    fileInput?.click();
  }



   onDragOver(event: any) {
    event.preventDefault();
  }



  previewUrl: string | null = null;

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
  this.aboutForm.patchValue({ file: this.selectedFile });

  if (this.selectedFile) {
    const reader = new FileReader();
    reader.onload = (e: any) => this.previewUrl = e.target.result;
    reader.readAsDataURL(this.selectedFile);
  }
}

onDrop(event: any) {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  if (file.type.startsWith('image/')) {
    this.selectedFile = file;
    this.aboutForm.patchValue({ file: this.selectedFile });
    const reader = new FileReader();
    reader.onload = (e: any) => this.previewUrl = e.target.result;
    reader.readAsDataURL(file);
  }
}

}
