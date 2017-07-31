import { Injectable } from '@angular/core';

@Injectable()
export class LocalstorageService {

  clearPersons() {
    localStorage['persons'] = '[]';
  }

  addPerson(person) {
    const persons = this.getPersons();
    person.id = persons.length;
    persons.push(person);
    localStorage['persons'] = JSON.stringify(persons);
  }

  editPerson(person, id) {
    let persons = this.getPersons();
    persons = persons.map(p => p.id === id ? person : p);
    localStorage['persons'] = JSON.stringify(persons);
  }

  getPersons() {
    return JSON.parse(localStorage['persons']);
  }

  getPerson(id) {
    return this.getPersons().find(el => el.id.toString() === id);
  }

  constructor() { }

}
