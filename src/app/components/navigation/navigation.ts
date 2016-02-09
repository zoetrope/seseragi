import {Component} from 'angular2/core';
import {Http} from 'angular2/http';


@Component({
  selector: 'navigation',
  templateUrl: 'app/components/navigation/navigation.html',
  styleUrls: ['app/components/navigation/navigation.css'],
  providers: [],
  directives: [],
  pipes: []
})
export class Navigation {

  constructor(http:Http) {
    
  }
}
