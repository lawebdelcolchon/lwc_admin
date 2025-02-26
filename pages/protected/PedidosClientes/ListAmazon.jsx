// src/pages/Products.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../features/common/headerSlice';
import EntityList from '../../../features/api/Entity';

import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

function InternalPage(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title : "Pedidos Amazon"}));
    }, [dispatch]);

    const icons = [
        { icon: TrashIcon, message: 'Eliminar Pedido' },
    ];

    return(
        <EntityList 
            entityName="orders_return" 
            dbName="lawebes"
            entityTitles={["Id", "Clientes", "Código", "Fecha Compra", "Estado"]}
            entityMinTitles={["Id", "Clientes"]}
            fields="id, buyer_name, buyer_email, buyer_phone_number"
            fieldsMin="id, name"
            interval={50}
            sort="id"
            sortOrder="desc"
            panels = {[]}
            icons={icons}
            widthMain = "2/2"
            widthPanel = ""
            mergedColumns={[
                { fields: ["buyer_name", "buyer_email", "buyer_phone_number"], title: "Clientes" },
                { fields: ["order_id"], title: "Orden" },
                { fields: ["delivery_start_date"], title: "Fecha Compra" },
                { fields: ["delivery_end_date"], title: "Fecha Entrega" },
                { fields: ["sku"], title: "SKU" },
                { fields: ["quantity_purchased"], title: "Unidades" },
                { fields: ["item_price"], title: "Precio" },
                { fields: ["ship_service_level"], title: "Entrega" },
                { fields: ["status_cli"], title: "Cli" },
                { fields: ["status_cart"], title: "Cart" },
                { fields: ["status_order"], title: "Ord" }
            ]}
            mergedColumnsMin={[
                { fields: ["buyer_name", "buyer_email", "buyer_phone_number"], title: "Clientes" },
                { fields: ["enabled"], title: "" }
            ]}
            query={[{
                fields: 'order_id, order_item_id, DATE(purchase_date) AS purchase_date, DATE(payments_date) AS payments_date, buyer_email, buyer_name, buyer_phone_number, sku, product_name, quantity_purchased, currency, item_price, item_tax, shipping_price, shipping_tax, ship_service_level, recipient_name, ship_address_1, ship_address_2, ship_address_3, ship_city, ship_state, ship_postal_code, ship_country, ship_phone_number, DATE(delivery_start_date) AS delivery_start_date, DATE(delivery_end_date) AS delivery_end_date, delivery_time_zone, delivery_Instructions, sales_channel, processed_cart as status_cart, processed_order as status_order, customer_created as status_cli, id_client, code_order, promise_date',
                pivotTable: 'gt_import_orders_amazon',
                orderBy: 'id DESC, processed_order',
                }
            ]}
            
        />
    );
}

export default InternalPage;
