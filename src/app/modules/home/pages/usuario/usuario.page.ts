import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformacionService } from 'src/app/core/services/informacion.service';
import { Storage } from '@ionic/storage';
import { USER_AUTH, PERSON_KEY } from 'src/app/config/variable.config';
import { from, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonService } from 'src/app/core/services/person.service';
import { Person } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  ok = false;
  usuario;
  myForm: FormGroup;
  subscription = new Subscription();
  constructor(
    private router: Router,
    private informacionService: InformacionService,
    private fb: FormBuilder,
    private storage: Storage,
    private personService: PersonService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    from(this.storage.get(USER_AUTH))
      .pipe(
        map(result => result[0]),
        switchMap(person => this.personService.obtenerCliente(person.person_id))
      )
      .subscribe((res) => {
        console.log(res);
        this.usuario = res;
        this.iniciarFomulario(this.usuario);
        this.ok = true;
      });
    // console.log(navigator.onLine);
  }
  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }
  iniciarFomulario(usuario: Person) {
    this.myForm = this.fb.group({
      ['name']: [usuario.name || '', [Validators.required]],
      ['father_last_name']: [usuario.father_last_name || '', [Validators.required]],
      ['mother_last_name']: [usuario.mother_last_name || '', [Validators.required]],
      ['full_name']: [usuario.full_name || '', [Validators.required]],
      ['ci']: [usuario.ci || '', [Validators.required]],
      ['birth_date']: [usuario.birth_date || '', [Validators.required]],
      ['birth_place']: [usuario.birth_place || '', [Validators.required]],
      ['phone']: [usuario.phone || '', [Validators.required]],
      ['cell_phone']: [usuario.cell_phone || '', [Validators.required]],
      ['address']: [usuario.address || '', [Validators.required]],
      ['email']: [usuario.email || '' , [Validators.required, Validators.email] ]
    }
    );
  }
  guardarInformacionUsuario() {
    this.subscription = this.personService.actualizarCliente({
      id: this.usuario.id,
      ...this.myForm.value
    }).subscribe( (resp) => {
      this.informacionService.presentToast('Informacion se Guardo correctamente');
    });
    // this.router.navigate(['/home']);
  }
}
