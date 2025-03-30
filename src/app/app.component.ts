import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { YellowBasketDirective } from './directives/yellow-basket.directive';
import { UserService } from './services/userService.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from './auth/auth.component';

const switchingPagesInReverse: number[] = [5, 4, 3, 2, 1]

const menuBottomItems = ['Каталог', 'Стройматериалы', 'Инструменты', 'Электрика', 'Интерьер и одежда']

const upperCaseMenuBottomItems = menuBottomItems.map(
  (item: string) => {
    return item.toUpperCase()
  }
)

const fun1 = (value: string) => value

const aboutCompany: string = fun1('О компании')

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgFor, RouterLink, RouterLinkActive, DatePipe, YellowBasketDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string = 'mentoring-first-project';

  readonly headerItem1 = 'Главная';

  readonly headerItem2 = 'О компании';

  readonly headerItem3 = 'Каталог';

  readonly headerItem4 = 'Админка'

  readonly header2Item1 = 'Каталог';

  readonly header2Item2 = 'Стройматериалы';

  readonly header2Item3 = 'Инструменты';

  readonly header2Item4 = 'Электрика';

  readonly header2Item5 = 'Интерьер и одежда';

  menuBottomItems: string[] = upperCaseMenuBottomItems

  isShowCatalog: boolean = true;

  isShowImg: boolean = true;

  isUpperCase = true;

  changingLetterCase() {
    this.menuBottomItems = this.menuBottomItems.map(
      item => this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
    )
    this.isUpperCase = !this.isUpperCase
  }

  readonly aboutCompany = aboutCompany

  readonly switchingPagesInReverse: number[] = switchingPagesInReverse

  readonly todaysDate = new Date()

  private userService = inject(UserService)
  private router = inject(Router)
  private readonly dialog = inject(MatDialog)

  openDialog(): void {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: "400px",
      height: "200px"
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log(result)
      if (result === 'admin') {
        this.userService.loginAsAdmin()
      } else if (result === 'user') {
        this.userService.loginAsUser()
      } else return undefined
    });
  }

  public logout() {
    this.userService.logout();
    this.router.navigate(['/']); // Перейти на главную после выхода

    console.log('Вышли на главную')
  }
}