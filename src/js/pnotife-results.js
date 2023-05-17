import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

function Info() {
    return info({
            text: 'Too many matches found. Please enter a more specific query!',
            title: 'INFO',
            delay: 2000,
            maxTextHeight: null,
            sticker: false,
        });
}

function Error() {
    return error({
            text: 'No matches found!',
            title: 'ERROR',
            delay: 2000,
            maxTextHeight: null,
            sticker: false,
        });
}

export default { Info, Error };