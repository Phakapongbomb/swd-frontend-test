import React from 'react'
import st from '@/app/style/CardImg.module.scss'
import { CardImgProps } from '@/types/test_1'
import { useTranslation } from 'react-i18next';

export default function CardImg({
    direction = 'top',
    text,
    geometry = 'triangle',
    callback,
    classCss,
}: CardImgProps) {

    const { t } = useTranslation();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const textShow = t(text as any)

    return (
        <button className={`${st.CardImg} ${direction === 'topBot' && st.long} ${classCss}`} onClick={callback}>
            {
                direction === 'topBot' ? (
                    <>
                        <div className={`${st[geometry]} ${geometry === 'triangle' && st.top}`}></div>
                        <div className={`${st[geometry]} ${geometry === 'triangle' && st.bottom}`}></div>
                    </>
                ) : (
                    <div className={`${st[geometry]} ${geometry === 'triangle' && st[direction]}`}></div>
                )
            }
            {textShow && (
                <div className={st.modalText}>{textShow}</div>
            )}
        </button>
    )
}