import { Component } from '@angular/core';

@Component({
  selector: 'Root', // This violates the app prefix and kebab-case rule
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class App { // This violates the Component suffix rule
  constructor() {
    console.log('test'); // This will trigger a no-console warning if you add it to rules
  }
}