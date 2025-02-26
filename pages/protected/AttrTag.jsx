// src/pages/protected/Carriers.js
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import EntityList from '../../features/api/Entity'

import { HiOutlineShoppingCart } from "react-icons/hi2";
import { PiNotePencil } from "react-icons/pi"; 
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Etiquetas"}))
    }, [])

    const icons = [
        { icon: HiOutlineShoppingCart, message: 'Productos Asociados' },
        { icon: PiNotePencil, message: 'Editar Etiqueta' },
        { icon: TrashIcon, message: 'Eliminar etiqueta' },
    ];

    return(
        <EntityList 
            entityName="attr_tag" 
            dbName="lawebes"
            entityTitles={["Id", "Etiqueta", "Utilidad", "Categoria", "Valor", "Descripción", "Color"] }
            entityMinTitles={["Id", "Etiqueta"] }
            fields="id, title_tag, utilities_tag, category_tag, value_tag, desc_tag, color_tag" 
            fieldsMin="id, name" 
            interval={50} 
            sort="id"
            sortOrder="asc"
            icons={icons}
            widthMain = "3/4"
            widthPanel = "1/4"
            panels = {[
                {fields: [], title: "Productos asociados"},
            ]}
        />
    )
}

export default InternalPage