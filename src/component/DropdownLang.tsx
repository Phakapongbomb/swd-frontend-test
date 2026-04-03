'use client'
import React from 'react'
import { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'
import st from '@/app/style/DropdownLang.module.scss'
import { DownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

export default function DropdownLang() {
    const { i18n } = useTranslation();

    const currentLang = i18n.language || 'en';

    const langOptions = [
        { label: 'EN', key: 'en' },
        { label: 'TH', key: 'th' },
    ];
    const items: MenuProps['items'] = langOptions;

    const displayLabel = langOptions.find(item => item.key === currentLang)?.label || 'EN';

    const changeLang: MenuProps['onClick'] = (e) => {
        i18n.changeLanguage(e.key)
    }

    return (
        <Dropdown 
            menu={{ 
                items,
                onClick: changeLang,
                selectedKeys: [currentLang]
            }} 
            trigger={['click']} 
            className={st.dropdownLang}
        >
            <Space>
                {displayLabel}
                <DownOutlined />
            </Space>
        </Dropdown>
    )
}
