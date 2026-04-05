'use client';
import React, { useEffect } from 'react';
import { Button, Checkbox, Pagination, Flex, Col, } from 'antd';
import { useUserForm } from '@/hook/useForm';
import st from '@/app/style/test_3.module.scss'
import { useTranslation } from 'react-i18next';
import InputForm from './InputForm';
import DropdownInput from '../DropdownInput';
import DatePickerInput from '../DatePickerInput';
import RadioInput from '../RadioInput';
import Btn from '../btn';
import UserTable from '@/component/userTable';


export default function SectionForm() {
    const {
        form,
        currentTableData,
        totalItems,
        currentPage,
        pageSize,
        selectedIndex,
        touched,
        handleInputChange,
        handleAntdChange,
        handleArrayInputChange,
        handleEditData,
        handleSubmit,
        handleBulkDelete,
        handleDelete,
        handlePageChange,
        selectItem,
        selectAll,
        handleFieldBlur,
        handleResetAction
    } = useUserForm();

    const { t } = useTranslation('test_3');

    const isAllSelected = currentTableData.length > 0 &&
        currentTableData.every((_, index) => {
            const actualIndex = (currentPage - 1) * pageSize + index;
            return selectedIndex.includes(actualIndex);
        });

    const listTitle = [
        { label: t('titleName.mr'), key: 'mr' },
        { label: t('titleName.mrs'), key: 'mrs' },
        { label: t('titleName.ms'), key: 'ms' },
    ]
    const listNationality = [
        { label: t('nationalityList.th'), key: 'th' },
        { label: t('nationalityList.fr'), key: 'fr' },
        { label: t('nationalityList.us'), key: 'us' },
    ]
    const phoneCountry = [
        { label: '+66', key: '+66' },
        { label: '+1', key: '+1' },
        { label: '+33', key: '+33' }
    ]

    //radio
    const radioList = [
        { label: t('form.male'), value: 'male' },
        { label: t('form.female'), value: 'female' },
        { label: t('form.unisex'), value: 'unisex' }
    ]

    useEffect(() => {

    }, [])

    return (
        <Flex className={st.box}>
            <form onSubmit={handleSubmit}>
                <Flex style={{gap: '8px'}}>
                    <DropdownInput
                        items={listTitle}
                        value={form.title}
                        callback={(value) => handleAntdChange('title', value.key)}
                        title={t('form.title')}
                        placehoder={t('form.title')}
                        isRequired={true}
                        isTouched={touched['title']}
                        onBlur={handleFieldBlur}
                        name={'title'}
                    />
                    <InputForm
                        title={t('form.firstName')}
                        name={'firstName'}
                        callback={handleInputChange}
                        valueData={form.firstName || ''}
                        isRequired={true}
                        isTouched={touched['firstName']}
                        onBlur={handleFieldBlur}
                    />
                    <InputForm
                        title={t('form.lastName')}
                        name={'lastName'}
                        callback={handleInputChange}
                        valueData={form.lastName || ''}
                        isRequired={true}
                        isTouched={touched['lastName']}
                        onBlur={handleFieldBlur}
                    />
                </Flex>
                <Flex style={{gap: '8px'}}>
                    <DatePickerInput
                        title={t('form.birthday')}
                        name={'birthday'}
                        valueData={form.birthday}
                        callback={(dateString) => handleAntdChange('birthday', dateString)}
                        isRequired={true}
                        isTouched={touched['birthday']}
                        onBlur={handleFieldBlur}
                    />
                    <DropdownInput
                        items={listNationality}
                        value={form.nationality}
                        callback={(value) => handleAntdChange('nationality', value.key)}
                        title={t('form.nationality')}
                        placehoder={t('form.placehoderNationality')}
                        isRequired={true}
                        isTouched={touched['nationality']}
                        onBlur={handleFieldBlur}
                        name={'nationality'}
                    />
                </Flex>
                <Flex style={{ alignItems: 'center' }}>
                    <InputForm
                        title={t('form.citizenID')}
                        name={'citizenID'}
                        callback={(e) => handleArrayInputChange(e, 'citizenID', 0)}
                        valueData={form.citizenID?.[0] || ''}
                        maxLength={1}
                        isCenter={true}
                    />
                    <span>-</span>
                    <InputForm
                        title={''}
                        name={'citizenID'}
                        callback={(e) => handleArrayInputChange(e, 'citizenID', 1)}
                        valueData={form.citizenID?.[1] || ''}
                        maxLength={4}
                        isCenter={true}
                    />
                    <span>-</span>
                    <InputForm
                        title={''}
                        name={'citizenID'}
                        callback={(e) => handleArrayInputChange(e, 'citizenID', 2)}
                        valueData={form.citizenID?.[2] || ''}
                        maxLength={5}
                        isCenter={true}
                    />
                    <span>-</span>
                    <InputForm
                        title={''}
                        name={'citizenID'}
                        callback={(e) => handleArrayInputChange(e, 'citizenID', 3)}
                        valueData={form.citizenID?.[3] || ''}
                        maxLength={2}
                        isCenter={true}
                    />
                    <span>-</span>
                    <InputForm
                        title={''}
                        name={'citizenID'}
                        callback={(e) => handleArrayInputChange(e, 'citizenID', 4)}
                        valueData={form.citizenID?.[4] || ''}
                        maxLength={1}
                        isCenter={true}
                    />
                </Flex>
                <RadioInput
                    title={t('form.gender')}
                    name={'gender'}
                    items={radioList}
                    valueData={form.gender}
                    callback={(value) => handleAntdChange('gender', value)}
                    isRequired={true}
                    isTouched={touched['gender']}
                    onBlur={handleFieldBlur}
                />
                <Flex style={{ alignItems: 'center' }}>
                    <DropdownInput
                        items={phoneCountry}
                        value={form.mobilePhoneCountry}
                        callback={(value) => handleAntdChange('mobilePhoneCountry', value.key)}
                        title={t('form.mobilePhone')}
                        placehoder={''}
                        isRequired={true}
                        name={'mobilePhoneCountry'}
                    />
                    <span>-</span>
                    <InputForm
                        title={''}
                        name={'mobilePhone'}
                        callback={handleInputChange}
                        valueData={form.mobilePhone || ''}
                        isRequired={true}
                        isTouched={touched['mobilePhone']}
                        onBlur={handleFieldBlur}
                        errorText={t('form.mobilePhone')}
                        minLength={10}
                        maxLength={10}
                    />
                </Flex>
                <Flex style={{gap: '8px'}}>
                    <InputForm
                        title={t('form.passport')}
                        name={'passport'}
                        callback={handleInputChange}
                        valueData={form.passport || ''}
                        maxLength={20}
                    />
                </Flex>
                <Flex style={{gap: '8px'}}>
                    <InputForm
                        title={t('form.expectedSalary')}
                        name={'expectedSalary'}
                        callback={handleInputChange}
                        valueData={form.expectedSalary || ''}
                        isRequired={true}
                        isTouched={touched['expectedSalary']}
                        onBlur={handleFieldBlur}
                    />
                    <Flex style={{ margin: '0 auto', gap: "100px" }}>
                        <Btn
                            text='test_3:form.btnReset'
                            className={st.btn}
                            callBack={handleResetAction}
                        />
                        <Btn
                            text='test_3:form.btnSubmit'
                            className={st.btn}
                            type={'submit'}
                        />
                    </Flex>
                </Flex>
            </form>

            <Col style={{ width: '100%', maxWidth: '1280px', gap: '16px', marginTop: '24px', padding: '0 20px 40px' }}>
                <Flex style={{ width: '100%', gap: '16px' }}>
                    <Flex style={{ alignItems: 'center', gap: '8px' }}>
                        <Checkbox
                            checked={isAllSelected}
                            onChange={(e) => selectAll(e.target.checked)}
                        />
                        <p>{t('radioSelectAll')}</p>
                    </Flex>
                    <Button
                        onClick={handleBulkDelete}
                    >
                        {t('btnDelet')}
                    </Button>
                </Flex>

                <Flex style={{ margin: '20px 0', textAlign: 'right', justifyContent: 'flex-end' }}>
                    {totalItems >= 0 ?
                        <Pagination
                            className={st.customPagination}
                            current={currentPage}
                            pageSize={pageSize}
                            total={totalItems}
                            onChange={handlePageChange}
                            showSizeChanger={false}
                            itemRender={(page, type, originalElement) => {
                                if (type === 'prev') return <div>{t('btnPrev')}</div>;
                                if (type === 'next') return <div>{t('btnNext')}</div>;
                                return originalElement;
                            }}
                        />
                        : <></>}
                </Flex>

                <UserTable
                    listData={currentTableData}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    isAllSelected={isAllSelected}
                    selectedIndex={selectedIndex}
                    onSelectAll={selectAll}
                    onSelectItem={selectItem}
                    onEdit={handleEditData}
                    onDelete={handleDelete}
                    t={t}
                />
            </Col>

        </Flex>
    );
}