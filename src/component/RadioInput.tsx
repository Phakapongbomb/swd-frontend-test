import React from 'react';
import { Flex, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import st from '@/app/style/inputForm.module.scss';
import { useTranslation } from 'react-i18next';

interface RadioInputProps {
    name: string;
    valueData: string;
    callback: (value: string) => void;
    title: string;
    items: { label: string; value: string }[];
    isRequired?: boolean;
    isTouched?: boolean;
    onBlur?: (name: string) => void;
}

export default function RadioInput({
    name,
    valueData,
    callback,
    title,
    items,
    isRequired = false,
    isTouched = false,
    onBlur
}: RadioInputProps) {

    const {t} = useTranslation('test_3')

    const isError = isRequired && isTouched && !valueData;

    return (
        <Flex className={st.group} style={{ alignItems: 'flex-start' }}>
            <div className={`${st.title} ${title === '' ? st.space : ''}`} style={{ marginTop: '5px' }}>
                {/* 🌟 ดอกจันสีแดง */}
                {isRequired && title !== '' && (
                    <span style={{ color: '#ff4d4f', marginRight: '4px' }}>*</span>
                )}
                {title !== '' ? `${title} :` : title}
            </div>

            <div>
                <div style={{ padding: '4px 0' }}> 
                    <Radio.Group
                        value={valueData}
                        onChange={(e: RadioChangeEvent) => {
                            callback(e.target.value);
                            if (onBlur) onBlur(name); 
                        }}
                    >
                        {items.map((data, index) => (
                            <Radio key={`radio-${name}-${index}`} value={data.value}>
                                {data.label}
                            </Radio>
                        ))}
                    </Radio.Group>
                </div>

                {isError && (
                    <div style={{ color: '#ff4d4f', fontSize: '12px' }}>
                        {`${t('plsInput')} ${title}`}
                    </div>
                )}
            </div>
        </Flex>
    );
}