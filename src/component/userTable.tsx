import React from 'react';
import { Table, Checkbox, Flex } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { genderI18nMap, nationalityI18nMap } from '@/locales/mapping';
import { TFunction } from 'i18next';

export interface UserDataType {
    firstName: string;
    lastName: string;
    gender: string;
    mobilePhoneCountry: string;
    mobilePhone: string;
    nationality: string;
}

interface UserTableProps {
    listData: UserDataType[];
    currentPage: number;
    pageSize: number;
    isAllSelected: boolean;
    selectedIndex: number[];
    onSelectAll: (checked: boolean) => void;
    onSelectItem: (index: number) => void;
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
    t: TFunction<"test_3", undefined>;
}

export default function UserTable({
    listData,
    currentPage,
    pageSize,
    isAllSelected,
    selectedIndex,
    onSelectAll,
    onSelectItem,
    onEdit,
    onDelete,
    t
}: UserTableProps) {

    const columns: ColumnsType<UserDataType> = [
        {
            title: (
                <Checkbox
                    checked={isAllSelected}
                    indeterminate={selectedIndex.length > 0 && !isAllSelected}
                    onChange={(e) => onSelectAll(e.target.checked)}
                />
            ),
            key: 'checkbox',
            width: 50,
            align: 'center',
            render: (_, record, index) => {
                const actualIndex = (currentPage - 1) * pageSize + index;
                return (
                    <Checkbox
                        checked={selectedIndex.includes(actualIndex)}
                        onChange={() => onSelectItem(actualIndex)}
                    />
                );
            }
        },
        {
            title: t('table.name'),
            key: 'name',
            width: 150,
            ellipsis: true,
            render: (_, record) => `${record.firstName} ${record.lastName}`
        },
        {
            title: t('table.gender'),
            key: 'gender',
            width: 100,
            render: (_, record) => {
                if (record.gender) {
                    const targetKey = genderI18nMap[record.gender];
                    return targetKey ? t(targetKey) : '';
                }
                return '';
            }
        },
        {
            title: t('table.mobilePhone'),
            key: 'mobilePhone',
            width: 150,
            render: (_, record) => `${record.mobilePhoneCountry}${record.mobilePhone}`
        },
        {
            title: t('table.nationality'),
            key: 'nationality',
            width: 150,
            render: (_, record) => {
                if (record.nationality) {
                    const targetKey = nationalityI18nMap[record.nationality];
                    return targetKey ? t(targetKey) : '';
                }
                return '';
            }
        },
        {
            title: t('table.manage'),
            key: 'manage',
            width: 150,
            render: (_, record, index) => {
                const actualIndex = (currentPage - 1) * pageSize + index;
                return (
                <Flex style={{ gap: '12px' }}>
                    <div style={{ cursor: 'pointer' }} onClick={() => onEdit(actualIndex)}>
                        {t('btnEdit')}
                    </div>
                    <div style={{ cursor: 'pointer' }} onClick={() => onDelete(actualIndex)}>
                        {t('btnDelet')}
                    </div>
                </Flex>
            )
            }
        }
    ];

    return (
        <Table
            columns={columns}
            dataSource={listData}
            rowKey={(_, index) => index ? index.toString() : Math.random().toString()}
            pagination={false}
            scroll={{ x: 'max-content' }}
        />
    );
}