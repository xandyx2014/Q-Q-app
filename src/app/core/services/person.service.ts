import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_WEB } from 'src/app/config/variable.config';
import { Person } from 'src/app/shared/interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class PersonService {
    constructor(
        private http: HttpClient
    ) {}
    obtenerCliente(id) {
        return this.http.get(`${URL_WEB}/person/${id}`);
    }
    actualizarCliente(persona: Person) {
        return this.http.put(`${URL_WEB}/person/${persona.id}`, {...persona});
    }
}
