import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClientService } from '../add-user/http-client.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertModalService } from '../shared/alert-modal.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  angForm: FormGroup;
  users: User[];

  constructor(private fb: FormBuilder,
    private httpClientService: HttpClientService,
    private router: Router,
    private alertService: AlertModalService) {
    this.createForm();
  }

  ngOnInit() {
    this.findAll();
  }

  createForm() {
    this.angForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      phone: ['', Validators.required],
      user: ['', Validators.required],
      password: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  addClient() {
    const obj = {
      id: this.angForm.value['id'],
      nome: this.angForm.value['nome'],
      phone: this.angForm.value['phone'],
      user: this.angForm.value['user'],
      password: this.angForm.value['password'],
      status: this.angForm.value['status']?true:false
    };
    this.httpClientService.createUser(obj).subscribe(
      res => {
        this.alertService.showAlertSuccess('Cadastro Realizado com sucesso');
        this.findAll();
      }, error => {
        this.alertService.showAlertDanger('Erro ao realizar cadastro');
        console.log(error);
      },
      () => console.debug('Observable Complete'));
    this.resetar();
  }

  findAll() {
    this.httpClientService.getUsers().subscribe(
      res => {
        this.users = res;
      }, error => {
        this.alertService.showAlertDanger('Erro ao listar cadastro');
        console.log(error);
      },
      () => console.debug('Observable Complete'));
  }


  deleteUser(user: User): void {
    this.httpClientService.deleteUser(user).subscribe(
      res => {
        this.alertService.showAlertSuccess('Cadastro excluido com sucesso');
        this.findAll();
      }, error => {
        this.alertService.showAlertDanger('Erro ao excluir cadastro');
        console.log(error);
      },
      () => console.debug('Observable Complete'));
  };

  updateUser(user: User): void {
    this.angForm.patchValue({id: user['id'],
                             nome: user['nome'],
                             phone: user['phone'],
                             user: user['user'],
                             password: user['password'],
                             status: user['status']
                            });
  };

  resetar(){
    this.angForm.reset();
  }

}
