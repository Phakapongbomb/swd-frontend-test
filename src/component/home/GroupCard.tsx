'use client'
import React from 'react'
import { Col, Row } from "antd";
import Link from "next/link";
import st from "@/app/style/home.module.scss";
import { useTranslation } from 'react-i18next';
import { TranslatedCard } from '@/types/home';

export default function GroupCard() {

    const { t } = useTranslation()
    const translatedCards = t('card', { returnObjects: true}) as TranslatedCard[];
    return (
        <Row className={st.row}>
            {
                translatedCards.map((value, index) => {
                    return (
                        <Col span={8} className={st.card} key={`col-${index}`}>
                            <Link href={value.link} className={st.link}>
                                <Row>{value.title}</Row>
                                <Row className={st.textDetail}>{value.detail}</Row>
                            </Link>
                        </Col>
                    )
                })
            }
        </Row>
    )
}
