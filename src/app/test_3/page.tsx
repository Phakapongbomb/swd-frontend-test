import React from 'react'
import Btn from '@/component/btn'
import TitlePage from '@/component/TitlePage'

export default function page() {
    return (
        <div className='container'>
            <TitlePage value='test_3:titleTest_3'/>
            <Btn
                text='btnNavHome'
                link='/'
            />
        </div>
    )
}