import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";

import { Urls } from "../settings";

@Injectable({ providedIn: "root" })
export class APIService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}
  get<T>(url: string, auth = false): Observable<T> {
    var httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    if (auth) {
      httpOptions.headers = httpOptions.headers.append(
        "Authorization",
        "Token " + this.authService.token
      );
    }

    return this.httpClient.get<T>(url, httpOptions);
  }
  post<T>(
    url: string,
    body: T,
    auth = false,
    jsonHeader = true
  ): Observable<T> {
    var httpOptions = {
      headers: new HttpHeaders({
        "accept-language": "fa-IR",
      }),
    };
    if (jsonHeader) {
      httpOptions.headers.append("content-type", "application/json");
    }
    if (auth) {
      httpOptions.headers = httpOptions.headers.append(
        "Authorization",
        "Token " + this.authService.token
      );
    }
    return this.httpClient.post<T>(url, body, httpOptions);
  }
  put<T>(url: string, body: T, auth = false): Observable<T> {
    var httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    if (auth) {
      httpOptions.headers = httpOptions.headers.append(
        "Authorization",
        "Token " + this.authService.token
      );
    }
    return this.httpClient.put<T>(url, body, httpOptions);
  }
  del<T>(url: string, auth = false): Observable<T> {
    var httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    if (auth) {
      httpOptions.headers = httpOptions.headers.append(
        "Authorization",
        "Token " + this.authService.token
      );
    }
    return this.httpClient.delete<T>(url, httpOptions);
  }
}

@Injectable({ providedIn: "root" })
export class AuthService {
  token = localStorage.getItem("token") || "";
  email = localStorage.getItem("email") || "";
  id = localStorage.getItem("id") || "";
  constructor(private httpClient: HttpClient) {}
  register(email: string, password: string) {
    return this.httpClient.post<any>(`${Urls.rootUrl}/Auth/signup`, {
      email: email,
      password: password,
    });
  }
  login(email: string, password: string) {
    return this.httpClient
      .post<any>(`${Urls.rootUrl}/Auth/login`, {
        email: email,
        password: password,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem("token", response["token"]);
          localStorage.setItem("email", response["email"]);
          localStorage.setItem("id", response["id"]);
        })
      );
  }
  logout() {
    var httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    httpOptions.headers = httpOptions.headers.append(
      "Authorization",
      "Token " + this.token
    );
    return this.httpClient
      .post<any>(`${Urls.rootUrl}/Auth/logout`, {}, httpOptions)
      .pipe(
        tap(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          localStorage.removeItem("id");
        })
      );
  }
}

@Injectable({ providedIn: "root" })
export class MessageService {
  messages = {
    err_password_incorrect: "رمز عبور اشتباه است",
    err_user_notfound: "حساب کابری مورد نظر وجود ندارد",
  };
  get(eng: string) {
    if (eng in this.messages) return this.messages[eng];
    return eng;
  }
}
