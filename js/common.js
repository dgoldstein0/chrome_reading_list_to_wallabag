// This file is copied from wallabagger to make the options to connect to wallabager work https://github.com/wallabag/wallabagger/blob/master/wallabagger/js/common.js
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "Common" }] */
'use strict';

const Common = (() => {
    const translate = (key) => {
        return key;
        // TODO: setup translations.  I think what I need is to copy the _locales folder from wallabagger and then fill in missing translations from there.
        // but as this extension is a side project I'm happy to leave it English-only for now; if someone wants to contribute translations I'd take a PR
        /*
        const message = chrome.i18n.getMessage(key);
        return message || `[@TOTRANSLATE] ${key.replace(/_/g, ' ')}`;
        */
    };

    const translateAll = () => {
        [].forEach.call(document.querySelectorAll('[data-i18n]'), (el) => {
            const message = el.getAttribute('data-i18n');
            el.textContent = translate(message);
        });
        [].forEach.call(document.querySelectorAll('[data-i18n-attr]'), (el) => {
            const [attr, message] = el.getAttribute('data-i18n-attr').split('|');
            el.setAttribute(attr, translate(message));
        });
    };

    const getLocale = () => chrome.i18n.getUILanguage();

    return {
        translate: translate,
        translateAll: translateAll,
        getLocale: getLocale
    };
})();
