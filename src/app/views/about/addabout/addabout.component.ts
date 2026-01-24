import { Component } from '@angular/core';
import { AuthService } from '../../../authentication/authservice/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MODULE } from '../../../components/module';
import { ACTIONS } from '../../../components/permission';
import { SHARED_IMPORTS } from '../../../components/sharedImport';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AboutService } from '../aboutservice/about.service';

@Component({
  selector: 'app-addabout',
  imports: [RouterLink, SHARED_IMPORTS],
  templateUrl: './addabout.component.html',
  styleUrl: './../about.component.css',
})
export class AddaboutComponent {
  aboutForm: FormGroup;
  imageBase64: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private aboutService: AboutService
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
      email: ['']
    });
  }

  ngOnInit() {
    if (!this.authService.hasActionPermission(MODULE.ABOUT, ACTIONS.CREATE)) {
      alert('You are not Authorized to Access this Module!');
      this.router.navigateByUrl('/about');
    }
  }

OnSubmit() {
  if (this.aboutForm.invalid || !this.selectedFile) {
    alert('Form or image missing');
    return;
  }

  const formData = new FormData();

  formData.append('position', this.aboutForm.value.position);
  formData.append('description', this.aboutForm.value.description);
  formData.append('dob', this.aboutForm.value.dob);
  formData.append('phone', this.aboutForm.value.phone);
  formData.append('city', this.aboutForm.value.city);
  formData.append('state', this.aboutForm.value.state);
  formData.append('country', this.aboutForm.value.country);
  formData.append('degree', this.aboutForm.value.degree);
  formData.append('email', this.aboutForm.value.email);

  // 🔥 THIS IS THE KEY LINE
  formData.append('image', this.selectedFile);

  this.aboutService.postAbout(formData).subscribe({
    next: () => {
      this.aboutForm.reset();
      this.selectedFile = null;
      this.previewUrl = null;
      this.router.navigateByUrl('/about');
    },
    error: err => console.error(err)
  });
}



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

 onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (!input.files || !input.files[0]) return;

  this.selectedFile = input.files[0];

  const reader = new FileReader();
  reader.onload = () => {
    this.previewUrl = reader.result as string;
  };
  reader.readAsDataURL(this.selectedFile);
}

 onDrop(event: DragEvent): void {
  event.preventDefault();
  if (!event.dataTransfer?.files.length) return;

  const file = event.dataTransfer.files[0];
  if (!file.type.startsWith('image/')) return;

  this.selectedFile = file;

  const reader = new FileReader();
  reader.onload = () => {
    this.imageBase64 = reader.result as string;
    this.previewUrl = this.imageBase64;
  };
  reader.readAsDataURL(file);
}

}
