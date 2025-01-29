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

  // Example of unsafe innerHTML
  unsafeMethod() {
    const userHtml = '<script>alert("XSS")</script>';
    const sanitizedHtml = this.sanitizer.sanitize(SecurityContext.HTML, userHtml);
    document.getElementById('content')!.innerHTML = sanitizedHtml!;
  }

  // Example of safe use of innerHTML with sanitizer
  safeMethod() {
    const userHtml = '<div>Hello, World!</div>';
    const sanitizedHtml = this.sanitizer.sanitize(SecurityContext.HTML, userHtml);
    document.getElementById('content')!.innerHTML = sanitizedHtml!;
  }

  // Simulating a subscription without takeUntil or unsubscribe
  subscribeToData() {
    this.subscription = this.someService.getData().subscribe((data) => {
      console.log(data);
    });
  }

  // Simulate `ngOnDestroy` for unsubscribing (without takeUntil)
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // Example of 'any' type issue
  someMethodWithAny(value: any) {
    console.log(value);
  }
}
