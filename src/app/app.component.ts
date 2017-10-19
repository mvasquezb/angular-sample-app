import { Component, Injectable } from '@angular/core';
import { Item } from './item';
import { NgForm } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private headers = new Headers({
    'Content-Type': 'application/json',
  });
  title = 'Sample App';

  constructor(private _http: Http) {}

  onSubmit(form: NgForm): Promise<Item> {
    console.log(form.value);
    return this._http.post(
      'http://sample.app/api/items',
      JSON.stringify(form.value),
      {headers: this.headers}
    )
    .toPromise()
    .then((res) => res.json().data)
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error ocurred', error);
    return Promise.reject(error.message || error);
  }
}
