// src/pages/protected/Carriers.js
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'
import EntityList from '../../../features/api/Entity'

import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { HiOutlineArrowUturnLeft } from "react-icons/hi2";
import { PiNotePencil } from "react-icons/pi"; 

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Pedidos Proveedores"}))
    }, [])

    const icons = [
        { icon: HiOutlineArrowUturnLeft, message: 'Ver Devolución' },
        { icon: HiOutlineExclamationCircle, message: 'Ver Reclamaciones' },
        { icon: PiNotePencil, message: 'Editar devolución' },
    ];

    return(
        <EntityList 
            entityName="GlobalOrderSupplier" 
            entityTitles={["Proveedor", "Cliente",  "Fecha", "Fecha envio", "Ped. Cli.", "Ped. Prov.", "Base", "Total", "Enviado", "Procesado", "Comprob"] }
            entityMinTitles={["Fecha", "Proveedor"] }
            fields="name_supplier, name_billing, date_order, date_schedule, code_order, code_union, subtotal, total, status_shipped, status_processed, status_payed " 
            fieldsMin="id, name" 
            interval={50} 
            sort="date_order"
            sortOrder="desc"
            icons={icons}
            widthMain = "1/2"
            widthPanel = "1/2"
            query={[{
                fields: 'name_supplier, name_billing, date_order, date_schedule, code_order, code_union, subtotal, total, shipped as status_shipped, processed as status_processed, payed as status_payed ',
                pivotTable: 'gt_global_return_order',
                whereCondition: '',
                orderBy: 'date_order DESC',
                page: '1',
                limit: '50',
                noPagination: 'false'
                }
            ]}
            mergedColumns={[
                { fields: ["name_supplier", "code_order"], title: "Proveedor" },
                { fields: ["name_billing", "code_union"], title: "Cliente" },
                { fields: ["date_order"], title: "Fecha Orden" },
                { fields: ["date_schedule"], title: "Fecha Envío" },
                { fields: ["subtotal"], title: "Base" },
                { fields: ["subtotal"], title: "Total" }
            ]}
            mergedColumnsMin={[
                { fields: ["client.name", "client.email", "client.phone", "date_order"], title: "Clientes" },
                { fields: ["enabled"], title: "" }
            ]}
            panels = {[
                {fields: [], title: "Cobros"},
                {fields: [], title: "Pedidos"},
                {fields: [], title: "Estado"},
                {fields: [], title: "Expedición"}
            ]}
        />
    )
}

export default InternalPage