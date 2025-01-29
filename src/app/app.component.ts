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
  private destroy$ = new Subject<void>(); // For takeUntil pattern
  subscription: any; // For testing 'any' type issue

  constructor(private sanitizer: DomSanitizer) {}

  // Simulating a subscription without takeUntil or unsubscribe
  subscribeToData() {
    this.subscription = this.someService.getData().subscribe((data) => {
      console.log(data);
    });
  }


  // Example of 'any' type issue
  someMethodWithAny(value: any) {
    console.log(value);
  }
}
