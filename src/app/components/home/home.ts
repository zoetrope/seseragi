import {Component} from 'angular2/core';
import {ObservableWebSocket} from '../../services/observable-websocket';
import {Observable} from 'rxjs/Observable'
import {Subscription} from 'rxjs/Subscription'

@Component({
  selector: 'home',
  templateUrl: 'app/components/home/home.html',
  styleUrls: ['app/components/home/home.css'],
  providers: [],
  directives: [],
  pipes: []
})
export class Home {

  subscription:Subscription<MessageEvent>;

  constructor() {
    this.init();
  }

  init() {
    const url = "ws://127.0.0.1:9991";
    const bufferSize = 10000;
    const limit = 30;

    var sock = new ObservableWebSocket();
    const connector = sock.connectAsync(url);

    connector.subscribe((obs:Observable<MessageEvent>)=> {
      obs.subscribe(msg=> {
        console.log("msg: " + msg.data);
      })
    });

    //const connectable = connector
    //  .catch((ex)=> {
    //    return Observable.empty<any>();
    //  })
    //  .flatMap((receiver)=> {
    //    return receiver;
    //  })
    //  .map((evt)=> evt.data)
    //  .publish();

    //const allLogs = connectable
    //  .filter(data => data.type === "aqua.all")
    //  .select(data => new app.models.AllLog(data.log))
    //  .bufferWithTime(1000)
    //  .toReactiveCollection($scope, {bufferSize: $scope.bufferSize, reverse: true});

    //this.subscription = connectable.connect();

    //const close = sock.stateAsObservable()
    //  .filter(state => state == WebSocket.OPEN);
    //
    //close.subscribe(() => {
    //  this.subscription.unsubscribe();
    //  //allLogs.dispose();
    //});

  }
}
