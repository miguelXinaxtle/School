import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NeedAuthService } from "./service/need-auth.service";
import { SplashScreenComponent } from "./splash-screen/splash-screen.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { SchoolAddComponent } from "./school/school-add/school-add.component";
import { SchoolModifyComponent } from "./school/school-modify/school-modify.component";

const routes: Routes = [
  { path: "splash", component: SplashScreenComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "home", component: HomeComponent, canActivate: [NeedAuthService] },
  {
    path: "school-add",
    component: SchoolAddComponent,
    canActivate: [NeedAuthService],
  },
  {
    path: "school-modify",
    component: SchoolModifyComponent,
    canActivate: [NeedAuthService],
  },
  { path: "**", redirectTo: "splash" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
