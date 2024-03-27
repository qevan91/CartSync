import {Component, Input} from '@angular/core';
import {error} from "@angular/compiler-cli/src/transformers/util";

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
