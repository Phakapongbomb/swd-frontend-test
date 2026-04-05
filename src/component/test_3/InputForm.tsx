import { Flex, Input } from 'antd'
import React, { ChangeEvent, CSSProperties } from 'react'
import st from '@/app/style/inputForm.module.scss'
import { useTranslation } from 'react-i18next'

interface InputFormProps {
    name: string
    valueData: string
    callback: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    title: string
    maxLength?: number
    minLength?: number
    isCenter?: boolean
    type?: string
    isRequired?: boolean
    isTouched?: boolean;
    onBlur?: (name: string) => void;
    errorText?: string
}

export default function InputForm({
    name,
    valueData,
    callback,
    title,
    maxLength,
    minLength,
    isCenter = false,
    type = 'text',
    isRequired = false,
    isTouched = false,
    onBlur,
    errorText
}: InputFormProps) {

    const { t } = useTranslation('test_3');

    const styleInline: CSSProperties = isCenter ? {
        textAlign: 'center'
    } : {}

    const isError = isRequired && isTouched && !valueData;

    return (

        <Flex className={st.group}>
            <div className={`${st.title} ${title === '' ? st.space : ''}`} style={{ marginTop: '5px' }}>
                {isRequired && title !== '' && (
                    <span style={{ color: '#ff4d4f', marginRight: '4px' }}>*</span>
                )}
                {title !== '' ? `${title} :` : title}
            </div>
            <div>
                <Input
                    type={type}
                    style={styleInline}
                    name={name}
                    value={valueData}
                    maxLength={maxLength}
                    minLength={minLength}
                    status={isError ? 'error' : ''}
                    onChange={(e) => {
                        callback(e);
                        if (onBlur) onBlur(name);
                    }}
                    onBlur={() => {
                        if (onBlur) onBlur(name);
                    }}
                />
                {isError && (
                    <div style={{ position: "absolute",color: '#ff4d4f', fontSize: '12px', marginTop: '4px' }}>
                        {`${t('plsInput')} ${title || errorText}`}
                    </div>
                )}
            </div>
        </Flex>
    )
}
