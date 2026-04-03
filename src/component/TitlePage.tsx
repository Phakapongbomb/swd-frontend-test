'use client'

import React from 'react'
import { useTranslation } from 'react-i18next';

export default function TitlePage({ value }: { value : string}) {
    const { t } = useTranslation();
    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <h1 className='titlePage'>{t(value as any)}</h1>
    )
}
