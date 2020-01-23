import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClientService } from 'src/app/service/http-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EventEmitterService } from 'src/app/service/event-emitter.service';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  
  client: Client = new Client("","","","","");

  constructor(private httpClientService: HttpClientService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private eventEmitterService: EventEmitterService) { 
    }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
        this.client['id'] = params['id']
        this.client['nome'] = params['nome'];
        this.client['cpf'] = params['cpf'];
        this.client['telefone1'] = params['telefone1'];
        this.client['telefone2'] = params['telefone2'];
      });
  }
}
