import {Component} from 'angular2/core';
import {Http} from 'angular2/http';


@Component({
  selector: 'log-view',
  templateUrl: 'app/components/log-view/log-view.html',
  styleUrls: ['app/components/log-view/log-view.css'],
  providers: [],
  directives: [],
  pipes: []
})
export class LogView {

  constructor(http:Http) {
    
  }
}
