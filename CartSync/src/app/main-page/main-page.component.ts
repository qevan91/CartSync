import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-main-page',
  standalone: true,
  //imports: [],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  @Input()
  clicks = 0;

  addClicks(): void {
    console.log('Added 1 click. Total: ', this.clicks);
    this.clicks++;
  }
}
