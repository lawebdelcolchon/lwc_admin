// src/pages/protected/Carriers.js
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'
import EntityList from '../../../features/api/Entity'

import { PiNotePencil } from "react-icons/pi"; 
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Carrefour Movimientos"}))
    }, [])

    const icons = [
        { icon: PiNotePencil, message: 'Editar Transacción' },
        { icon: TrashIcon, message: 'Eliminar Transacción' },
    ];

    return(
        <EntityList 
            entityName="ControlOCarrefour" 
            dbName="lawebes"
            entityTitles={["Id", "Plataforma", "Fecha", "Transaccion", "Concepto", "Código", "Código LWC", "Total", "Tipo", "Detalle", "Estado"] }
            entityMinTitles={["Id", "Plataforma"] }
            fields="id, platform, date_o, invoice, id_order, total_o, commission, tax_c, net_sales, status " 
            fieldsMin="id, name" 
            interval={50} 
            sort="date_o"
            sortOrder="desc"
            icons={icons}
            widthMain = "2/2"
            widthPanel = ""
            query={[{
                fields: 'id, platform, date_o, invoice, id_order, total_o, commission, tax_c, net_sales, status',
                pivotTable: 'gt_control_o_carrefour',
                whereCondition: '',
                orderBy: 'date_o DESC',
                page: '1',
                limit: '50',
                noPagination: 'false'
                }
            ]}           
        />
    )
}

export default InternalPage