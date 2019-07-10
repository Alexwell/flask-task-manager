'use strict';
import {main} from './main';


if (navigator.cookieEnabled) {
    main();
}
else  alert('You must enable cookies');



