import {
    Optional,
    Injectable,
    NgModule
} from '@angular/core';
import {
    NavigationStart,
    NavigationEnd,
    Router
} from '@angular/router';
@Injectable()
export class SessionStorageService {
    write ( key : string, value : any ) {
        if ( value ) {
            value = JSON.stringify( value );
        }
        sessionStorage.setItem( key, value );
    }

    read<T> ( key : string ) : T {
        let value : string = sessionStorage.getItem( key );

        if ( value && value != "undefined" && value != "null" ) {
            return <T>JSON.parse( value );
        }
    }
}
@Injectable()
export class ScrollStore {
    constructor ( @Optional() private router : Router, private storageService : SessionStorageService ) {
        if ( router ) {
            this.subscribeToRouter();
        }
    }

    subscribeToRouter () {
        this.router.events.subscribe( event => {
            if ( event instanceof NavigationStart ) {
                this.saveScrollPos( this.currentUrl );
            }
            if ( event instanceof NavigationEnd ) {
                this.retrieveScrollPos( event );
            }
        } );
    }

    private scrollToZero () {
        this.scrollTop = 0;
    }

    private get currentUrl () {
        return this.router.url;
    }

    private get scrollTop () {
        return document.body.scrollTop
    }

    private set scrollTop ( number : number ) {
        document.body.scrollTop = number;
    }

    private saveScrollPos ( url ) {
        this.storageService.write( url, this.scrollTop );
    }

    private retrieveScrollPos ( event : NavigationStart ) {
        let retrievedScrollPos = this.storageService.read( event.url );
        if ( retrievedScrollPos === undefined ) {
            console.log( 'No saved position for ' + event.url + ' scroll to zero instead' );
            this.scrollToZero();
        } else {
            console.log( 'Postion found for ' + event.url + ' scroll to' + retrievedScrollPos );
            this.scrollTo( retrievedScrollPos as number );
        }

    }

    private scrollTo ( retrievedScrollPos : number ) {
        this.scrollTop = retrievedScrollPos;
    }
}

@NgModule( {
    providers : [
        SessionStorageService,
        ScrollStore
    ]
} )
export class ScrollStoreModule {
    constructor ( private scrollStore : ScrollStore ) {

    }
}