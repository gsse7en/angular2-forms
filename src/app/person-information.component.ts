import { Component } from '@angular/core';
import { NgForm, FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import {  } from '@angular/forms';
import { LocalstorageService } from './localstorage.service';
import { Telephone, Hobbie } from './person';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { forbiddenNamesValidator } from './forbidden-names.directive';

@Component({
  templateUrl: './person-information.component.html',
  styleUrls: ['./person-information.component.css']
})

export class PersonInformationComponent {

  id;
  personInformationForm;

  formErrors = {
    'nickname': ''
  };

  validationMessages = {
    'nickname': {
      'required':       'First Name is required.',
      'forbiddenNames': 'Nickname cannot be "god", "devil" or "president".'
    }
  };

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

  addTelephone() {
    this.telephones.push(this.fb.group(new Telephone('')));
  }

  addHobbie() {
    this.hobbies.push(this.fb.group(new Hobbie('')));
  }

  createForm() {
    this.route.params.map((p: any) => p.id).subscribe(data => {
      this.id = data;
    });
    const personFromLocalStorage = this.service.getPerson(this.id);
    this.personInformationForm = this.fb.group({
      hobbies: this.fb.array(personFromLocalStorage.hobbies || [new Hobbie('')]),
      telephones: this.fb.array(personFromLocalStorage.telephones || [new Telephone('')]),
      nickname: [personFromLocalStorage.nickname, forbiddenNamesValidator(/god|president|devil/i)],
      firstName: personFromLocalStorage.firstName,
      lastName: personFromLocalStorage.lastName,
      email: personFromLocalStorage.email,
      age: personFromLocalStorage.age,
      skype: personFromLocalStorage.skype,
      id: personFromLocalStorage.id
    });
    this.setHobbies(personFromLocalStorage.hobbies || [new Hobbie('')]);
    this.setTelephones(personFromLocalStorage.telephones || [new Telephone('')]);
    this.personInformationForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.id = Number(this.id);
  }

  constructor(private service: LocalstorageService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.createForm();
  }

}
