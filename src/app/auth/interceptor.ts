import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { EMPTY, Observable } from "rxjs";

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('aaaaaa');
    
    if(!req.url.match('/login')) {

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    }

    return next.handle(req);
  }

}

