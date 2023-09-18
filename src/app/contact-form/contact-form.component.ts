import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactFormService } from '../contact-service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  contactForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private contactFormService: ContactFormService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.contactFormService.sendContactForm(formData).subscribe(
        (response) => {
          console.log('Email sent successfully:', response);
          // Optionally, you can reset the  form here
          this.contactForm.reset();
        },
        (error) => {
          console.error('Error sending email:', error);
        }
      );
    }
  }
}
