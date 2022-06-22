import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { AuthService } from './auth/shared/auth.service';
import { catchError, switchMap, take, filter } from 'rxjs/operators';
import { LoginResponse } from './auth/login/login-response.payload';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    isTokenRefreshing = false;
    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(public authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1
        || (req.url.indexOf('/api/team/') !== -1 && req.method.indexOf('GET') !== -1)
            || (req.url.indexOf('/api/subreddit') !== -1 && req.method.indexOf('GET') !== -1)) {
            return next.handle(req);
        }
        const jwtToken = this.authService.getJwtToken();

        if (jwtToken) {
            return next.handle(this.addToken(req, jwtToken)).pipe(catchError(error => {
                if (error instanceof HttpErrorResponse
                    && error.status === 403) {
                    return this.handleAuthErrors(req, next);
                } else {
                    return throwError(error);
                }
            }));
        }
        return next.handle(req);

    }

    private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler)
        : Observable<HttpEvent<any>> {
        if (!this.isTokenRefreshing) {
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);


            return this.authService.refreshToken().pipe(
                switchMap((refreshTokenResponse: LoginResponse) => {
                    this.isTokenRefreshing = false;
                    this.refreshTokenSubject
                        .next(refreshTokenResponse.authenticationToken);
                    return next.handle(this.addToken(req,
                        refreshTokenResponse.authenticationToken));
                })
            )
        } else {
            return this.refreshTokenSubject.pipe(
                filter(result => result !== null),
                take(1),
                switchMap(() => {
                    return next.handle(this.addToken(req,
                        this.authService.getJwtToken()))
                })
            );
        }
    }

    addToken(req: HttpRequest<any>, jwtToken: any) {
        return req.clone({
            setHeaders:{
                Authorization: `Bearer ${jwtToken}`
            }
        });
    }

}

// export class TokenInterceptor implements HttpInterceptor {
//     static accessToken = '';
//     refresh = false;

//     constructor(private http: HttpClient) { }

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//             const req = request.clone({
//                 setHeaders:{
//                     Authorization: `Bearer ${TokenInterceptor.accessToken}`
//                 }
//             });

//             return next.handle(req).pipe(catchError((err: HttpErrorResponse)=>{
//                 if(err.status === 401 && !this.refresh){
//                     this.refresh=true;

//                     return this.http.post('http://localhost:8080/api/refreshToken', {}, {withCredentials :true}).pipe(
//                         switchMap((res:any)=>{
//                             TokenInterceptor.accessToken = res.token;
//                             return next.handle(request.clone({
//                                 setHeaders:{
//                                     Authorization: `Bearer ${TokenInterceptor.accessToken}`
//                                 }
//                             }));
//                         })
//                     );
//                 }
//                 this.refresh = false;
//                 return throwError(()=> err);
//             }))
//         }
//     }