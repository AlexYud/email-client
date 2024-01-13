import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Email } from '../email';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.css'
})
export class EmailFormComponent implements OnInit {
  emailForm = new FormGroup({
    to: new FormControl('', [Validators.required, Validators.email]),
    from: new FormControl({ value: '', disabled: true }),
    subject: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
  });

  @Input() email: Email = {
    id: '',
    subject: '',
    text: '',
    to: '',
    from: '',
    html: ''
  };

  @Output() emailSubmit = new EventEmitter();

  ngOnInit(): void {
    const { subject, from, to, text } = this.email;
    this.emailForm.setValue({ to, from, subject, text });
  }

  onSubmit() {
    if (this.emailForm.invalid) return;
    this.emailSubmit.emit(this.emailForm.value);
  }
}
