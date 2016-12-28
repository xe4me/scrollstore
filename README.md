# scroll-store [![Travis][build-badge]][build] [![npm][npm-badge]][npm]


A module to mock scroll behaviours for SPA apps created by Angular2 ( and above ).

The result is a normal scroll behaviour of the browser, where it knows where you left the page and when you go back it scrolls you to
that position and if the page is new, it scrolls you to the top of the page

## Usage
1-  ```$ npm install scrollstore```;

2- Go to your app.module ( where you import all your root modules ).

```js
import { ScrollStoreModule } from 'scrollStore';
```

3- Add ScrollStoreModule to your app module

```js
@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    ScrollStoreModule, // put it here
    BrowserModule,
    FormsModule,
    HttpModule
    .. rest of your modules ....
  ]
})

export class AppModule {
...

```


### What id does

 - Subscribes to navigation events and on loads checks if the loaded route has loaded once with a scroll position,
 - If yes, then scrolls to the saved position
 - If no , scrolls to top of the page

