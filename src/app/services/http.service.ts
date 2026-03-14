import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import Swal from 'sweetalert2';
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
  header = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }),
  };
  get headerToken() {
    const token: any = localStorage.getItem("token");
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${JSON.parse(token)}`,
      }),
    };
  }

  post(url: string, data: any, token: boolean, loader: boolean = true) {
    if (loader) {
      // LoaderService.loader.next(true);
    }
    let options = token ? this.headerToken : this.header;
    if (data instanceof FormData) {
      options = { headers: options.headers.delete("Content-Type") };
    }
    return this.http.post(environment.baseUrl + url, data, options).pipe(
      // finalize(() => LoaderService.loader.next(false)),
      tap((res: any) => {
        if (res?.message) {
          Swal.fire({
            title: 'Success!',
            text: res.message,
            icon: 'success',
            background: '#ffffff',
            color: '#333333',
            confirmButtonColor: '#FFF22F',
            confirmButtonText: 'OK',
            buttonsStyling: true,
            showClass: {
              popup: 'animate__animated animate__fadeInDown animate__faster'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp animate__faster'
            },
            customClass: {
              popup: 'elegant-swal',
              title: 'elegant-swal-title',
              confirmButton: 'elegant-swal-confirm-btn text-dark'
            }
          });
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // LoaderService.loader.next(false);
          const errorMessage = error?.error?.message || error?.message || "Server error";
          Swal.fire({
            title: 'Error!',
            text: errorMessage,
            icon: 'error',
            background: '#ffffff',
            color: '#333333',
            confirmButtonColor: '#CA2B28',
            confirmButtonText: 'Dismiss',
            buttonsStyling: true,
            showClass: {
              popup: 'animate__animated animate__shakeX animate__faster'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOut animate__faster'
            },
            customClass: {
              popup: 'elegant-swal',
              title: 'elegant-swal-title',
              confirmButton: 'elegant-swal-error-btn text-white'
            }
          });

        return throwError(error.message || "Server error");
      })
    );
  }

  get(url: string, token: boolean) {
    // LoaderService.loader.next(true);
    return this.http
      .get(environment.baseUrl + url, token ? this.headerToken : this.header)
      .pipe(
        // finalize(() => LoaderService.loader.next(false)),
        tap((res: any) => {
          // if (res?.message || res?.messsage) {
          //   this.toastr.success(res?.message ? res?.message : res?.messsage);
          // }
        }),
        catchError((error: HttpErrorResponse) => {
          // LoaderService.loader.next(false);
          return throwError(error.message || "Server error");
        })
      );
  }
}
