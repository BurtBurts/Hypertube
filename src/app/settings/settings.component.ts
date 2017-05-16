import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { AlertService, UserService } from '../_services/index';
import { User } from '../_models/index';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})

export class SettingsComponent {
  model: any = {};
  currentUser: User;
  loading = false;
  language = [
    { id: 1, name: "English" },
    { id: 2, name: "Français" }
  ];
  filesToUpload: Array<File> = [];

  constructor(
    private http: Http,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  settings() {
    this.loading = true;
    this.userService.update(this.currentUser, this.model)
      .subscribe(
      data => {
        window.location.href = '/settings';
        this.loading = false;
      },
      error => {
        this.alertService.error(error._body);
        this.loading = false;
      });
  }

  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;

    formData.append("uploads[]", files[0], files[0]['name']);

    this.http.post('http://localhost:3000/upload', formData)
      .map(files => files.json())
      .subscribe(files => console.log('files', files))
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    // this.product.photo = fileInput.target.files[0]['name'];
  }
}
