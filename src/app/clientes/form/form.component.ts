import { Component, OnInit } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router'
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string ="Crear Cliente"

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarcleinte();
  }

   create(): void {
    this.clienteService.create(this.cliente)
    .subscribe(cliente => {
      this.router.navigate(['/clientes'])
      swal('Nuevo cliente', `Cliente ${cliente.nombre} creado con éxito`, 'success')
    }
    );
  }

  cargarcleinte(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id){
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
      }
    });
  }

  update(): void{
    this.clienteService.update(this.cliente)
    .subscribe( cliente => {
      this.router.navigate(['/clientes'])
      swal('Cliente actualizado', `Cliente ${cliente.nombre} actualizado con éxito`, 'success')
    });
    
  }

}
