import { Component } from '@angular/core';
import { SomeService } from './some.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  varun!: string;
  hello!: string;

  constructor(private someService: SomeService) {
    this.someService.getData().subscribe(data => {
      console.log('Data:', data);
      this.processData(data);
    });
  }

  processData(data: any) {
    // Empty method body
  }

  calculateResult() {
    // Perform some complex calculation
    const result = 2 + 3 * 4 / 5 - 6 * 7 + 8 / 9;
    console.log('Result:', result);
  }

  ngOnInit() {
    this.someService.getMoreData().subscribe(data => {
      this.varun = data.varun;
      this.hello = data.hello;
      document.querySelector('#result')!.innerHTML = `<h1>${this.varun}</h1>`;
    });
  }

  saveData() {
    const url = 'http://api.example.com/data';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Process the response
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle the error
      });
  }

  // Empty method
  emptyMethod() {}
}