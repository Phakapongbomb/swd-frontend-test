import React from 'react'
import { Dropdown, Flex } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import { DropdownInputProps } from '@/types/common';
import st from '@/app/style/DropdownInput.module.scss'
import { useTranslation } from 'react-i18next';

export default function DropdownInput({
    name,
    items,
    value,
    callback,
    title,
    placehoder,
    isRequired,
    isTouched,
    onBlur,
}: DropdownInputProps) {

    const displayLabel = items?.find((item): item is { key: string; label: string } => !!item && 'key' in item && item.key === value)?.label || placehoder;
    const isError = isRequired && isTouched && !value;
    const { t } = useTranslation('test_3');

    return (
        <Flex className={st.group}>
            <div className={`${st.title} ${title === '' ? st.space : ''}`}>
                {isRequired && title !== '' && (
                    <span style={{ color: '#ff4d4f', marginRight: '4px' }}>*</span>
                )}
                {title !== '' ? `${title} :` : title}
            </div>
            <div style={{ height: '100%' }}>
                <Dropdown
                    menu={{
                        items,
                        onClick: (info) => {
                            callback?.(info);
                            if (onBlur) onBlur(name);
                        },
                        selectedKeys: [value]
                    }}
                    trigger={['click']}
                    onOpenChange={(open) => {
                        if (!open && onBlur) onBlur(name);
                    }}
                >
                    <div
                        className={st.dropdown}
                        style={{
                            border: isError ? '1px solid #ff4d4f' : '1px solid #d9d9d9',
                        }}
                    >
                        <div className={`${st.value} ${!!value && st.active}`}>
                            {displayLabel}
                        </div>
                        <DownOutlined style={{ marginLeft: 'auto' }} />
                    </div>
                </Dropdown>
                {isError && (
                    <div style={{ position: "absolute", color: '#ff4d4f', fontSize: '12px', marginTop: '4px' }}>
                        {`${t('plsInput')} ${title}`}
                    </div>
                )}
            </div>
        </Flex>
    )
}
