import 'i18next'
import common from './src/locales/en/common.json';
import test_1 from './src/locales/en/test_1.json';
import test_3 from './src/locales/en/test_3.json';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'common';
        resources: {
            common: typeof common;
            test_1: typeof test_1;
            test_3: typeof test_3;
        }
    }
}