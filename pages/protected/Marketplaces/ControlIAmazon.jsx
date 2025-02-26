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
        dispatch(setPageTitle({ title : "Amazon Transacciones"}))
    }, [])

    const icons = [
        { icon: PiNotePencil, message: 'Editar Transacción' },
        { icon: TrashIcon, message: 'Eliminar Transacción' },
    ];

    return(
        <EntityList 
            entityName="ControlIAmazon" 
            dbName="lawebes"
            entityTitles={["Fecha", "Plataforma",  "Transaccion", "Cobrado", "Fecha Cobro", "Estado"] }
            entityMinTitles={["Fecha", "Plataforma"] }
            fields="date_i, platform_i,  id_invoice, net_sales_i, date_p_i, status_payed " 
            fieldsMin="id, name" 
            interval={50} 
            sort="date_i"
            sortOrder="desc"
            panels={["Importar"]}
            icons={icons}
            widthMain = "3/4"
            widthPanel = "1/4"
            query={[{
                fields: 'date_i, platform_i,  id_invoice, net_sales_i, date_p_i, payed_i as status_payed ',
                pivotTable: 'gt_control_i_amazon',
                whereCondition: '',
                orderBy: 'date_i DESC',
                page: '1',
                limit: '50',
                noPagination: 'false'
                }
            ]}           
        />
    )
}

export default InternalPage