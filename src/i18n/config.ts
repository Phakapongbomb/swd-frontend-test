import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEn from '@/locales/en/common.json'
import test_1En from '@/locales/en/test_1.json'
import test_3En from '@/locales/en/test_3.json'


import commonTh from '@/locales/th/common.json'
import test_1Th from '@/locales/th/test_1.json'
import test_3Th from '@/locales/th/test_3.json'

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                common: commonEn,
                test_1: test_1En,
                test_3: test_3En,
            },
            th: {
                common: commonTh,
                test_1: test_1Th,
                test_3: test_3Th,
            }
        },
        lng: 'en',
        fallbackLng: 'en',
        defaultNS: 'common',
        interpolation: {
            escapeValue: false
        }
    })

export default i18n