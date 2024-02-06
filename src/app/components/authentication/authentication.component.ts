import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  appName = environment.appName;
  page = null;

  constructor() { }

  ngOnInit(): void {
  }

}
