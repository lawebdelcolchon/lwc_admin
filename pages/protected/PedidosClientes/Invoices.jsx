// src/pages/Invoices.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../features/common/headerSlice';
import EntityList from '../../../features/api/Entity';


import { HiOutlineMail } from "react-icons/hi";
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

function InternalPage(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title : "Facturas"}));
    }, [dispatch]);

    const icons = [
        { icon: HiOutlineMail, message: 'Enviar factura' },
        { icon: TrashIcon, message: 'Eliminar Pedido' },
    ];

    return(
        <EntityList 
            entityName="invoices" 
            dbName="lawebes"
            entityTitles={["Id", "Clientes", "Código", "Fecha Envío Factura", "Estado"]}
            entityMinTitles={["Id", "Clientes"]}
            fields="id, date_order, Client.name, Client.email, Client.phone, code_order, enabled"
            fieldsMin="id, name"
            interval={50}
            sort="date_order"
            sortOrder="desc"
            icons={icons}
            widthMain = "1/2"
            widthPanel = "1/2"
            mergedColumns={[
                { fields: ["client.name", "client.email", "client.phone"], title: "Clientes" },
                { fields: ["code_order"], title: "Orden" },
                { fields: ["date_order"], title: "Fecha Envío Factura" },
                { fields: ["enabled"], title: "Estado" }
            ]}
            mergedColumnsMin={[
                { fields: ["client.name", "client.email", "client.phone", "date_order"], title: "Clientes" },
                { fields: ["enabled"], title: "" }
            ]}
            panels = {[
                {fields: [], title: "Facturas"}
            ]}
        />
    );
}

export default InternalPage;
