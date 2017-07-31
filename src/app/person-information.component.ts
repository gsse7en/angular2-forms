import { Component } from '@angular/core';
import { NgForm, FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

import { LocalstorageService } from './localstorage.service';
import { Telephone, Hobbie } from './person';
import { forbiddenNamesValidator } from './forbidden-names.directive';

@Component({
  templateUrl: './person-information.component.html',
  styleUrls: ['./person-information.component.css']
})

export class PersonInformationComponent {

  id;
  personInformationForm;

  formErrors = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'skype': '',
    'nickname': ''
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
    },
    'nickname': {
      'forbiddenNames': 'Nickname cannot be "god", "devil" or "president".'
    }
  };

  setTelephones(telephones: Telephone[]) {
    const telephonesFCs = telephones.map(telephone => this.fb.group(telephone));
    const telephonesFormArray = this.fb.array(telephonesFCs);
    this.personInformationForm.setControl('telephones', telephonesFormArray);
  }

  setHobbies(hobbies: Hobbie[]) {
    const hobbiesFCs = hobbies.map(hobbie => this.fb.group(hobbie));
    const hobbiesFormArray = this.fb.array(hobbiesFCs);
    this.personInformationForm.setControl('hobbies', hobbiesFormArray);
  }

  get telephones(): FormArray {
    return this.personInformationForm.get('telephones') as FormArray;
  };

  get hobbies(): FormArray {
    return this.personInformationForm.get('hobbies') as FormArray;
  };

  constructor(private service: LocalstorageService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.createForm();
  }

  onSubmit() {
    this.service.editPerson(this.personInformationForm.value, this.id);
    this.createForm();
  }

  onValueChanged(data?: any) {
    if (!this.personInformationForm) { return; }
    const form = this.personInformationForm;

    for (const field of Object.keys(this.formErrors)) {
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

  addTelephone() {
    this.telephones.push(this.fb.group(new Telephone('')));
  }

  addHobbie() {
    this.hobbies.push(this.fb.group(new Hobbie('')));
  }

  createForm() {
    this.route.params
      .map((p: any) => p.id)
      .subscribe(data => {
        this.id = data;
      });
    const personFromLocalStorage = this.service.getPerson(this.id);
    this.personInformationForm = this.fb.group({
      hobbies: this.fb.array(personFromLocalStorage.hobbies || [new Hobbie('')]),
      telephones: this.fb.array(personFromLocalStorage.telephones || [new Telephone('')]),
      nickname: [personFromLocalStorage.nickname, forbiddenNamesValidator(/god|president|devil/i)],
      firstName: [personFromLocalStorage.firstName, [Validators.required, Validators.minLength(4)]],
      lastName: [personFromLocalStorage.lastName, [Validators.required, Validators.minLength(4)]],
      email: [personFromLocalStorage.email, [Validators.required, Validators.pattern(/.+@.+\..+/)]],
      age: personFromLocalStorage.age,
      skype: [personFromLocalStorage.skype, [Validators.minLength(4)]],
      id: personFromLocalStorage.id
    });
    this.setHobbies(personFromLocalStorage.hobbies || [new Hobbie('')]);
    this.setTelephones(personFromLocalStorage.telephones || [new Telephone('')]);
    this.personInformationForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.id = Number(this.id);
  }

}
