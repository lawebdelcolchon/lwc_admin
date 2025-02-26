// src/pages/protected/Clients.js
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import EntityList from '../../features/api/Entity'

import { HiOutlineLockOpen } from "react-icons/hi2";
import { HiOutlineLockClosed } from "react-icons/hi2";
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Categorias"}))
    }, [])

    const icons = [
        {
            icon: HiOutlineLockOpen,
            message: 'Bloquear Categoría',
            switch_icon: HiOutlineLockClosed,
            switch_message: 'Desbloquear Categoría',
            field: "status",
            action: 'update', // Acción asociada
            updateValue: (currentValue) => currentValue === 0 ? 1 : 0 // Alternar entre 0 y 1
        },
        {
            icon: TrashIcon,
            message: 'Eliminar Categoría',
            action: 'delete' // Acción asociada
        },
    ];

    return(
        <EntityList 
            entityName="categories" 
            dbName="lawebes"
            entityTitles={["Id", "Categoría", "Arbol", "Posición", "Estatus"] }
            entityMinTitles={["Id", "Categorías"] }
            fields="id, name, name_parent, position, status"
            fieldsMin="id, name" 
            interval={50} 
            sort="id"
            sortOrder="asc"
            icons={icons}
            widthMain = "1/2"
            widthPanel = "1/2"
            query={[{
                fields: 'c1.id, c1.name, c1.parent, c1.position, c1.status, c2.name AS name_parent ',
                pivotTable: 'gt_categories c1',
                joinTable: 'gt_categories c2',
                joinCondition: 'c1.parent = c2.id',
                joinType: 'LEFT',
                orderBy: 'c1.id ASC',
                page: '1',
                limit: '50',
                noPagination: 'false'
                }
            ]}
            panels = {[
                {fields: [], title: "Info"}
            ]}
        />
    )
}

export default InternalPage