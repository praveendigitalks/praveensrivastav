import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../components/sharedImport';
import { AuthService } from '../../authentication/authservice/auth.service';
import { ResumeService } from './resumeservice/resume.service';
import { Router } from '@angular/router';
import { MODULE } from '../../components/module';
import { ACTIONS } from '../../components/permission';

@Component({
  selector: 'app-resume',
  imports: [SHARED_IMPORTS],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css',
})
export class ResumeComponent {
  resume: any = [];
  isLogin = false;

  showPrintModal = false;
  selectedTemplate: 't1' | 't2' | 't3' | '' = '';
  templates = [
    { id: 't1' as const, name: 'Template 1' },
    { id: 't2' as const, name: 'Template 2' },
    // { id: 't3' as const, name: 'Template 3' },
  ];

  constructor(
    private authService: AuthService,
    private resumeService: ResumeService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.hasActionPermission(MODULE.RESUME, ACTIONS.READ)) {
      alert('You are not Authorized to access this Module');
      this.router.navigateByUrl('/');
      return;
    }

    this.isLogin = this.authService.isLoggedIn();
    this.loadResume();
  }

  loadResume() {
    this.resumeService.getresume().subscribe((res) => {
      this.resume = res[0] || [];
      console.log(
        '🚀 ~ ResumeComponent ~ loadResume ~ this.resume:',
        this.resume
      );
    });
  }

  /* ================== NAV / ACTIONS ================== */

  addResume(): void {
    this.router.navigateByUrl('/addresume');
  }

  editResume(resumeId: string) {
    this.router.navigate(['/addresume', resumeId]);
  }

  /* ================== PRINT FEATURE ================== */

  openPrintModal() {
    if (
      !this.resume ||
      (Array.isArray(this.resume) && this.resume.length === 0)
    ) {
      return;
    }
    this.selectedTemplate = 't1';
    this.showPrintModal = true;
  }

  closePrintModal() {
    this.showPrintModal = false;
  }

  selectTemplate(templateId: 't1' | 't2' | 't3') {
    this.selectedTemplate = templateId;
  }

  printSelectedTemplate() {
    if (!this.selectedTemplate || !this.resume) {
      return;
    }

    const html = this.buildTemplateHtml(this.selectedTemplate, this.resume);

    const printWindow = window.open('', '_blank', 'width=1024,height=768');
    if (!printWindow) {
      console.error('Unable to open print window');
      return;
    }

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };

    this.closePrintModal();
  }

  private buildTemplateHtml(
    templateId: 't1' | 't2' | 't3',
    resume: any
  ): string {
    const commonStyles = `
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 24px;
          background: #f5f5f5;
        }
        .resume-wrapper {
          max-width: 900px;
          margin: 0 auto;
          background: #ffffff;
          padding: 32px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .resume-header {
          border-bottom: 2px solid #333;
          padding-bottom: 12px;
          margin-bottom: 16px;
        }
        .resume-header h1 {
          margin: 0;
          font-size: 28px;
        }
        .resume-header h2 {
          margin: 4px 0 0 0;
          font-size: 14px;
          font-weight: normal;
        }
        .resume-section-title {
          font-size: 16px;
          text-transform: uppercase;
          margin-top: 20px;
          margin-bottom: 8px;
          color: #333;
          border-bottom: 1px solid #ccc;
          padding-bottom: 4px;
        }
        .resume-item {
          margin-bottom: 10px;
        }
        .resume-item h3 {
          margin: 0;
          font-size: 14px;
        }
        .resume-item .period {
          font-size: 12px;
          color: #777;
        }
        .resume-item p {
          margin: 4px 0;
          font-size: 13px;
        }
        ul {
          margin: 4px 0 0 18px;
          padding: 0;
          font-size: 13px;
        }
        .two-column {
          display: flex;
          gap: 24px;
        }
        .col-left, .col-right {
          flex: 1;
        }
        .highlight {
          color: #0b8d4d;
        }
      </style>
    `;

    const summaryBlock = `
      <div class="resume-section">
        <div class="resume-section-title">Summary</div>
        <div class="resume-item">
          <p>${resume.carrerOverview || ''}</p>
          <ul>
            <li>${resume.address || ''}</li>
            <li>${resume.phoneNumber || ''}</li>
            <li>${resume.email || ''}</li>
          </ul>
        </div>
      </div>
    `;

    const educationBlock = `
      <div class="resume-section">
        <div class="resume-section-title">Education</div>
        ${(resume.education || [])
          .map(
            (edu: any) => `
          <div class="resume-item">
            <h3>${edu.degreeName || ''}</h3>
            <div class="period">
              ${
                edu.start_year
                  ? new Date(edu.start_year).toLocaleDateString()
                  : ''
              } -
              ${
                edu.end_year
                  ? new Date(edu.end_year).toLocaleDateString()
                  : 'Present'
              }
            </div>
            <p><strong>${edu.institueName || ''}</strong></p>
            <p>${edu.percentorcgpa || ''}</p>
          </div>
        `
          )
          .join('')}
      </div>
    `;

    const experienceBlock = `
      <div class="resume-section">
        <div class="resume-section-title">Professional Experience</div>
        ${(resume.professionSchema || [])
          .map(
            (p: any) => `
          <div class="resume-item">
            <h3>${p.positionName || ''}</h3>
            <div class="period">
              ${
                p.start_year ? new Date(p.start_year).toLocaleDateString() : ''
              } -
              ${
                p.end_year
                  ? new Date(p.end_year).toLocaleDateString()
                  : 'Present'
              }
            </div>
            <p><em>${p.experience || ''}</em></p>
            <ul>
              ${(p.professiondescription || [])
                .map((d: string) => `<li>${d}</li>`)
                .join('')}
            </ul>
          </div>
        `
          )
          .join('')}
      </div>
    `;

    let bodyContent = '';

    if (templateId === 't1') {
      bodyContent = `
        <div class="resume-wrapper">
          <div class="resume-header">
            <h1 class="highlight">${resume.profileName || ''}</h1>
            <h2>Full Stack Developer / Project Lead</h2>
          </div>
          <div class="two-column">
            <div class="col-left">
              ${summaryBlock}
              ${educationBlock}
            </div>
            <div class="col-right">
              ${experienceBlock}
            </div>
          </div>
        </div>
      `;
    }

    if (templateId === 't2') {
      bodyContent = `
        <div class="resume-wrapper">
          <div class="resume-header">
            <h1>${resume.profileName || ''}</h1>
            <h2>Full Stack Developer / Project Lead</h2>
          </div>
          ${summaryBlock}
          ${experienceBlock}
          ${educationBlock}
        </div>
      `;
    }

    if (templateId === 't3') {
      bodyContent = `
        <div class="resume-wrapper">
          <div class="resume-header">
            <h1>${resume.profileName || ''}</h1>
            <h2>Full Stack Developer / Project Lead</h2>
          </div>
          ${experienceBlock}
          ${educationBlock}
          ${summaryBlock}
        </div>
      `;
    }

    return `
      <html>
        <head>
          <title>${resume.profileName || 'Resume'}</title>
          ${commonStyles}
        </head>
        <body>
          ${bodyContent}
        </body>
      </html>
    `;
  }
}
