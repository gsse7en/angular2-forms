export class Person {

  constructor(
    public firstName: String,
    public lastName: String,
    public email: String,
    public age?: Number,
    public skype?: String
  ) {  }

}

export class Telephone {
  constructor(public telephone: String) {}
}

export class Hobbie {
  constructor(public hobbie: String) {}
}
