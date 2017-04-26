import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './_models/index';
import { UserService, AlertService, SearchService } from './_services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  searchquery: any = {}
  loading = false;
  currentUser: User;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private searchService: SearchService,
    private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  search() {
    this.loading = true;
    this.searchService.research(this.searchquery)
      .subscribe(
      data => {
        if (this.router.url !== '/library')
          this.router.navigate(['/library']);
        else {
          this.router.navigateByUrl(`/index`).then(
            () => {
            this.router.navigateByUrl(`/library`);
          });
        }
        this.loading = false;
      },
      error => {
        console.log(error);
        this.alertService.error(error._body);
        this.loading = false;
      });
  }
}
