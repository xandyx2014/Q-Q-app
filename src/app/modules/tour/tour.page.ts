import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TOUR_KEY } from 'src/app/config/variable.config';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.page.html',
  styleUrls: ['./tour.page.scss'],
})
export class TourPage implements OnInit {
  slides: { img: string, titulo: string, desc: string }[] = [
    {
      img: '/assets/img/webshop.svg',
      titulo: 'Busque sus productos',
      desc: 'Consulte y encuentre sus producto que necesite'
    },
    {
      img: '/assets/img/supermarket.svg',
      titulo: 'Agreguelo a su Carrito',
      desc: 'Adicione todos sus productos favoritos a su carrito para la previa compra'
    },
    {
      img: '/assets/img/buy.svg',
      titulo: 'Realize su Pedido',
      desc: 'Solicite su pedido relleando  sus datos necesario y ubicacion'
    },
    {
      img: '/assets/img/marketplace.svg',
      titulo: 'Verifique el estado su Pedido',
      desc: 'Consulte o realize una busqueda del estado de sus pedidos'
    }
  ];
  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private storage: Storage
  ) { }

  ngOnInit() {
  }
  irLogin() {
    this.router.navigate(['/login']);
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  async terminarTour() {
    await this.storage.set(TOUR_KEY, true);
    await this.router.navigate(['/login']);
  }

}
