// src/pages/Products.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../features/common/headerSlice';
import EntityList from '../../../features/api/Entity';


import { HiOutlineArrowPath } from "react-icons/hi2";
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

function InternalPage(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title : "Cancelaciones"}));
    }, [dispatch]);

    const icons = [
        { icon: HiOutlineArrowPath, message: 'Devolver Pedido' },
        { icon: TrashIcon, message: 'Eliminar Pedido' },
    ];

    return(
        <EntityList 
            entityName="orders_canceled" 
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
                {fields: [], title: "Gestión del Estado"}
            ]}            
        />
    );
}

export default InternalPage;
