'use client'
import React from 'react'
import CardImg from './CardImg'
import st from '@/app/style/test_1.module.scss'
import { Flex } from 'antd'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { changeLayout, nextImg, prveImg, randomPosition } from '@/store/slices/test_1'

export default function SectionCard() {

    const state = useAppSelector(state => state.test_1)
    const listCard = state.listCard
    const dispatch = useAppDispatch()

    return (
        <Flex className={st.section}>
            <Flex className={st.groupControl}>
                <CardImg
                    direction='left'
                    text='test_1:mShape'
                    callback={() => dispatch(prveImg())}
                />
                <CardImg
                    direction='topBot'
                    text='test_1:mPosition'
                    callback={() => dispatch(changeLayout())}
                />
                <CardImg
                    direction='right'
                    text='test_1:mShape'
                    callback={() => dispatch(nextImg())}
                />
            </Flex>
            <div className={`${st.groupGeometry} ${st[state.layout]}`}>
                {
                    listCard.map((value, index) => {
                        return (
                            <CardImg
                                key={`card-${index}`}
                                geometry={value.geometry}
                                callback={() => {dispatch(randomPosition(index))}}
                                classCss={st.card}
                            />
                        )
                    })
                }
            </div>
        </Flex>
    )
}
