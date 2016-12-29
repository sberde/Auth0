import {Injectable} from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';
import {options} from '../auth.options';
 
declare var Auth0Lock:any;

@Injectable()
export class Auth{
    // configure Auth0.
    // Supply client id, domain name and blank {} for default options.
    // These details are available at auth0 site under your project

    lock = new Auth0Lock(
        'PeMZDYTkuZZIHP2PoyUR4rhZ1T0aMkj8',
        'sandeepberde.auth0.com',
        options
        );

    constructor() {
        // Add callback for lock `authenticated` event
        this.lock.on("authenticated", (authResult:any) => {
            this.lock.getProfile(authResult.idToken, function(error:any, profile:any){
                if(error){
                    throw new Error(error);
                }
                //set profile and set tolen
                localStorage.setItem('profile', JSON.stringify(profile));
                localStorage.setItem('id_token', authResult.idToken);
               })


        });
    }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  }

}
