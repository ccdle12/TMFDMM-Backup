import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from '../../shared/services/auth.service'
import 'rxjs/add/operator/map';


@Injectable()
export class KumulosService {
    
    private domain: string;
    private getAllCitiesURI: string;
    private getActiveVersionForCityURI: string;
    private getWebDashboardURI: string;
    private getWebSurveyURI: string;
    private getDemoCityURI: string;
    private getDemoUserJWTURI: string;
    private getCreateUpdateUserSurveyDataURI: string;
    private getWebUsersURI: string;
    private getCaseStudiesURI: string;
    private getBestPracticesURI: string;
    private getWebEvidenceURI: string;
    private getSubmitInterestRequestURI: string;
    private getWebAggregatesByVersionandUserURI: string;
    private getWebAggregatesForOrganizationResultsURI: string;
    private getWebWhiskerBoxDataByVersionURI: string;
    private requestSurveyURI: string;
    private updateNameAndTitleURI: string;
    private userProfileURI: string;
    private inviteUsersURI: string;

    constructor(private http: Http, public authService: AuthService) {
        this.initializeAllInstanceVariables();
    }

    public initializeAllInstanceVariables(): void {
        this.domain = "https://api.kumulos.com/b2.2/ee263e29-20c7-471f-92eb-5fe34a19e80f/";

        this.getAllCitiesURI = "getAllCities.json/";
        this.getActiveVersionForCityURI = "getActiveVersionForCity.json/";
        this.getWebDashboardURI = "webGetDashboard.json/";
        this.getWebSurveyURI = "/webGetSurvey.json/";
        this.getDemoCityURI = "/getDemoCityID.json/";
        this.getDemoUserJWTURI = "/getDemoUserJWT.json";
        this.getCreateUpdateUserSurveyDataURI = "create_updateUserSurveyData.json";
        this.getWebUsersURI = "webGetUsers.json/";
        this.getCaseStudiesURI = "/getCaseStudiesByDimension.json/";
        this.getBestPracticesURI = "getBestPracticesByDimension.json/";
        this.getWebEvidenceURI = "webGetEvidence.json/";
        this.getSubmitInterestRequestURI = "webSubmitInterestRequest.json/";
        this.getWebAggregatesByVersionandUserURI = "webgetAggregatesByVersionandUser.json/";
        this.getWebAggregatesForOrganizationResultsURI =  "webgetAggregatesByVersion.json/";
        this.getWebWhiskerBoxDataByVersionURI = "webgetWhiskerBoxDatabyVersion.json/";
        this.requestSurveyURI = "requestSurveyCSV.json/";
        this.updateNameAndTitleURI = "webUpdateNameTitle.json/";
        this.userProfileURI = "webGetUserProfile.json/";
        this.inviteUsersURI = "webInviteUser.json/";
    }

    public createAuthorizationHeader(): Headers {
        let headers = new Headers();

        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Basic ZWUyNjNlMjktMjBjNy00NzFmLTkyZWItNWZlMzRhMTllODBmOmx2WElGZUlpQlNkOXErNnVIbXFEUlJrUVA4TzNNVXlKdmV3MA=='); 
        

        return headers;
    }

    public createBody(): URLSearchParams {
        let urlSearchParams: URLSearchParams = new URLSearchParams();
        let userJWT: string;

        if (!this.authService.isVerified() || !this.authService.isAuthenticated()) {
            // console.log('using demo JWT');
            userJWT = localStorage.getItem('demoJWT');
        } else {
            // console.log('using id_token JWT');
            userJWT = localStorage.getItem('id_token');
        }

        //Replace value below for testing w/ C0tham1969' to show values from kumulos updating the sliders 
        urlSearchParams.append('params[jwt]', userJWT);
    
        return urlSearchParams;
    }

    public getAllCities(): any {
        let headers: Headers = this.createAuthorizationHeader();
        let urlSearchParams: URLSearchParams = this.createBody();
        let body: String = urlSearchParams.toString();
        
        return this.http.post(this.domain + this.getAllCitiesURI, body, {headers: headers})
                .map(response => {
                    return response.json()
                });
    };

    public getActiveVersionForCity(): any {
        let userCityId;
        let headers: Headers = this.createAuthorizationHeader();
        let urlSearchParams: URLSearchParams = this.createBody();

        if (!this.authService.isVerified() || !this.authService.isAuthenticated()) {
            userCityId = localStorage.getItem('demoCity');
            // console.log("getting demo city: " + userCityId);
        } else {
            let userProfile: any = JSON.parse(localStorage.getItem('user'));
            userCityId = userProfile.city_id;
            // console.log("getting User Profile City Id");
        }

        // console.log("getting demo city in body: " + userCityId);
        urlSearchParams.append('params[cityID]', userCityId);

        let body: String = urlSearchParams.toString();

        // console.log("body for active city versions: " + body);
         return this.http.post(this.domain + this.getActiveVersionForCityURI, body, {headers: headers})
                .map(response => {
                    // console.log("response from active city", response.json());
                    return response.json()
        });
    }

