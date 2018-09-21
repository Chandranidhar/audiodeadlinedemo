import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {appRoutingProviders, routing } from './routes';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { Home1Component } from './home1/home1.component';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider, LinkedinLoginProvider,
} from 'angular-6-social-login';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('906815096194208')
      }/*,
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("Your-Google-Client-Id")
      },
      {
        id: LinkedinLoginProvider.PROVIDER_ID,
        provider: new LinkedinLoginProvider("1098828800522-m2ig6bieilc3tpqvmlcpdvrpvn86q4ks.apps.googleusercontent.com")
      },*/
    ]
);
  return config;
}
/*const config = new AuthServiceConfig(
  [
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('906815096194208')
    },
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('Your-Google-Client-Id')
    },
    {
      id: LinkedinLoginProvider.PROVIDER_ID,
      provider: new LinkedinLoginProvider('1098828800522-m2ig6bieilc3tpqvmlcpdvrpvn86q4ks.apps.googleusercontent.com')
    },
  ]);*/


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    Home1Component
  ],
  imports: [
    BrowserModule,
    routing, SocialLoginModule,
    HttpClientModule
  ],
  providers: [appRoutingProviders, CookieService ,{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
