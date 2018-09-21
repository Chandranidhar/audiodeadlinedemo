import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
@Component({
  selector: 'app-root',
   // templateUrl: './app.component.html',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'audiodeadlinedemo';
}
