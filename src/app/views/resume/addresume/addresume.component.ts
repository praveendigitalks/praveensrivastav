import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../authentication/authservice/auth.service';
import { ResumeService } from '../resumeservice/resume.service';
import { MODULE } from '../../../components/module';
import { ACTIONS } from '../../../components/permission';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SHARED_IMPORTS } from '../../../components/sharedImport';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-addresume',
  imports: [RouterLink, SHARED_IMPORTS, ReactiveFormsModule],
  templateUrl: './addresume.component.html',
  styleUrl: './addresume.component.css',
  standalone: true,
})
export class AddresumeComponent implements OnInit {
  resumeForm!: FormGroup;
  resume: any;
  resumeId: string = '';

  constructor(
    private authService: AuthService,
    private resumeService: ResumeService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.resumeForm = this.fb.group({
      profileName: [''],
      carrerOverview: [''],
      phoneNumber: [''],
      address: [''],
      email: [''],

      education: this.fb.array([]),
      professionSchema: this.fb.array([]),
    });
  }

  ngOnInit() {
    if (
      !this.authService.hasActionPermission(MODULE.RESUME, ACTIONS.CREATE) &&
      !this.authService.hasActionPermission(MODULE.RESUME, ACTIONS.UPDATE)
    ) {
      alert('You are not Authorized to access this module');
      this.router.navigateByUrl('/resume');
      return;
    }

    this.route.params.subscribe((params) => {
      this.resumeId = params['resumeId'];

      if (this.resumeId) {
        this.loadResumeData(this.resumeId);
      } else {
        this.addeducation();
        this.addprofession();
      }
    });
  }

  // ========================= LOAD DATA (EDIT) =======================

  loadResumeData(resumeId: string) {
    if (!resumeId) return;

    this.resumeService.getresumebyId(resumeId).subscribe({
      next: (res: any) => {
        console.log('🚀 ~ AddresumeComponent ~ loadResumeData ~ res:', res);
        this.resume = res;

        this.resumeForm.patchValue({
          profileName: res.profileName || '',
          carrerOverview: res.carrerOverview || '',
          phoneNumber: res.phoneNumber || '',
          address: res.address || '',
          email: res.email || '',
        });

        this.setEducation(res.education || []);
        this.setProfession(res.professionSchema || []);
      },
      error: (err: any) => {
        console.error('Error loading resume:', err);
      },
    });
  }

  private setEducation(education: any[]) {
    this.educationArray.clear();

    education.forEach((edu) => {
      this.educationArray.push(
        this.fb.group({
          degreeName: [edu.degreeName || ''],
          start_year: [edu.start_year ? edu.start_year.substring(0, 10) : ''],
          end_year: [edu.end_year ? edu.end_year.substring(0, 10) : ''],
          institueName: [edu.institueName || ''],
          percentorcgpa: [edu.percentorcgpa || ''],
        })
      );
    });

    if (this.educationArray.length === 0) {
      this.addeducation();
    }
  }

  private setProfession(professionSchema: any[]) {
    this.professionArray.clear();

    professionSchema.forEach((p) => {
      const descArray = (p.professiondescription || []).map(
        (d: string) => new FormControl(d)
      );

      const professionGroup = this.fb.group({
        positionName: [p.positionName || ''],
        start_year: [p.start_year ? p.start_year.substring(0, 10) : ''],
        end_year: [p.end_year ? p.end_year.substring(0, 10) : ''],
        experience: [p.experience || ''],
        professiondescription: this.fb.array(
          descArray.length ? descArray : [new FormControl('')]
        ),
      });

      this.professionArray.push(professionGroup);
    });

    if (this.professionArray.length === 0) {
      this.addprofession();
    }
  }

  // ========================= EDUCATION =======================

  get educationArray(): FormArray {
    return this.resumeForm.get('education') as FormArray;
  }

  addeducation() {
    const edu = this.fb.group({
      degreeName: [''],
      start_year: [''],
      end_year: [''],
      institueName: [''],
      percentorcgpa: [''],
    });

    this.educationArray.push(edu);
  }

  removeeducation(i: number) {
    if (this.educationArray.length > 1) {
      this.educationArray.removeAt(i);
    }
  }

  // ========================= PROFESSION =======================

  get professionArray(): FormArray {
    return this.resumeForm.get('professionSchema') as FormArray;
  }

  addprofession() {
    const profession = this.fb.group({
      positionName: [''],
      start_year: [''],
      end_year: [''],
      experience: [''],
      professiondescription: this.fb.array([new FormControl('')]),
    });

    this.professionArray.push(profession);
  }

  removeprofession(i: number) {
    if (this.professionArray.length > 1) {
      this.professionArray.removeAt(i);
    }
  }

  // ========================= PROJECT DESCRIPTION =======================

  getProfessionDescriptionArray(i: number): FormArray {
    return this.professionArray.at(i).get('professiondescription') as FormArray;
  }

  addProfessionDescription(i: number) {
    this.getProfessionDescriptionArray(i).push(new FormControl(''));
  }

  removeProfessionDescription(i: number, j: number) {
    const arr = this.getProfessionDescriptionArray(i);

    if (arr.length > 1) {
      arr.removeAt(j);
    }
  }

  // ========================= SUBMIT =======================

  OnSubmit() {
    if (this.resumeForm.invalid) {
      this.resumeForm.markAllAsTouched();
      return;
    }

    const data = {
      ...this.resumeForm.value,
      professionSchema: this.resumeForm.value.professionSchema.map(
        (p: any) => ({
          ...p,
          professiondescription: (p.professiondescription || []).map(
            (d: any) => d || ''
          ),
        })
      ),
    };

    if (this.resumeId) {
      // UPDATE
      this.resumeService.updateresume(this.resumeId, data).subscribe({
        next: (res: any) => {
          console.log('🚀 ~ AddresumeComponent ~ OnSubmit (update) ~ res:', res);
          this.router.navigateByUrl('/resume');
        },
        error: (err: any) => {
          console.log('🚀 ~ AddresumeComponent ~ OnSubmit (update) ~ err:', err);
        },
      });
    } else {
      // CREATE
      this.resumeService.postresume(data).subscribe({
        next: (res: any) => {
          console.log('🚀 ~ AddresumeComponent ~ OnSubmit (create) ~ res:', res);
          this.router.navigateByUrl('/resume');
        },
        error: (err: any) => {
          console.log('🚀 ~ AddresumeComponent ~ OnSubmit (create) ~ err:', err);
        },
      });
    }
  }
}
