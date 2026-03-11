import { ACTIONS } from './../../../components/permission';
import { Component } from '@angular/core';
import { AuthService } from '../../../authentication/authservice/auth.service';
import { ContactService } from '../contactservice/contact.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MODULE } from '../../../components/module';
import { SHARED_IMPORTS } from '../../../components/sharedImport';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addcontact',
  imports: [RouterLink, SHARED_IMPORTS],
  templateUrl: './addcontact.component.html',
  styleUrl: './addcontact.component.css',
})
export class AddcontactComponent {
  contact: any = [];
  contactForm: FormGroup;
  isSubmitting = false;
  contactId: string = '';
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.contactForm = this.fb.group({
      email: [''],
      socialprofileSchema: this.fb.array([]),
      phone_no: [''],
      address: [''],
    });
  }

  ngOnInit() {
    if (
      !this.authService.hasActionPermission(MODULE.CONTACT, ACTIONS.CREATE) &&
      !this.authService.hasActionPermission(MODULE.CONTACT, ACTIONS.UPDATE)
    ) {
      alert('You are not Authorized to access this module');
      this.router.navigateByUrl('/contact');
    }

    // loadinng the data
    this.route.params.subscribe((params) => {
      this.contactId = params['contactId'];
      // console.log('ID', this.contactId);
      this.loadContactData(this.contactId);
    });
  }

  loadContactData(contactId: string) {
    this.contactService.getContactbyId(contactId).subscribe((res) => {
      this.contact = res;

      this.contactForm.patchValue({
        address: this.contact.address || '',
        phone_no: this.contact.phone_no || '',
        email: this.contact.email || '',
      });

      this.patchsociallinks();
    });
  }

  patchsociallinks() {
    // Clear existing controls
    this.socialprofileArray.clear();

    const profiles = this.contact?.socialprofileSchema;

    if (profiles && profiles.length > 0) {
      profiles.forEach((sp: any) => {
        const group = this.fb.group({
          social_link: [sp.social_link || '', Validators.required],
          icon: [sp.icon || ''],
          iconType: [sp.iconType || 'fontawesome'],
        });

        this.socialprofileArray.push(group);
      });
    }
  }

  // =================================================================================================================
  //social profile
  // =================================================================================================================

  get socialprofileArray(): FormArray {
    return this.contactForm.get('socialprofileSchema') as FormArray;
  }

  // ✅ Add new prior skill
  addsocialprofile() {
    const socialprofileForm = this.fb.group({
      social_link: ['', Validators.required],
      icon: [''], // ✅ New field
      iconType: ['fontawesome'], // ✅ New field
    });
    this.socialprofileArray.push(socialprofileForm);
  }

  // ✅ Remove priror skill
  removesocialprofile(index: number) {
    this.socialprofileArray.removeAt(index);
  }

  // technoilogy name
  // getskillName(index: number): string {
  //   return this.priorSkillArray.at(index)?.get('skillName')?.value || 'Skill';
  // }

  socialprofile() {
    // Clear existing controls
    this.socialprofileArray.clear();

    // Patch each skill from backend data
    if (
      this.contact.socialprofileSchema &&
      this.contact.socialprofileSchema.length > 0
    ) {
      this.contact.socialprofileSchema.forEach((skill: any) => {
        // ✅ FIX: Use ACTUAL backend values
        const socialprofile = this.fb.group({
          social_link: [skill.skillName || '', Validators.required], // ✅ skill.skillName
          icon: [skill.icon || ''], // ✅ skill.icon
          iconType: [skill.iconType || 'fontawesome'], // ✅ skill.iconType
        });

        this.socialprofileArray.push(socialprofile);
      });
    }
  }

  // =================================================================================================================
  // prior skill ends
  // =================================================================================================================
  // =================================================================================================================
  // Helper
  // =================================================================================================================
  getIconUrl(index: number): string {
    return this.socialprofileArray.at(index).get('icon')?.value || '';
  }

  // PRIOR SKILLS helpers (separate from webskills)
  getIconTypePrior(index: number): string {
    return (
      this.socialprofileArray.at(index)?.get('iconType')?.value || 'fontawesome'
    );
  }

  getIconClassPrior(index: number): string {
    return this.socialprofileArray.at(index)?.get('icon')?.value || '';
  }

  getIconUrlPrior(index: number): string {
    return this.socialprofileArray.at(index)?.get('icon')?.value || '';
  }

  // =================================================================================================================
  // Helperl ends
  // =================================================================================================================

  OnSubmit() {
    if (this.contactForm.invalid) {
      alert('Please fill required fields');
      return;
    }

    const formData = new FormData();

    // ✅ Basic fields
    formData.append('email', this.contactForm.value.email || '');
    formData.append('phone_no', this.contactForm.value.phone_no || '');
    formData.append('address', this.contactForm.value.address || '');

    // ✅ Social Profile  ARRAY - Convert to JSON string
    const socialprofileSchema = this.contactForm.value.socialprofileSchema.map(
      (skill: any) => ({
        social_link: skill.social_link || '',
        icon: skill.icon || '',
        iconType: skill.iconType,
      })
    );
    formData.append('socialprofileSchema', JSON.stringify(socialprofileSchema));

    // ✅ Submit based on create/update
    if (this.contactId) {
      this.contactService.updateContact(this.contactId, formData).subscribe({
        next: () => {
          this.resetForm();
          this.router.navigateByUrl('/contact');
        },
        error: (err) => console.error('Update failed:', err),
      });
    } else {
      this.contactService.postContact(formData).subscribe({
        next: () => {
          this.resetForm();
          this.router.navigateByUrl('/contact');
        },
        error: (err) => console.error('Create failed:', err),
      });
    }
  }

  resetForm() {
    this.contactForm.reset();
  }
}
