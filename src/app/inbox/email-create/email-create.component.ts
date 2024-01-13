import { Component } from '@angular/core';
import { Email } from '../email';
import { AuthService } from '../../auth/auth.service';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrl: './email-create.component.css'
})
export class EmailCreateComponent {
  showModal = false;
  email: Email = {
    id: '',
    subject: '',
    text: '',
    to: '',
    from: `${this.authService.username}@gmail.com`,
    html: ''
  }

  constructor(
    private authService: AuthService,
    private emailService: EmailService,
  ) { }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => this.showModal = false);
  }
}
