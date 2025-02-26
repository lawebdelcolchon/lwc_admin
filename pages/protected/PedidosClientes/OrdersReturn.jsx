// src/pages/OrdersReturn.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../features/common/headerSlice';
import EntityList from '../../../features/api/Entity';

import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

function InternalPage(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title : "Devoluciones"}));
    }, [dispatch]);

    const icons = [
        { icon: TrashIcon, message: 'Eliminar Pedido' },
    ];

    return(
        <EntityList 
            entityName="orders_return" 
            dbName="lawebes"
            entityTitles={["Id", "Clientes", "Código", "Fecha de Registro", "Estado"]}
            entityMinTitles={["Id", "Clientes"]}
            fields="id, date_order, client.name, client.email, client.phone, code_order, enabled"
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
                { fields: ["date_order"], title: "Fecha de Registro" },
                { fields: ["enabled"], title: "Estado" }
            ]}
            mergedColumnsMin={[
                { fields: ["client.name", "client.email", "client.phone", "date_order"], title: "Clientes" },
                { fields: ["enabled"], title: "" }
            ]}
            panels = {[
                {fields: [], title: "Pedir a Proveedor"},
                {fields: [], title: "Gestión del Estado"},
                {fields: [], title: "Proveedores asignados"},
                {fields: [], title: "Factura"}
            ]}
        />
    );
}

export default InternalPage;
