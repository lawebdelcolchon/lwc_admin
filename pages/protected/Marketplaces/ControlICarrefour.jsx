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
        dispatch(setPageTitle({ title : "Carrefour Facturas"}))
    }, [])

    const icons = [
        { icon: PiNotePencil, message: 'Editar Transacción' },
        { icon: TrashIcon, message: 'Eliminar Transacción' },
    ];

    return(
        <EntityList 
            entityName="ControlIAmazon" 
            dbName="lawebes"
            entityTitles={["Id", "Fecha", "Plataforma","Num. Factura","Comisión","Iva","Cobrado","Fecha cobro",	"Estado"] }
            entityMinTitles={["Id", "Plataforma"] }
            fields="id, platform_i, date_i,  id_invoice, commission_i, tax_c_i, net_sales_i, date_p_i, $payed" 
            fieldsMin="id, name" 
            interval={50} 
            sort="date_i"
            sortOrder="desc"
            panels={["Importar"]}
            icons={icons}
            widthMain = "3/4"
            widthPanel = "1/4"
            query={[{
                fields: 'id, platform_i, date_i, id_invoice, net_sales_i, date_p_i, payed_i as status_payed ',
                pivotTable: 'gt_control_i_carrefour',
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