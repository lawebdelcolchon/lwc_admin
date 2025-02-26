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
        dispatch(setPageTitle({ title : "Amazon Comisiones"}))
    }, [])

    const icons = [
        { icon: PiNotePencil, message: 'Editar Transacción' },
        { icon: TrashIcon, message: 'Eliminar Transacción' },
    ];

    return(
        <EntityList 
            entityName="ControlOAmazon" 
            dbName="lawebes"
            entityTitles={["Fecha", "Plataforma","Num. Transacción","Concepto","Num. Pedido","Pedido LWC","Código","Código LWC","Total","Total LWC","Tipo","Detalle","Situación"] }
            entityMinTitles={["Fecha", "Plataforma"] }
            fields="date_o, platform, invoice, type, id_order, order_platform, c_order, code_order, total_o, grandtotal, type_a, description_a, status_payed  " 
            fieldsMin="date_o, platform" 
            interval={50} 
            sort="date_o"
            sortOrder="desc"
            icons={icons}
            widthMain = "2/2"
            widthPanel = ""
            query={[{
                fields: 'date_o, gt_control_o_amazon.platform, invoice, type, id_order, gt_orders.order_platform, c_order, gt_orders.code_order, total_o, gt_orders.grandtotal, type_a, description_a, gt_control_o_amazon.payed as status_payed ',
                pivotTable: 'gt_control_o_amazon, gt_orders',
                whereCondition: 'gt_control_o_amazon.c_order = gt_orders.id',
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