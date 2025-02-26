// src/pages/Products.js
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
            entityTitles={["Id", "Clientes", "Código", "Fecha", "Estado"]}
            entityMinTitles={["Id", "Clientes"]}
            fields="id, date_client, client.name, client.email, client.phone, code_order, enabled"
            fieldsMin="id, name"
            interval={50}
            sort="data_client"
            sortOrder="desc"
            icons={icons}
            widthMain = "1/2"
            widthPanel = "1/2"
            mergedColumns={[
                { fields: ["name", "email", "phone"], title: "Cliente" },
                { fields: ["code_order"], title: "Orden" },
                { fields: ["date_client"], title: "Fecha Orden" },
                { fields: ["enabled"], title: "Estado" }
            ]}
            mergedColumnsMin={[
                { fields: ["name", "email", "phone", "date_return"], title: "Clientes" },
                { fields: ["enabled"], title: "" }
            ]}
            query={[{
                fields: 'gt_orders_suppliers_temp.id, gt_orders_suppliers_temp.code_order, gt_orders_suppliers_temp.data_client as date_client, gt_clients.name, gt_orders_suppliers_temp.schedule as date_schedule, gt_clients.phone, gt_clients.email ',
                pivotTable: 'gt_orders_suppliers_temp, gt_orders, gt_clients',
                whereCondition: 'gt_orders_suppliers_temp.id_order_client = gt_orders.id AND gt_orders.id_client = gt_clients.id AND gt_orders_suppliers_temp.id NOT IN (SELECT line_supp FROM gt_detail_order_supplier)',
                orderBy: 'gt_orders_suppliers_temp.data_client DESC',
                dbName: 'lawebes',
                page: '1',
                limit: '50',
                noPagination: 'false'
                }
            ]}           
            panels = {[
                {fields: [], title: "Gestión del Estado"},
                {fields: [], title: "Reembolso"},
                {fields: [], title: "Factura rectificativa"}
            ]}
        />
    );
}

export default InternalPage;
