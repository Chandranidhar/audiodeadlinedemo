import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider, LinkedinLoginProvider
} from 'angular-6-social-login';
import { CookieService } from 'ngx-cookie-service';
import {error} from '@angular/compiler-cli/src/transformers/util';
import { FacebookService, InitParams } from 'ngx-facebook';     // Inject FacebookService and call the init method (
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  cookieValue_fbUserID = '';
  cookieValue_fbUserEmail = '';
  cookieValue_fbUserImage = '';
  cookieValue_fbUserToken = '';
  cookieValue_fbUserName = '';
  pageData:any='';
  private pagefeedData: any='';
  showPage:any =0;
  constructor(private socialAuthService: AuthService, private cookieService: CookieService, private http: HttpClient,private fb: FacebookService) {

    let initParams: InitParams = {
      appId: '906815096194208',
      xfbml: true,
      version: 'v2.8'
    };

    fb.init(initParams);    //This method must be called before using login or api methods


  }

  ngOnInit() {



  }

  public socialSignIn(socialPlatform: string) {                          //sign in function
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
        const link = 'https://audiodeadline.com/demo/php/facebook_longlivetoken.php/';          //link for long-lived token
        this.http.post(link, { token: userData.token, appid: '906815096194208', appsecret: 'f569451eb41a239d2045ebf115a3bcc7'})
          .subscribe(data => {

            console.log(data);
            let dataVal: any;
            dataVal = data;
            this.cookieService.set( 'fb_user_token', dataVal.token );

            const link2 = 'https://audiodeadline.com/demo/php/facebook_api_pagelist.php';
            this.http.post(link2, { token: dataVal.token})
              .subscribe( data => {
                let data_val: any ;
                data_val = data;
                this.pageData = data;
                console.log(data_val);
                // this.cookieService.set('access_token', data_val.token);
                },
                error1 => {
                console.log('error2');
                }
              );


          }, error1 => {
            console.log('error');
          });


         // });
        console.log(socialPlatform +"sign in data :", userData);
        // Now sign-in with userData
        this.cookieService.set( 'fb_user_id', userData.id );                    //set the cookie
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
  getpagefeed(pageid) {

    const link2 = 'https://audiodeadline.com/demo/php/facebook_api_pagefeed.php';
    this.http.post(link2, { token: this.cookieService.get('fb_user_token'), pageid : pageid })
      .subscribe( data => {
          let data_val: any ;
          data_val = data;
          this.pagefeedData = data;
          console.log(data_val);
          // this.cookieService.set('access_token', data_val.token);
        },
        error1 => {
          console.log('error2');
        }
      );
  }
  getPageInfo(){
    this.showPage = 1;
  }

}
