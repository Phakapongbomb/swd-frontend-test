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
    selectAll
} from '@/store/slices/test_3'; 

export const useUserForm = () => {
    const dispatch = useAppDispatch();
    
    const { form, listData, currentPage, pageSize, selectedIndex } = useAppSelector(state => state.test_3);

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

    const handleAntdChange = (name: string, value: any) => {
        dispatch(inputForm({ name, value }));
    };

    const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault(); 
        dispatch(submitAction(form));
        dispatch(resetAction()); 
    };

    const handleBulkDelete = () => {
        dispatch(deleteAction(selectedIndex));
    };

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
        handleInputChange,
        handleAntdChange,
        handleSubmit,
        handleBulkDelete,
        handlePageChange: (page: number) => dispatch(setPage(page)),
        selectItem: (index: number) => dispatch(selectItem(index)),
        selectAll: (checked: boolean) => dispatch(selectAll(checked)),
    };
};