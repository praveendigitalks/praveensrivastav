import { Component } from '@angular/core';
import { AuthService } from '../../../authentication/authservice/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MODULE } from '../../../components/module';
import { ACTIONS } from '../../../components/permission';
import { SHARED_IMPORTS } from '../../../components/sharedImport';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  about: any = [];
  aboutId: string = '';
  previewUrl: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private aboutService: AboutService,
    private route: ActivatedRoute
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
      image: [''],
      totalProject: [0],
      MeanStack: [0],
      MernornextStack: [0],
      otherproject: [0],
      webskills: this.fb.array([]),
      priorskills: this.fb.array([]),
      companyProjects: this.fb.array([]),
    });
  }

  ngOnInit() {
    // authenticatied user check
    if (!this.authService.hasActionPermission(MODULE.ABOUT, ACTIONS.CREATE)) {
      alert('You are not Authorized to Access this Module!');
      this.router.navigateByUrl('/about');
    }

    // loadinng the data
    this.route.params.subscribe((params) => {
      this.aboutId = params['aboutId'];
      // console.log('ID', aboutId);
      this.loadAboutData(this.aboutId);
    });
  }

  loadAboutData(aboutId: string) {
    this.aboutService.getAboutbyId(aboutId).subscribe((res) => {
      console.log('🚀 ~ AddaboutComponent ~ loadAboutData ~ res:', res);
      this.about = res;

      this.aboutForm.patchValue({
        position: this.about.position,
        description: this.about.description,
        dob: this.about.dob
          ? new Date(this.about.dob).toISOString().split('T')[0]
          : '',
        phone: this.about.phone,
        city: this.about.city,
        state: this.about.state,
        country: this.about.country,
        degree: this.about.degree,
        email: this.about.email,
        totalProject: this.about.totalProject,
        MeanStack: this.about.MeanStack,
        MernornextStack: this.about.MernornextStack,
        otherproject: this.about.otherproject,
      });

      // ✅ Patch webskills FormArray
      this.patchWebSkills();
      this.priorSkills();
      this.companyProjects();

      // ✅ Set preview for existing image
      if (this.about.image) {
        this.previewUrl = this.about.image;
      }
    });
  }

  // =================================================================================================================
  // web skills
  // =================================================================================================================

  // ✅ New method to patch webskills FormArray
  patchWebSkills() {
    // Clear existing controls
    this.webskillsArray.clear();

    // Patch each skill from backend data
    if (this.about.webskills && this.about.webskills.length > 0) {
      this.about.webskills.forEach((skill: any) => {
        // ✅ FIX: Use actual backend VALUES, not empty defaults
        const skillGroup = this.fb.group({
          technology: [skill.technology || '', Validators.required], // ✅ Use skill.technology
          proficiency: [
            skill.proficiency || 0,
            [Validators.required, Validators.min(0), Validators.max(100)],
          ], // ✅ Use skill.proficiency
          icon: [skill.icon || ''], // ✅ Backend value or empty
          iconType: [skill.iconType || 'fontawesome'], // ✅ Backend value or default
        });

        this.webskillsArray.push(skillGroup);
      });
    }
  }

  // webskill arry
  // ✅ Getter for webskills FormArray
  get webskillsArray(): FormArray {
    return this.aboutForm.get('webskills') as FormArray;
  }

  // ✅ Add new skill
  addSkill() {
    const skillForm = this.fb.group({
      technology: ['', Validators.required],
      proficiency: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });
    this.webskillsArray.push(skillForm);
  }

  // ✅ Remove skill
  removeSkill(index: number) {
    this.webskillsArray.removeAt(index);
  }

  getTechnologyName(index: number): string {
    return this.webskillsArray.at(index)?.get('technology')?.value || 'Skill';
  }

  getProficiencyValue(index: number): number {
    return this.webskillsArray.at(index)?.get('proficiency')?.value || 0;
  }

  updateProgress(index: number) {
    // Trigger change detection for live preview
    setTimeout(() => {}, 0);
  }

  // =================================================================================================================
  // web skills end
  // =================================================================================================================
  // =================================================================================================================
  // prior skills
  // =================================================================================================================

  get priorSkillArray(): FormArray {
    return this.aboutForm.get('priorskills') as FormArray;
  }

  // ✅ Add new prior skill
  addpriorSkill() {
    const priorskillsForm = this.fb.group({
      skillName: ['', Validators.required],
      icon: [''], // ✅ New field
      iconType: ['fontawesome'], // ✅ New field
    });
    this.priorSkillArray.push(priorskillsForm);
  }

  // ✅ Remove priror skill
  removepriorSkill(index: number) {
    this.priorSkillArray.removeAt(index);
  }

  // technoilogy name
  getskillName(index: number): string {
    return this.priorSkillArray.at(index)?.get('skillName')?.value || 'Skill';
  }

  priorSkills() {
    // Clear existing controls
    this.priorSkillArray.clear();

    // Patch each skill from backend data
    if (this.about.priorskills && this.about.priorskills.length > 0) {
      this.about.priorskills.forEach((skill: any) => {
        // ✅ FIX: Use ACTUAL backend values
        const skillGroup = this.fb.group({
          skillName: [skill.skillName || '', Validators.required], // ✅ skill.skillName
          icon: [skill.icon || ''], // ✅ skill.icon
          iconType: [skill.iconType || 'fontawesome'], // ✅ skill.iconType
        });

        this.priorSkillArray.push(skillGroup);
      });
    }
  }

  // =================================================================================================================
  // prior skill ends
  // =================================================================================================================

  // =================================================================================================================
  // company projects starts
  // =================================================================================================================
  // ✅ New method to patch webskills FormArray
  // company projects  arry
  // ✅ Getter for webskills FormArray
  get companyProjectsArray(): FormArray {
    return this.aboutForm.get('companyProjects') as FormArray;
  }

  // ✅ Patch method (COMPLETE)
  companyProjects() {
    this.companyProjectsArray.clear(); // ✅ Correct array

    if (this.about.companyProjects && this.about.companyProjects.length > 0) {
      this.about.companyProjects.forEach((project: any) => {
        // ✅ FULL project FormGroup
        const projectGroup = this.fb.group({
          projectTitle: [project.projectTitle || '', Validators.required],
          projectBio: [project.projectBio || ''],
          projectDescription: [project.projectDescription || ''],
          technologies: this.fb.array([]), // ✅ Nested technologies array
        });

        // ✅ Patch nested technologies
        const techArray = projectGroup.get('technologies') as FormArray;
        if (project.technologies && project.technologies.length > 0) {
          project.technologies.forEach((tech: any) => {
            const techGroup = this.fb.group({
              icon: [tech.icon || ''],
              iconType: [tech.iconType || 'fontawesome'],
            });
            techArray.push(techGroup);
          });
        }

        this.companyProjectsArray.push(projectGroup); // ✅ Correct array
      });
    }
  }

  // ✅ Add new project
  addCompanyProject() {
    const projectForm = this.fb.group({
      projectTitle: ['', Validators.required],
      projectBio: [''],
      projectDescription: [''],
      technologies: this.fb.array([
        this.fb.group({
          icon: [''],
          iconType: ['fontawesome'],
        }),
      ]),
    });
    this.companyProjectsArray.push(projectForm);
  }

  // ✅ Remove project
  removeCompanyProject(index: number) {
    this.companyProjectsArray.removeAt(index);
  }

  // =================================================================================================================
  // company projects ends
  // =================================================================================================================

  // formsubmission
  OnSubmit() {
    if (this.aboutForm.invalid) {
      alert('Please fill required fields');
      return;
    }

    const formData = new FormData();

    // ✅ Basic fields
    formData.append('position', this.aboutForm.value.position || '');
    formData.append('description', this.aboutForm.value.description || '');
    formData.append('dob', this.aboutForm.value.dob || '');
    formData.append('phone', this.aboutForm.value.phone || '');
    formData.append('city', this.aboutForm.value.city || '');
    formData.append('state', this.aboutForm.value.state || '');
    formData.append('country', this.aboutForm.value.country || '');
    formData.append('degree', this.aboutForm.value.degree || '');
    formData.append('email', this.aboutForm.value.email || '');
    formData.append('totalProject', this.aboutForm.value.totalProject || '');
    formData.append('MeanStack', this.aboutForm.value.MeanStack || '');
    formData.append(
      'MernornextStack',
      this.aboutForm.value.MernornextStack || ''
    );
    formData.append('otherproject', this.aboutForm.value.otherproject || '');

    // ✅ WEBSKILLS ARRAY - Convert to JSON string
    const webskills = this.aboutForm.value.webskills.map((skill: any) => ({
      technology: skill.technology || '',
      proficiency: Number(skill.proficiency) || 0, // Ensure number
    }));
    formData.append('webskills', JSON.stringify(webskills));

    // ✅ PRIOR SKILLS ARRAY - Convert to JSON string
    const priorskills = this.aboutForm.value.priorskills.map((skill: any) => ({
      skillName: skill.skillName || '',
      icon: skill.icon || '',
      iconType: skill.iconType,
    }));
    formData.append('priorskills', JSON.stringify(priorskills));

    // ✅ COMPANY PROJECTS ARRAY (NEW - Nested structure)
    const companyProjectsData =
      this.aboutForm.value.companyProjects?.map((project: any) => ({
        projectTitle: project.projectTitle || '',
        projectBio: project.projectBio || '',
        projectDescription: project.projectDescription || '',
        technologies:
          project.technologies?.map((tech: any) => ({
            icon: tech.icon || '',
            iconType: tech.iconType || 'fontawesome',
          })) || [],
      })) || [];
    formData.append('companyProjects', JSON.stringify(companyProjectsData));

    // ✅ Image (required for create, optional for update)
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else if (this.aboutId && this.about?.image) {
      // Keep existing image for updates
      formData.append('existingImage', this.about.image);
    }

    // ✅ Submit based on create/update
    if (this.aboutId) {
      this.aboutService.updateAbout(this.aboutId, formData).subscribe({
        next: () => {
          this.resetForm();
          this.router.navigateByUrl('/about');
        },
        error: (err) => console.error('Update failed:', err),
      });
    } else {
      this.aboutService.postAbout(formData).subscribe({
        next: () => {
          this.resetForm();
          this.router.navigateByUrl('/about');
        },
        error: (err) => console.error('Create failed:', err),
      });
    }
  }

  // ✅ Helper method
  private resetForm() {
    this.aboutForm.reset();
    this.selectedFile = null;
    this.previewUrl = null;
    while (this.webskillsArray.length !== 0) {
      this.webskillsArray.removeAt(0);
    }
  }

  // =================================================================================================================
  // image upload starts
  // =================================================================================================================

  triggerFileInput() {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    fileInput?.click();
  }

  //  triggerFileInput() {
  //   const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  //   fileInput?.click();
  // }

  onDragOver(event: any) {
    event.preventDefault();
  }

  //  onFileSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (!input.files || !input.files[0]) return;

  //   this.selectedFile = input.files[0];

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.previewUrl = reader.result as string;
  //   };
  //   reader.readAsDataURL(this.selectedFile);
  // }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.previewUrl = URL.createObjectURL(file);

      // ✅ Clear existing image reference when new file selected
      this.about.existingImage = null; // Track to send to backend

      // ✅ DON'T patch image form control - FormData handles it
      this.aboutForm.patchValue({ image: '' }); // Reset file input visually
    }
  }

  //  onDrop(event: DragEvent): void {
  //   event.preventDefault();
  //   if (!event.dataTransfer?.files.length) return;

  //   const file = event.dataTransfer.files[0];
  //   if (!file.type.startsWith('image/')) return;

  //   this.selectedFile = file;

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imageBase64 = reader.result as string;
  //     this.previewUrl = this.imageBase64;
  //   };
  //   reader.readAsDataURL(file);
  // }
  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (!event.dataTransfer?.files.length) return;

    const file = event.dataTransfer.files[0];
    if (!file.type.startsWith('image/')) return;

    this.selectedFile = file;
    this.previewUrl = URL.createObjectURL(file);

    // ✅ Clear existing image reference
    this.about.existingImage = null;
  }

  // =================================================================================================================
  // image uplaod ends
  // =================================================================================================================

  // =================================================================================================================
  // icon helper starts
  // =================================================================================================================

  getIconType(index: number): string {
    return (
      this.priorSkillArray.at(index).get('iconType')?.value || 'fontawesome'
    );
  }

  getIconClass(index: number): string {
    return this.priorSkillArray.at(index).get('icon')?.value || '';
  }

  getIconUrl(index: number): string {
    return this.priorSkillArray.at(index).get('icon')?.value || '';
  }

  // PRIOR SKILLS helpers (separate from webskills)
  getIconTypePrior(index: number): string {
    return (
      this.priorSkillArray.at(index)?.get('iconType')?.value || 'fontawesome'
    );
  }

  getIconClassPrior(index: number): string {
    return this.priorSkillArray.at(index)?.get('icon')?.value || '';
  }

  getIconUrlPrior(index: number): string {
    return this.priorSkillArray.at(index)?.get('icon')?.value || '';
  }

  addTech(projectIndex: number) {
    const project = this.companyProjectsArray.at(projectIndex) as FormGroup;
    const techArray = project.get('technologies') as FormArray;
    techArray.push(
      this.fb.group({
        icon: [''],
        iconType: ['fontawesome'],
      })
    );
  }

  removeTech(projectIndex: number, techIndex: number) {
    const project = this.companyProjectsArray.at(projectIndex) as FormGroup;
    const techArray = project.get('technologies') as FormArray;
    techArray.removeAt(techIndex);
  }

  getTechControls(projectIndex: number): FormArray {
    const project = this.companyProjectsArray.at(projectIndex) as FormGroup;
    return project.get('technologies') as FormArray;
  }

  getTechIconType(projectIndex: number, techIndex: number): string {
    const techArray = this.getTechControls(projectIndex);
    return techArray.at(techIndex)?.get('iconType')?.value || 'fontawesome';
  }

  getTechIcon(projectIndex: number, techIndex: number): string {
    const techArray = this.getTechControls(projectIndex);
    return techArray.at(techIndex)?.get('icon')?.value || '';
  }

  // =================================================================================================================
  // icon helper ends
  // =================================================================================================================
}
