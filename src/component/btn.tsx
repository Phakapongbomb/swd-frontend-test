'use client'
import { btnProps } from '@/types/common'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next';

export default function Btn({
    link,
    text,
    callBack,
    type = 'button',
    className
}: btnProps) {
    const { t } = useTranslation();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const textShow = t(text as any)

    const classCss = `btn ${className}`;

    if (link) {
        return (<Link className={classCss} href={link}>{textShow}</Link>)
    }

    return (
        <button className={classCss} type={type} onClick={callBack}>{textShow}</button>
    )
}