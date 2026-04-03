import Btn from '@/component/btn'
import TitlePage from '@/component/TitlePage'
import React from 'react'

export default function page() {
    return (
        <div className='container'>
            <TitlePage value='test_1:titleTest_1'/>
            <Btn
                text='btnNavHome'
                link='/'
            />
        </div>
    )
}