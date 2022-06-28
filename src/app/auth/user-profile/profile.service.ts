import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs";
import { ProfilePayload } from "./profile.payload";

@Injectable({
    providedIn: 'root'
})



export class ProfileService{

    constructor(private http: HttpClient){}

    getAllProfiles(): Observable<Array<ProfilePayload>>{
        return this.http.get<Array<ProfilePayload>>('http://localhost:8080/api/profile')
    }

    getProfile(name: string): Observable<ProfilePayload>{
        return this.http.get<ProfilePayload>('http://localhost:8080/api/profile/' + name);
    }

    updateProfile(profile: ProfilePayload): Observable<any>{
        return this.http.post<any>(`http://localhost:8080/api/profile/editProfile`, profile)
    }
}