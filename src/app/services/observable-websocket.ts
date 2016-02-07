import {Observer} from 'rxjs/Observer'
import {Observable} from 'rxjs/Observable'
import {Subject} from 'rxjs/Subject'
import {AsyncSubject} from 'rxjs/subject/AsyncSubject'
import {Subscription} from 'rxjs/Subscription'

export class ObservableWebSocket {
  socket:WebSocket;
  stateSubject:Subject<number>;

  constructor() {
    this.stateSubject = new Subject<number>();
  }

  connectAsync(url:string):Observable<Observable<MessageEvent>> {
    var connector = new AsyncSubject<Observable<MessageEvent>>();

    this.socket = new WebSocket(url);

    this.stateSubject.next(WebSocket.CONNECTING);

    this.socket.onerror = (ee:ErrorEvent) => {
      connector.error(ee);
    };
    this.socket.onclose = (ce:CloseEvent) => {
      this.stateSubject.next(WebSocket.CLOSED);
      connector.complete();
    };

    this.socket.onopen = (e:Event) => {
      this.stateSubject.next(WebSocket.OPEN);
      var receiver = new Observable<MessageEvent>((observer:Observer<MessageEvent>)=> {
        this.socket.onmessage = (msg:MessageEvent):any=> {
          observer.next(msg);
        };
        this.socket.onerror = (ee:ErrorEvent) => {
          observer.error(ee);
        };
        this.socket.onclose = (ce:CloseEvent) => {
          this.stateSubject.next(WebSocket.CLOSED);
          observer.complete();
        };
        return new Subscription(()=> {
          this.socket.close();
        });
      });
      connector.next(receiver);
      connector.complete();
    };
    return connector;
  }

  stateAsObservable():Observable<number> {
    return this.stateSubject;
  }
}
