import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('contentDiv') contentDiv!: ElementRef;
  
  // Security Issue: Using dangerous HTML content
  userContent = '<script>alert("hack")</script>';
  
  // Memory Leak: Unmanaged subscription
  counter$ = new BehaviorSubject<number>(0);
  items = Array.from({length: 1000}, (_, i) => `Item ${i}`);
  
  constructor(private sanitizer: DomSanitizer) {}
  
  ngOnInit() {
    // Memory Leak: subscription without cleanup
    interval(1000).subscribe(val => {
      this.counter$.next(val);
    });

    // Security Issue: bypassing security
    this.contentDiv.nativeElement.innerHTML = this.userContent;
    this.sanitizer.bypassSecurityTrustHtml(this.userContent);
  }

  // Performance Issue: Missing trackBy function
  refreshItems() {
    this.items = [...this.items];
  }
}