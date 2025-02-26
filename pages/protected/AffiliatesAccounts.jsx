// src/features/api/AffiliatesAccounts
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import EntityList from '../../features/api/Entity'

import { HiOutlineLockOpen } from "react-icons/hi2";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { HiOutlineStar } from "react-icons/hi2";
import { PiNotePencil } from "react-icons/pi"; 
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Afiliados"}))
    }, [])

    const icons = [
        {
            icon: HiOutlineLockOpen,
            message: 'Bloquear Afliliado',
            switch_icon: HiOutlineLockClosed,
            switch_message: 'Desbloquear Afiliado',
            field: "enabled",
            action: 'update', // Acción asociada
            updateValue: (currentValue) => currentValue === 0 ? 1 : 0 // Alternar entre 0 y 1
        },
        { icon: HiOutlineStar, message: 'Comisiones' },
        { icon: PiNotePencil, message: 'Editar afiliado' },
        { icon: TrashIcon, message: 'Eliminar afiliado' },
    ];

    return(
        <EntityList 
            entityName="affiliates_accounts"
            dbName="lawebes"
            entityTitles={["Id", "Afiliados", "Correo", "Teléfono", "Fecha Afiliación", "Estado"] }
            entityMinTitles={["Id", "Afiliados"] }
            fields="id, name, email, phone, date_client, enabled" 
            fieldsMin="id, name" 
            interval={50} 
            sort="name"
            sortOrder="asc"
            icons={icons}  
            mergedColumns={[
                { fields: ["name", "email", "phone"], title: "Proveedor" },
                { fields: ["date_client"], title: "Fecha de Registro" },
                { fields: ["enabled"], title: "Estado" }
            ]}
            widthMain = "1/2"
            widthPanel = "1/2"
            panels = {[
                {fields: [], title: "Comisiones"},
                {fields: [], title: "Facturas"}
            ]}
        />
    )
}

export default InternalPage