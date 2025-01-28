import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {
  // Critical Issue 1: No unsubscribe for these subscriptions
  private userDataSubscription: any;
  private notificationsSubscription: any;

  // Add some data properties
  userData: any;
  notifications: any[] = [];
  userStatus = '';
  htmlContent = '';

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    // Critical Issue 2: Memory leak - subscription without takeUntil or async pipe
    this.userDataSubscription = this.http.get('/api/user').subscribe(data => {
      this.userData = data;
      console.log('User data loaded:', data); // Issue: console.log in production
    });

    // Critical Issue 3: Another memory leak
    this.notificationsSubscription = this.http.get('/api/notifications').subscribe(
      notifications => {
        this.notifications = notifications;
      }
    );
  }

  // Critical Issue 4: Security vulnerability - using innerHTML directly
  setHtmlContent(content: string) {
    this.htmlContent = content;
    const element = document.getElementById('content');
    if (element) {
      element.innerHTML = content;
    }
  }

  // Critical Issue 5: Security vulnerability - bypass security
  displayContent(content: string) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  // Issue: Empty method
  handleUserAction() {
    // TODO: Implement user action handling
  }

  // Issue: Empty method with only comment
  processData() {
    // Will process data later
  }

  // Issue: Method with only console.log
  debugInfo() {
    console.log('Debug info');
    console.info('More debug info');
  }

  ngOnDestroy() {
    // Critical Issue 6: Missing unsubscribe calls
    // Should unsubscribe from subscriptions here
  }
}