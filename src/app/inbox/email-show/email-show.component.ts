import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrl: './email-show.component.css'
})
export class EmailShowComponent implements OnInit {
  email: Email = {
    id: '',
    subject: '',
    text: '',
    to: '',
    from: '',
    html: ''
  };

  constructor(
    private route: ActivatedRoute,
    private emailService: EmailService,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(({ id }) => this.emailService.getEmail(id))
    ).subscribe(email => this.email = email);
  }

}
