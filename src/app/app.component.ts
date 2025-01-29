import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnDestroy {
  varun!: string;
  hello!: string;
  subscription: any; // For testing 'any' type issue

  constructor(private sanitizer: DomSanitizer) {}



  // Example of 'any' type issue
  someMethodWithAny(value: any) {
    console.log(value);
  }
}
