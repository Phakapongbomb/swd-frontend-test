import React from 'react';
import { Flex, DatePicker } from 'antd';
import dayjs from 'dayjs';
import st from '@/app/style/inputForm.module.scss';
import { useTranslation } from 'react-i18next';

interface DatePickerInputProps {
    name: string;
    valueData: string | undefined | null;
    callback: (dateString: string | string[]) => void; 
    title: string;
    isRequired?: boolean;
    isTouched?: boolean;
    onBlur?: (name: string) => void;
}

export default function DatePickerInput({
    name,
    valueData,
    callback,
    title,
    isRequired = false,
    isTouched = false,
    onBlur
}: DatePickerInputProps) {

    const { t } = useTranslation('test_3');
    const isError = isRequired && isTouched && !valueData;

    return (
        <Flex className={st.group} style={{ alignItems: 'center' }}>
            <div className={`${st.title} ${title === '' ? st.space : ''}`}>
                {isRequired && title !== '' && (
                    <span style={{ color: '#ff4d4f', marginRight: '4px' }}>*</span>
                )}
                {title !== '' ? `${title} :` : title}
            </div>

            <div style={{ width: '100%' }}>
                <DatePicker
                    style={{ width: '100%' }}
                    value={valueData ? dayjs(valueData as string) : null}
                    status={isError ? 'error' : ''}
                    
                    onChange={(date, dateString) => {
                        callback(dateString);
                        if (onBlur) onBlur(name);
                    }}
                    onOpenChange={(open) => {
                        if (!open && onBlur) onBlur(name);
                    }}
                />
                {isError && (
                    <div style={{ position: "absolute", color: '#ff4d4f', fontSize: '12px', marginTop: '4px' }}>
                        {`${t('plsInput')} ${title}`}
                    </div>
                )}
            </div>
        </Flex>
    );
}