import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-subproducto',
  templateUrl: './subproducto.page.html',
  styleUrls: ['./subproducto.page.scss'],
})
export class SubproductoPage implements OnInit {
  items = new Array('' , '', '', '', '');
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  verDetalle() {
    this.router.navigate(['/home/subproductos', 1]);
  }
}
