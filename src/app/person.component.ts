import { Component, AfterViewChecked, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocalstorageService } from './localstorage.service';
import { Person } from './person';


@Component({
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent implements AfterViewChecked {

  person = new Person('', '', '', null, '');

  formErrors = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'skype': ''
  };

  validationMessages = {
    'firstName': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 4 characters long.'
    },
   'lastName': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 4 characters long.'
    },
    'email': {
      'required':      'Email is required.',
      'pattern':       'Email should contain an "@" and a "." symbols.'
    },
    'skype': {
      'minlength':     'Skype must be at least 4 characters long.'
    }
  };

  personForm: NgForm;
  @ViewChild('personForm') currentForm: NgForm;

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.personForm) { return; }
    this.personForm = this.currentForm;
    if (this.personForm) {
      this.personForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if (!this.personForm) { return; }
    const form = this.personForm.form;

    for ( const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key of Object.keys(control.errors)) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  constructor(private service: LocalstorageService) {}

}
