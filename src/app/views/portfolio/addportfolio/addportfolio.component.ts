import { Component } from '@angular/core';
import { AuthService } from '../../../authentication/authservice/auth.service';
import { PortfolioService } from '../portfolioservice/portfolio.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MODULE } from '../../../components/module';
import { ACTIONS } from '../../../components/permission';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SHARED_IMPORTS } from '../../../components/sharedImport';

@Component({
  selector: 'app-addportfolio',
  imports: [RouterLink, SHARED_IMPORTS],
  templateUrl: './addportfolio.component.html',
  styleUrl: './addportfolio.component.css',
})
export class AddportfolioComponent {
  portfolio: any = [];
  portfolioId: string = '';
  portfolioForm: FormGroup;
  imageBase64: string | null = null;
  previewUrl: string | null = null;
  selectedFile: File | null = null;
  isDragOver = false;
  imageError = '';
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private portfolioService: PortfolioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.portfolioForm = this.fb.group({
      projectName: [''],
      projectDescription: [''],
      category: [''],
      projectImage: [''],
      projectUrl: [''],
    });
  }

  ngOnInit() {
    // if(!this.authService.hasActionPermission(MODULE.PORTFOLIO, ACTIONS.CREATE) && !this.authService.hasActionPermission(MODULE.PORTFOLIO, ACTIONS.UPDATE)){
    //    alert("You are not Authorized to access this module");
    //    this.router.navigateByUrl("/portfolio");
    // }

    this.route.params.subscribe((params) => {
      this.portfolioId = params['portfolioId'];

      if (this.portfolioId) {
        this.loadPortfolioData(this.portfolioId);
      }
    });
  }

 loadPortfolioData(portfolioId: string) {
  this.portfolioService.getportfoliobyId(portfolioId).subscribe((res) => {
    this.portfolio = res;

    // set preview so existing image is visible in circle
    this.previewUrl = this.getImageUrl(res.projectImage);
    this.selectedFile = null;        // no new file yet

    this.portfolioForm.patchValue({
      projectName: res.projectName || '',
      projectDescription: res.projectDescription || '',
      category: res.category || '',
      // store raw path in form (optional, not required for submit)
      projectImage: res.projectImage || '',
      projectUrl: res.projectUrl || '',
    });
  });
}

getImageUrl(projectImage: string | null | undefined): string {
  if (!projectImage) {
    return '/assets/img/portfolio/default.png';
  }
  // projectImage is "/upload/portfolio/1773392310371.jfif"
  return `http://localhost:5000${projectImage}`;
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
    this.portfolio.existingImage = null;
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
      this.portfolio.existingImage = null;
      this.portfolioForm.patchValue({ projectImage: '' });
      this.imageError = '';
    }
  }

  OnSubmit() {
    if (this.portfolioForm.invalid) {
      console.log('Please Fill Form Correctly');
      return;
    }

    const formData = new FormData();

    formData.append('projectName', this.portfolioForm.value.projectName);
    formData.append(
      'projectDescription',
      this.portfolioForm.value.projectDescription
    );
    formData.append('category', this.portfolioForm.value.category);
    formData.append('projectUrl', this.portfolioForm.value.projectUrl);

    // YOUR EXACT IMAGE LOGIC
    if (this.selectedFile) {
      formData.append('projectImage', this.selectedFile);
    } else if (this.portfolioId && this.portfolio?.projectImage) {
      formData.append('existingImage', this.portfolio.projectImage);
    }

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    if (this.portfolioId) {
      this.portfolioService
        .updateportfolio(this.portfolioId, formData)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigateByUrl('/portfolio');
            this.portfolioForm.reset();
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      this.portfolioService.postportfolio(formData).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/portfolio');
          this.portfolioForm.reset();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
