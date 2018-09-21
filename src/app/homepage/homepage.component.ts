import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider, LinkedinLoginProvider
} from 'angular-6-social-login';
import { CookieService } from 'ngx-cookie-service';
import {error} from '@angular/compiler-cli/src/transformers/util';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  cookieValue_fbUserID = 'UNKNOWN';
  cookieValue_fbUserEmail = 'UNKNOWN';
  cookieValue_fbUserImage = 'UNKNOWN';
  cookieValue_fbUserToken = 'UNKNOWN';
  cookieValue_fbUserName = 'UNKNOWN';
  constructor(private socialAuthService: AuthService, private cookieService: CookieService, private http: HttpClient) {


  }

  ngOnInit() {



  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "linkedin") {
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        const link = 'https://audiodeadline.com/demo/php/facebook_longlivetoken.php/';
        this.http.post(link, { token: userData.token, appid: '906815096194208', appsecret: 'f569451eb41a239d2045ebf115a3bcc7'})
          .subscribe(data => {

            console.log(data);
            let dataVal: any;
            dataVal = data;
            this.cookieService.set( 'fb_user_token', dataVal.token );


          }, error1 => {
            console.log('error');
          });


         // });
        console.log(socialPlatform +"sign in data :", userData);
        // Now sign-in with userData
        this.cookieService.set( 'fb_user_id', userData.id );
        this.cookieService.set( 'fb_user_email', userData.email );
        this.cookieService.set( 'fb_user_image', userData.image );
        this.cookieService.set( 'fb_user_token', userData.token );
        this.cookieService.set( 'fb_user_name', userData.name );

      }
    );
  }
  getfbInfo() {
    this.cookieValue_fbUserID = this.cookieService.get('fb_user_id');
    this.cookieValue_fbUserEmail = this.cookieService.get('fb_user_email');
    this.cookieValue_fbUserImage = this.cookieService.get('fb_user_image');
    this.cookieValue_fbUserToken = this.cookieService.get('fb_user_token');
    this.cookieValue_fbUserName = this.cookieService.get('fb_user_name');
  }
  removefbInfo() {

    this.cookieService.deleteAll();
    this.getfbInfo();
    console.log(123456);

  }

}
