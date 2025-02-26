// src/pages/protected/Contacts.js
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
        dispatch(setPageTitle({ title : "Contactos"}))
    }, [])

    const icons = [
        {
            icon: HiOutlineLockOpen,
            message: 'Bloquear Contacto',
            switch_icon: HiOutlineLockClosed,
            switch_message: 'Desbloquear Contacto',
            field: "enabled",
            action: 'update', // Acción asociada
            updateValue: (currentValue) => currentValue === 0 ? 1 : 0 // Alternar entre 0 y 1
        },
        { icon: PiNotePencil, message: 'Editar contacto' },
        { icon: TrashIcon, message: 'Eliminar contacto' },
    ];

    return(
        <EntityList 
            entityName="contacts" 
            dbName="lawebes"
            entityTitles={["Id", "Contactos", "Correo", "Teléfono", "Fecha de registro", "Estado"] }
            entityMinTitles={["Id", "Contactos"] }
            fields="id, name, email, phone, date_send, enabled" 
            fieldsMin="id, name" 
            interval={50} 
            sort="date_send"
            sortOrder="desc"
            icons={icons}
            mergedColumns={[
                { fields: ["name", "email", "phone"], title: "Contactos" },
                { fields: ["date_send"], title: "Fecha de Registro" },
                { fields: ["enabled"], title: "Estado" }
            ]}
            panels = {[
                {fields: [], title: "Info"}
            ]}
        />
    )
}

export default InternalPage