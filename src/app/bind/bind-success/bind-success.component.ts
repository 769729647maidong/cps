import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bind-success',
  templateUrl: './bind-success.component.html',
  styleUrls: ['./bind-success.component.less']
})
export class BindSuccessComponent implements OnInit {
  countdown = 3;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.countDown();
  }

  countDown() {
    this.countdown = 3;
    const start = setInterval(() => {
      if (this.countdown === 1) {
        clearInterval(start);
        this.router.navigate(['/login']);
        return;
      } else {
        this.countdown--;
      }
    }, 1000);
  }
}
