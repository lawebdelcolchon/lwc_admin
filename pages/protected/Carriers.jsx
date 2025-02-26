// src/pages/protected/Carriers.js
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import EntityList from '../../features/api/Entity'

import { HiOutlineLockOpen } from "react-icons/hi2";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { PiNotePencil } from "react-icons/pi"; 
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Transportistas"}))
    }, [])

    const icons = [
        {
            icon: HiOutlineLockOpen,
            message: 'Bloquear Transportista',
            switch_icon: HiOutlineLockClosed,
            switch_message: 'Desbloquear Transportista',
            field: "enabled",
            action: 'update', // Acción asociada
            updateValue: (currentValue) => currentValue === 0 ? 1 : 0 // Alternar entre 0 y 1
        },
        { icon: PiNotePencil, message: 'Editar Transportista' },
        { icon: TrashIcon, message: 'Eliminar Transportista' },
    ];

    return(
        <EntityList 
            entityName="carriers" 
            dbName="lawebes"
            entityTitles={["Id", "Transportistas", "Correo", "Teléfono", "Fecha de registro", "Estado"] }
            entityMinTitles={["Id", "Transportistas"] }
            fields="id, name, email, phone, date_carrier, enabled" 
            fieldsMin="id, name" 
            interval={50} 
            sort="date_carrier"
            sortOrder="desc"
            icons={icons}
            mergedColumns={[
                { fields: ["name", "email", "phone"], title: "Proveedor" },
                { fields: ["date_carrier"], title: "Fecha de Registro" },
                { fields: ["enabled"], title: "Estado" }
            ]}
            widthMain = "1/2"
            widthPanel = "1/2"
            panels = {[
                {fields: [], title: "Porte"},
                {fields: [], title: "Facturas"},
                {fields: [], title: "Expediciones"}
            ]}
        />
    )
}

export default InternalPage