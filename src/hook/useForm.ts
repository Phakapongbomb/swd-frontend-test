import { ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import {
    inputForm,
    submitAction,
    resetAction,
    deleteAction,
    loadDataStorage,
    setPage,
    selectItem,
    selectAll,
    setFieldTouched,
    editData
} from '@/store/slices/test_3';

export const useUserForm = () => {
    const dispatch = useAppDispatch();

    const { form, touched, listData, currentPage, pageSize, selectedIndex } = useAppSelector(state => state.test_3);

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedData = localStorage.getItem('userDataList');
            if (savedData) {
                dispatch(loadDataStorage(JSON.parse(savedData)));
            }
        }
    }, [dispatch]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (typeof window !== 'undefined') {
            localStorage.setItem('userDataList', JSON.stringify(listData));
        }
    }, [listData]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        dispatch(inputForm({ name, value }));
    };

    const handleArrayInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        name: string,
        index: number
    ) => {
        const { value } = e.target;
        const currentArray = [...(form[name as keyof typeof form] as string[] || [])];
        currentArray[index] = value;
        dispatch(inputForm({ name, value: currentArray }));
    };

    const handleAntdChange = (name: string, value: any) => {
        dispatch(inputForm({ name, value }));
    };

    const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();

        const requiredFields = [
            'title',
            'firstName',
            'lastName',
            'birthday',
            'nationality',
            'gender',
            'mobilePhoneCountry',
            'mobilePhone',
            'expectedSalary'
        ];

        let isValid = true;

        requiredFields.forEach(field => {
            const value = form[field as keyof typeof form];
            if (!value || value === '') {
                isValid = false;
                dispatch(setFieldTouched(field));
            }
        });

        if (!isValid) {
            alert('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
            return;
        }

        dispatch(submitAction(form));
        dispatch(resetAction());
        alert('Save Success');
    };

    const handleBulkDelete = () => {
        dispatch(deleteAction(selectedIndex));
    };

    const handleDelete = (index: number) => {
        dispatch(deleteAction(index));
    };

    const handleFieldBlur = (name: string) => {
        dispatch(setFieldTouched(name));
    };

    const handleResetAction = () => {
        dispatch(resetAction())
    }

    const handleEditData = (number: number) => {
        dispatch(editData(number))
    }

    const startIndex = (currentPage - 1) * pageSize;
    const currentTableData = listData.slice(startIndex, startIndex + pageSize);

    return {
        form,
        listData,
        currentTableData,
        totalItems: listData.length,
        currentPage,
        pageSize,
        selectedIndex,
        touched,
        handleFieldBlur,
        handleResetAction,
        handleArrayInputChange,
        handleEditData,
        handleDelete,
        handleInputChange,
        handleAntdChange,
        handleSubmit,
        handleBulkDelete,
        handlePageChange: (page: number) => dispatch(setPage(page)),
        selectItem: (index: number) => dispatch(selectItem(index)),
        selectAll: (checked: boolean) => dispatch(selectAll(checked)),
    };
};