    public getWebDashboard(activeVersionNumber: string): any {
        let headers: Headers = this.createAuthorizationHeader();
        let urlSearchParams: URLSearchParams = this.createBody();
        
        // console.log('kumulos get web dashboard', 'active version number: ' + activeVersionNumber);
        urlSearchParams.append('params[version]', activeVersionNumber);

        var body: String = urlSearchParams.toString();

        return this.http.post(this.domain + this.getWebDashboardURI, body, {headers: headers})
            .map(response => {
                    return response.json();
            });
    }

    public getWebSurvey(activeVersionNumber: string, areaID: string, dimensionID: string): any {
        let headers: Headers = this.createAuthorizationHeader();
        let urlSearchParams: URLSearchParams = this.createBody();
        
        urlSearchParams.append('params[version]', activeVersionNumber);
        urlSearchParams.append('params[areaID]', areaID);
        urlSearchParams.append('params[dimensionID]', dimensionID);

        let body: String = urlSearchParams.toString();

        return this.http.post(this.domain + this.getWebSurveyURI, body, {headers: headers})
            .map(response => {
                return response.json();
            });
    }

    public getDemoCity() {
        let headers: Headers = this.createAuthorizationHeader();

        return this.http.post(this.domain + this.getDemoCityURI, null, {headers: headers})
            .map(response => {
                // console.log("Demo City: " + response.toString());
                return response.json();
            });
    }

    public getDemoUserJWT() {
        let headers: Headers = this.createAuthorizationHeader();

        return this.http.post(this.domain + this.getDemoUserJWTURI, null, {headers: headers})
            .map(response => {
                // console.log("Demo JWT: " + response.toString());
                return response.json();
            });
    }

    public getCreateUpdateUserSurveyData(surveyData: string) {
        let headers: Headers = this.createAuthorizationHeader();

        let urlSearchParams: URLSearchParams = this.createBody();

        urlSearchParams.append('params[surveyData]', surveyData);

        let body: String = urlSearchParams.toString();

        return this.http.post(this. domain + this.getCreateUpdateUserSurveyDataURI, body, {headers: headers})
            .map(response => {
                // console.log(response.json());
                return response.json();
            }); 
    }

    public getWebUsers() {
        let headers: Headers = this.createAuthorizationHeader();

        let urlSearchParams: URLSearchParams = this.createBody();
        let userJSON: JSON = JSON.parse(localStorage.getItem('user'));
        let cityId: string = userJSON['city_id'];

        urlSearchParams.append('params[groupId]', cityId);

        let body: String = urlSearchParams.toString();
        
        return this.http.post(this. domain + this.getWebUsersURI, body, {headers: headers})
            .map(response => {
                // console.log(response.json());
                return response.json();
            }); 
    }

    public getCaseStudies(areaID: string, dimensionID: string): any {
        let headers: Headers = this.createAuthorizationHeader();

        let urlSearchParams: URLSearchParams = this.createBody();

         urlSearchParams.append('params[areaID]', areaID);
         urlSearchParams.append('params[dimensionID]', dimensionID);

         let body: String = urlSearchParams.toString();

          return this.http.post(this.domain + this.getCaseStudiesURI, body, {headers: headers})
            .map(response => {
                console.log(response.json());
                return response.json();
            });
    }

    public getBestPractices(areaID: string, dimensionID: string): any {
        let headers: Headers = this.createAuthorizationHeader();

        let urlSearchParams: URLSearchParams = this.createBody();

         urlSearchParams.append('params[areaID]', areaID);
         urlSearchParams.append('params[dimensionID]', dimensionID);

         let body: String = urlSearchParams.toString();

          return this.http.post(this.domain + this.getBestPracticesURI, body, {headers: headers})
            .map(response => {
                // console.log(response.json());
                return response.json();
            });
    }

    public getWebGetEvidence(activeVersionNumber: string, areaID: string, dimensionID: string): any {
        let headers: Headers = this.createAuthorizationHeader();

        let urlSearchParams: URLSearchParams = this.createBody();

         urlSearchParams.append('params[version]', activeVersionNumber);
         urlSearchParams.append('params[areaID]', areaID);
         urlSearchParams.append('params[dimensionID]', dimensionID);

         let body: String = urlSearchParams.toString();

          return this.http.post(this.domain + this.getWebEvidenceURI, body, {headers: headers})
            .map(response => {
                // console.log(response.json());
                return response.json();
            });
    }

