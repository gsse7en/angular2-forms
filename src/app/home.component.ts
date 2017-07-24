import { Component } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  getPersonDetails(id) {
    this.router.navigate(['/' + id]);
  }
  constructor(private service: LocalstorageService, private router: Router) {}

}
