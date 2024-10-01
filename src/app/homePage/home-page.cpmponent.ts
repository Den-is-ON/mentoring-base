import { Component } from "@angular/core";
import { NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';

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
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    standalone: true,
    imports: [RouterOutlet, NgIf, NgFor],
    styleUrl: './home-page.component.scss'
})
export class HomePageCompoment {
    readonly headerItem1 = 'Главная';

  readonly headerItem2 = 'О компании';  

  readonly headerItem3 = 'Каталог';

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
}