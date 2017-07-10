import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

public getUserName(): string {
    if (localStorage.getItem('userName') !== null) {
        let userName = localStorage.getItem('userName');
        userName = this.removeQuotesFromString(userName);

        return userName;
    }
    return "Demo User";
}

public getUserCity(): string {
    if (localStorage.getItem('user') !== null) {
        let userProfile = JSON.parse(localStorage.getItem('user'));
        return userProfile.city;
        }
     return "Demo City";
    }

public getUserVerified(): string {
    let verification: string;
    
    if (localStorage.getItem('user') !== null) {
        let userProfile = JSON.parse(localStorage.getItem('user'));
        let userVerifiedStatus: string = userProfile.verified;
        return verification = userVerifiedStatus == "1" ? "verified" : "unverified";
    }

    return "unverified";
}

public getUserRole(): string {
     if (localStorage.getItem('user') !== null) {
        let userProfile = JSON.parse(localStorage.getItem('user'));
        return userProfile.user_role;
    }   
     return "Demo Role";
}

public getUserJWT(): string {
    if (localStorage.getItem('id_token') !== null) {
        let userJWT = localStorage.getItem('id_token');
       
        return userJWT;
    }
    console.log("demoJWT", localStorage.getItem('demoJWT'));
    return localStorage.getItem('demoJWT');
}

public getUserCityId(): string {
    if (localStorage.getItem('user') !== null) {
        let userProfile: any = JSON.parse(localStorage.getItem('user'));
        console.log('city_id in local storage service', userProfile.city_id);
        return userProfile.city_id;
    }
    return localStorage.getItem('demoCity');
}

private removeQuotesFromString(text: string) {
    return text.split('"').join('');
}

};