    public getSubmitInterestRequest(name: string, organization: string, jobTitle: string, country: string,
                                    email: string, phone: string, comments: string) {

        let headers: Headers = this.createAuthorizationHeader();

        let urlSearchParams: URLSearchParams = this.createBody();
        urlSearchParams.append('params[name]', name);
        urlSearchParams.append('params[organization]', organization);
        urlSearchParams.append('params[jobTitle]', jobTitle);
        urlSearchParams.append('params[country]', country);
        urlSearchParams.append('params[email]', email);
        urlSearchParams.append('params[phone]', phone);
        urlSearchParams.append('params[comments]', comments);
        urlSearchParams.append('params[userProfile]', localStorage.getItem('userProfile'));

        let body: string = urlSearchParams.toString();

        return this.http.post(this.domain + this.getSubmitInterestRequestURI, body, {headers: headers})
            .map(response => {
                // console.log(response.json());
                return response.json();
            });
    }

    public getAggregatesByVersionandUser(activeVersionNumber: string, userID: string) {
        let headers: Headers = this.createAuthorizationHeader();

        let urlSearchParams: URLSearchParams = this.createBody();

        urlSearchParams.append('params[version]', activeVersionNumber);
        urlSearchParams.append('params[userID]', userID);

        let body: string = urlSearchParams.toString();

        return this.http.post(this.domain + this.getWebAggregatesByVersionandUserURI, body, {headers: headers})
            .map(response => {
                // console.log(response.json());
                return response.json();
            });
    }

    public getAggregatesForOrganizationResults(activeVersionNumber: string) {
        let headers: Headers = this.createAuthorizationHeader();

        let urlSearchParams: URLSearchParams = this.createBody();

        urlSearchParams.append('params[version]', activeVersionNumber);

        let body: string = urlSearchParams.toString();

        return this.http.post(this.domain + this.getWebAggregatesForOrganizationResultsURI, body, {headers: headers})
            .map(response => {
                return response.json();
            });
    }

    public getWhiskerBoxDataByVersion(activeVersionNumber: string) {
        let headers: Headers = this.createAuthorizationHeader();

        let urlSearchParams: URLSearchParams = this.createBody();

        urlSearchParams.append('params[version]', activeVersionNumber);

        let body: string = urlSearchParams.toString();

        return this.http.post(this.domain + this.getWebWhiskerBoxDataByVersionURI, body, {headers: headers})
            .map(response => {
                console.log(response.json());
                return response.json();
            });
    }

    public sendRequestSurveyCSV(activeVersionNumber: string, emailAddress: string) {
        let headers: Headers = this.createAuthorizationHeader();

        let urlSearchParams: URLSearchParams = this.createBody();

        urlSearchParams.append('params[version]', activeVersionNumber);
        urlSearchParams.append('params[emailAddress]', emailAddress);

        let body: string = urlSearchParams.toString();

        return this.http.post(this.domain + this.requestSurveyURI, body, {headers: headers})
            .map(response => {
                console.log(response.json());
                return response.json();
            });
    }

    public requestIndividualSurveyCSV(activeVersionNumber: string, emailAddress: string) {
        let headers: Headers = this.createAuthorizationHeader();

        let urlSearchParams: URLSearchParams = this.createBody();

        urlSearchParams.append('params[version]', activeVersionNumber);
        urlSearchParams.append('params[emailAddress]', emailAddress);
        urlSearchParams.append('params[individualDataOnly]', '1');

        let body: string = urlSearchParams.toString();

        return this.http.post(this.domain + this.requestSurveyURI, body, {headers: headers})
            .map(response => {
                console.log(response.json());
                return response.json();
            });
    }

    public updateUserNameAndJobTitle(userId: string, name: string, jobTitle: string) {
        let headers: Headers = this.createAuthorizationHeader();

        let urlSearchParams: URLSearchParams = this.createBody();

        urlSearchParams.append('params[userId]', userId);
        urlSearchParams.append('params[name]', name);
        urlSearchParams.append('params[jobTitle]', jobTitle);

        let body: string = urlSearchParams.toString();

        return this.http.post(this.domain + this.updateNameAndTitleURI, body, {headers: headers})
            .map(response => {
                console.log(response.json());
                return response.json();
            });
    }

    public getUserProfile(userId: string) {
        let headers: Headers = this.createAuthorizationHeader();

        let urlSearchParams: URLSearchParams = this.createBody();

        urlSearchParams.append('params[userId]', userId);

        let body: string = urlSearchParams.toString();

        return this.http.post(this.domain + this.userProfileURI, body, {headers: headers})
            .map(response => {
                console.log(response.json());
                return response.json();
            });
    }

    public inviteUser(email: string, cityName: string, cityId: string) {
        let headers: Headers = this.createAuthorizationHeader();

        let urlSearchParams: URLSearchParams = this.createBody();

        urlSearchParams.append('params[email]', email);
        urlSearchParams.append('params[city]', cityName);
        urlSearchParams.append('params[city_id]', cityId);

        let body: string = urlSearchParams.toString();

        return this.http.post(this.domain + this.inviteUsersURI, body, {headers: headers})
            .map(response => {
                console.log(response.json());
                return response.json();
            })
    }
}
