// src/pages/Products.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../features/common/headerSlice';
import EntityList from '../../../features/api/Entity';

import { HiOutlineMail } from "react-icons/hi";

function InternalPage(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title : "Pedidos"}));
    }, [dispatch]);

    const icons = [
        { icon: HiOutlineMail, message: 'Enviar factura' },
    ];

    return(
        <EntityList 
            entityName="invoices_return" 
            dbName="lawebes"
            entityTitles={["Id", "Clientes", "Código", "Fecha de Registro", "Estado"]}
            entityMinTitles={["Id", "Clientes"]}
            fields="id, date_order, Client.name, Client.email, Client.phone, code_order, enabled"
            fieldsMin="id, name"
            interval={50}
            sort="date_return"
            sortOrder="desc"
            icons={icons}
            widthMain = "1/2"
            widthPanel = "1/2"
            mergedColumns={[
                { fields: ["client.name", "client.email", "client.phone"], title: "Clientes" },
                { fields: ["code_order"], title: "Orden" },
                { fields: ["date_return"], title: "Fecha Rectificación" },
                { fields: ["enabled"], title: "Estado" }
            ]}
            mergedColumnsMin={[
                { fields: ["client.name", "client.email", "client.phone", "date_order"], title: "Clientes" },
                { fields: ["enabled"], title: "" }
            ]}
            panels = {[
                {fields: [], title: "Factura rectificativa"}
            ]}
        />
    );
}

export default InternalPage;
