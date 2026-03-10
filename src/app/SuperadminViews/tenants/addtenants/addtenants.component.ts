// addtenants.component.ts - YOUR EXACT STRUCTURE + VALIDATION
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SHARED_IMPORTS } from '../../../components/sharedImport';
import { UserService } from '../../../pages/user/userservice/user.service';
import { TenantService } from '../tenantService/tenant.service';

@Component({
  selector: 'app-addtenants',
  imports: [RouterLink, SHARED_IMPORTS],
  templateUrl: './addtenants.component.html',
  styleUrl: './addtenants.component.css',
})
export class AddtenantsComponent {
  tenantForm: FormGroup;
  tenant: any = [];
  tenantId: string = '';
  imageBase64: string | null = null;
  previewUrl: string | null = null;
  selectedFile: File | null = null;

  // NEW: Validation + Loading
  isSubmitting = false;
  isDragOver = false;
  imageError = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private tenantService: TenantService
  ) {
    this.tenantForm = this.fb.group({
      tenantName: ['', [Validators.required, Validators.minLength(2)]],
      tenantPhoneNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      heroImage: [''],
      bio: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // NEW FIELDS FROM SCREENSHOT - DON'T BREAK YOUR FORM

    });
  }

  OnSubmit() {
    if (this.tenantForm.invalid) {
      console.log('Please Fill Form Correctly');
      this.markAllTouched(); // Show all errors
      return;
    }

    this.isSubmitting = true;

    const formData = new FormData();

    // YOUR EXACT FORM DATA + NEW FIELDS
    formData.append('tenantName', this.tenantForm.value.tenantName);
    formData.append('tenantPhoneNo', this.tenantForm.value.tenantPhoneNo);
    formData.append('bio', this.tenantForm.value.bio);
    formData.append('email', this.tenantForm.value.email);

 

    // YOUR EXACT IMAGE LOGIC
    if (this.selectedFile) {
      formData.append('heroImage', this.selectedFile);
    }
    else if (this.tenantId && this.tenant?.heroImage) {
      formData.append('existingImage', this.tenant.heroImage);
    }

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    this.tenantService.createTenant(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigateByUrl('/superadmin/tenant');
        this.tenantForm.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        console.log(err);
        this.isSubmitting = false;
      }
    });
  }

  // YOUR EXACT IMAGE METHODS - FIXED
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput?.click();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;

    if (!event.dataTransfer?.files.length) return;

    const file = event.dataTransfer.files[0];
    if (!file.type.startsWith('image/')) {
      this.imageError = 'Image only';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.imageError = 'Max 5MB';
      return;
    }

    this.selectedFile = file;
    this.previewUrl = URL.createObjectURL(file);
    this.tenant.existingImage = null;
    this.imageError = '';
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.imageError = 'Image only';
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        this.imageError = 'Max 5MB';
        return;
      }

      this.selectedFile = file;
      this.previewUrl = URL.createObjectURL(file);
      this.tenant.existingImage = null;
      this.tenantForm.patchValue({ heroImage: '' });
      this.imageError = '';
    }
  }

  // NEW: Validation helpers
  markAllTouched() {
    Object.keys(this.tenantForm.controls).forEach(key => {
      this.tenantForm.get(key)?.markAsTouched();
    });
  }

  resetForm() {
    this.tenantForm.reset();
    this.clearImage();
  }

  clearImage() {
    this.selectedFile = null;
    this.previewUrl = null;
    this.imageError = '';
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.value = '';
  }
}
