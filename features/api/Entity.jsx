// src/features/api/Entity.js
import React, { useEffect, useState, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEntities, updateEntity, deleteEntity, fetchExecuteSQL } from './apiSlice';
import TitleCard from '../../components/Cards/TitleCard';
import { FilterContext } from '../../contexts/FilterContext';
import { setPageTitle } from '../common/headerSlice';
import PlusIcon from '@heroicons/react/24/outline/PlusIcon';
import ArrowRightIcon from '@heroicons/react/24/outline/ArrowRightIcon';
import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftIcon';
import { HiOutlineCheck } from "react-icons/hi2";
import { HiOutlineXMark } from "react-icons/hi2";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { HiOutlineFunnel } from "react-icons/hi2";
import { useEmpresa } from '../../contexts/EmpresaContext';
import InputText from '../../components/Input/InputText'
import InputFile from '../../components/Input/InputFile'
import SelectBox from '../../components/Input/SelectBox'
import CheckBox from '../../components/Input/CheckBox'
import TextAreaInput from '../../components/Input/TextAreaInput'
import ToogleInput from '../../components/Input/ToogleInput'
import Divider from '../../components/Input/Divider'
import DataTable from '../../components/Input/DataTable'
import { ChevronDown } from 'lucide-react';
import { ChevronUp } from 'lucide-react';

import moment from 'moment';
import '../styles.css';

function EntityList({
    entityName,
    entityTitles,
    entityMinTitles,
    fields,
    fieldsMin,
    interval = 50,
    sort,
    sortOrder = 'desc',
    panels = [],
    icons,
    mergedColumns = null,
    mergedColumnsMin = null,
    query=null,
    widthMain,
    widthPanel
}) {
    const dispatch = useDispatch();
    const data = useSelector(state => query && query.length > 0 ? state.api.executeSQLResult : state.api.entities);
    console.log(data);
    const { search } = useContext(FilterContext);

    // Estados para manejar las filas seleccionadas
    const [selectedRow, setSelectedRow] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [firstRecordIndex, setFirstRecordIndex] = useState(1);
    const [lastRecordIndex, setLastRecordIndex] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [limit, setLimit] = useState(interval);
    const [isMobile, setIsMobile] = useState(false);
    const { empresa, setEmpresa } = useEmpresa();
    const [selectedDbName, setSelectedDbName] = useState("");
    const [selectFieldOrder, setSelectFieldOrder] = useState(sort);
    const [selectOrder, setSelectOrder] = useState(sortOrder);

    const lastUpdateParams = useRef({ page: null, limit: null, dbName: null });

    // Manejo de la empresa seleccionada
    const handleChangeDatabase = (newEmpresa) => {
        const dbName = newEmpresa === "lawebdelcolchon.es" ? "lawebes" :
                       newEmpresa === "ergonatur.es" ? "ergonatur" : "lawebes";
        setSelectedDbName(dbName);
        updateData(1, 50, dbName, true, sort, sortOrder); // Llamada inicial con página 1 y límite 50
    };

    // Seleccionar la base de datos
    const handleEmpresaChange = (newValue) => {
        setEmpresa(newValue);
        setCurrentPage(1);
        handleChangeDatabase(newValue);
    };

    // Utility functions
    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        return isNaN(dateObj) ? dateString : moment(dateObj).format('DD/MM/YYYY HH:mm');
    };

    const isDateField = (fieldName) => fieldName.startsWith('fecha_') || fieldName.startsWith('date_');

    const applySearch = (value) => data.items.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
    );

    const handleRowClick = (index) => {
        setSelectedRow(index); // Actualiza la fila seleccionada
        // TODO: Actualizar el estado de los campos del panel
    };

    // Page navigation functions
    const goToFirstPage = () => setCurrentPage(1);
    const goToLastPage = () => setCurrentPage(totalPages);
    const goToPreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const goToNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

    // Manejo del cambio de límite de número de registros en pantalla
    const handleLimitChange = (newLimit) => {
        setLimit(newLimit);
        setCurrentPage(1);
        updateData(1, newLimit);
    };

    // API data fetching
    // Función para manejar la actualización de datos
    const updateData = (pageToFetch = 1, limitToUse = limit, dataBase, forceUpdate = false, sort = null, sortOrder = null, includeAssociations = false,
        includeConfig = {}) => {
        // Verificar si los parámetros han cambiado, a menos que forceUpdate sea verdadero
        if (
            !forceUpdate &&
            lastUpdateParams.current.page === pageToFetch &&
            lastUpdateParams.current.limit === limitToUse &&
            lastUpdateParams.current.dbName === dataBase &&
            lastUpdateParams.current.sort === sort &&
            lastUpdateParams.current.sortOrder === sortOrder

        ) {
            return; // Evitar dispatch duplicado
        }
    
        // Actualizar los parámetros rastreados
        lastUpdateParams.current = {
            page: pageToFetch,
            limit: limitToUse,
            dbName: dataBase,
            sort: sort,
            sortOrder: sortOrder
        };
    
        // Lógica existente para dispatch según query
        if (query && query.length > 0) {
            const { dbName, fields, pivotTable, joinTable, joinCondition, joinType, whereCondition, orderBy } = query[0];
            if (limitToUse === "Todos") {
                dispatch(fetchExecuteSQL({
                    fields,
                    pivotTable,
                    joinTable,
                    joinCondition,
                    joinType,
                    whereCondition,
                    orderBy: (sort ? `${sort} ${sortOrder}` : orderBy),
                    dbName: dataBase,
                }));
            } else {
                dispatch(fetchExecuteSQL({
                    fields,
                    pivotTable,
                    joinTable,
                    joinCondition,
                    joinType,
                    whereCondition,
                    orderBy: (sort ? `${sort} ${sortOrder}` : orderBy),
                    page: pageToFetch,
                    limit: limitToUse,
                    dbName: dataBase,
                }));
            }
        } else {
            if (limitToUse === "Todos") {
                dispatch(fetchEntities({
                    entityName,
                    fields,
                    sort,
                    sortOrder,
                    dbName: dataBase,
                    includeAssociations,
                    includeConfig,
                }));
            } else {
                dispatch(fetchEntities({
                    entityName,
                    page: pageToFetch,
                    fields,
                    sort,
                    sortOrder,
                    limit: limitToUse,
                    dbName: dataBase,
                    includeAssociations,
                    includeConfig,
                }));
            }
        }
    };

    useEffect(() => {
        if (selectedRow !== null) {
        }
        // Aquí puedes ejecutar `handleRowClick` para seleccionar la primera fila
        if (data && data.items && data.items.length > 0 && selectedRow === null) {
            handleRowClick(0); // Selecciona el primer elemento si no hay selección
        }
    }, [selectedRow, data]);
    
    // useEffect para manejar cambios en empresa
    useEffect(() => {
        if (empresa) {
            handleChangeDatabase(empresa);
        }
    }, [empresa]);

    // useEffect para actualizar datos al cambiar currentPage o limit
    useEffect(() => {
        if (selectedDbName !== "") {
            updateData(currentPage, limit, selectedDbName);
        }
    }, [currentPage, limit, selectedDbName]);

    // useEffect para actualizar la paginación cuando cambian los datos
    useEffect(() => {
        if (data) {
            setTotalPages(data.totalPages);
            setFirstRecordIndex(data.firstRecordIndex);
            setLastRecordIndex(data.lastRecordIndex);
            setTotalRecords(data.totalRecords);
        }
    }, [data]);

    // useEffect para manejar el filtro de búsqueda
    useEffect(() => {
        if (search) applySearch(search);
    }, [search]);

    // useEffect para manejar el tamaño de pantalla
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const currentTitles = isMobile ? entityMinTitles : entityTitles;
    const currentFields = isMobile ? fieldsMin : fields;

    const currentMergedColumns  = isMobile ? mergedColumnsMin : mergedColumns;

    const getDisplayValue = (fieldValue, field) => {
        let displayValue;
        const isDate = isDateField(field.trim());
        
        // Verifica si el campo es "enabled" o comienza por "status" y asigna el ícono correspondiente
        if (field.trim() === "enabled" || field.trim().startsWith("status")) {
            displayValue = fieldValue === 1 
                ? <HiOutlineCheck className="w-4 h-4 font-bold text-green-500" /> 
                : <HiOutlineXMark className="w-4 h-4 font-bold text-red-500" />;
        } 
        // Verifica si el campo es una fecha válida
        else if (isDate && !isNaN(Date.parse(fieldValue))) {
            displayValue = formatDate(fieldValue);
        } 
        // Verifica si el valor es nulo, undefined o NaN
        else if (fieldValue === null || fieldValue === undefined || (typeof fieldValue === 'number' && isNaN(fieldValue))) {
            displayValue = '';
        } 
        // Verifica si el valor es un número
        else if (typeof fieldValue === 'number') {
            // Si el valor es un número entero, mostrar sin decimales
            if (Number.isInteger(fieldValue)) {
                displayValue = fieldValue;
            } 
            // Si es un número decimal, formatear con 3 decimales
            else {
                displayValue = fieldValue.toFixed(3);
            }
        } 
        // Si es un valor alfanumérico o de otro tipo, mostrar tal cual
        else {
            displayValue = fieldValue;
        }
        return displayValue;
    }

    let AnchoDatos = ""
    let AnchoPaneles = ""
    if (widthMain == "1/2") {
        AnchoDatos = "overflow-x-auto w-full md:w-1/2";
        AnchoPaneles = "h-full pl-0 hidden md:block w-1/2";
    } else if (widthMain == "3/4") {
        AnchoDatos = "overflow-x-auto w-full md:w-3/4";
        AnchoPaneles = "h-full pl-0 hidden md:block w-1/4";
    } else if (widthMain == "1/4") {
        AnchoDatos = "overflow-x-auto w-full md:w-1/4";
        AnchoPaneles = "h-full pl-0 hidden md:block w-3/4";
    } else if (widthMain == "3/5") {
        AnchoDatos = "overflow-x-auto w-full md:w-3/5";
        AnchoPaneles = "h-full pl-0 hidden md:block w-2/5";
    } else if (widthMain == "2/5") {
        AnchoDatos = "overflow-x-auto w-full md:w-2/5";
        AnchoPaneles = "h-full pl-0 hidden md:block w-3/5";
    } else if (widthMain == "2/2") {
        AnchoDatos = "overflow-x-auto w-full md:w-2/2";
        AnchoPaneles = "h-full pl-0 hidden md:block w-0";
    } else {
        AnchoDatos = "overflow-x-auto w-full md:w-1/2";
        AnchoPaneles = "h-full pl-0 hidden md:block w-1/2";
    }
    
    // Manejo de actualización y eliminación
    const handleIconAction = async (iconItem, recordId, currentValue) => {
        const { action, field, updateValue } = iconItem;
    
        if (action === 'update' && field) {
            const updatedValue = updateValue(currentValue);
            dispatch(updateEntity({
                entityName,
                id: recordId,
                updatedEntity: { [field]: updatedValue },
                dbName: selectedDbName,
            }))
            .unwrap()
            .then(() => updateData(1, 50, selectedDbName, true)); // Forzar actualización
        }
    
        if (action === 'delete') {
            dispatch(deleteEntity({
                entityName,
                id: recordId,
                dbName: selectedDbName,
            }))
            .unwrap()
            .then(() => updateData(1, 50, selectedDbName, true)); // Forzar actualización
        }
    };
    
    const [fieldValues, setFieldValues] = useState(() => {
        // Inicializa valores con base en los campos
        const initialState = {};
        panels.forEach((panel) => {
            panel.fields.forEach((field) => {
                initialState[field.name] = field.value || null;
            });
        });
        return initialState;
    });

    const updateFormValue = (fieldName, value) => {
        setFieldValues((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    const isVisible = (field) => {
        if (!(field.visible_on || field.not_visible_on)) return true;
        if (field.visible_on) return fieldValues[field.visible_on];
        if (field.not_visible_on) return !fieldValues[field.not_visible_on];
    };

    const isEnabled = (field) => {
        if (!(field.enable_on  || field.not_enable_on)) return true;
        if (field.enable_on) return fieldValues[field.enable_on];
        if (field.not_enable_on) return !fieldValues[field.not_enable_on];
    };

    const handleButtonTitle = (index) => {
        console.log(currentTitles[index]);
        let NewOrder = ""
        if (index === selectFieldOrder) {
            if (selectOrder === "") {
                NewOrder = "asc";
            } else if (selectOrder === "asc") {
                NewOrder = "desc";
            } else {
                NewOrder = "asc";
            }
        } else {
            NewOrder = "asc";
        }    

        const fieldArray = fields.split(',');
        const selectedField = fieldArray[index].trim();
        console.log(selectedField)
        setSelectFieldOrder(index);
        setSelectOrder(NewOrder);
        updateData(1, 50, selectedDbName, true, selectedField, NewOrder); // Llamada inicial con página 1, límite 50 y nuevo orden
    };
    
    if(!data) {
        return(<></>);
    } else {
        return (
            <TitleCard topMargin="mt-2">
                <div className="h-full w-full bg-base-100 flex">
                    {/* Table Section */}
                    <div className={AnchoDatos} style={{ maxHeight: "82vh" }}>
                        <table className="table table-xs table-pin-rows table-pin-cols w-full h-full">
                            {/* Table Header */}
                            <thead>
                                <tr style={{ borderBottom: '2px solid rgb(229, 231, 235)' }}>
                                    <th>#</th>
                                    {/* Si currentMergedColumns está presente, usamos los títulos combinados */}
                                    {currentMergedColumns ? (
                                        currentMergedColumns.map((mergedColumn, index) => (
                                            <th key={index} id={index}>
                                                {/* Usamos el título definido en currentMergedColumns */}
                                                <button onClick={() => handleButtonTitle(index)} className="btn btn-xs btn-ghost">
                                                    <span>{mergedColumn.title}</span>
                                                    {
                                                        index === selectFieldOrder &&
                                                            ((selectOrder === "asc") ?
                                                                <ChevronDown
                                                                    className={`h-4 w-4`}
                                                                /> :
                                                                <ChevronUp
                                                                    className={`h-4 w-4`}
                                                                />)
                                                    } 
                                                </button>
                                            </th>
                                        ))
                                    ) : (
                                        // Caso por defecto: mapear los currentTitles
                                        currentTitles.map((title, index) => (
                                            <th key={index} id={index}>
                                                <button onClick={() => handleButtonTitle(index)} className="btn btn-xs btn-ghost">
                                                    <span>{title}</span>
                                                    {
                                                        index === selectFieldOrder &&
                                                            ((selectOrder === "asc") ?
                                                                <ChevronDown
                                                                    className={`h-4 w-4`}
                                                                /> :
                                                                <ChevronUp
                                                                    className={`h-4 w-4`}
                                                                />)
                                                    } 
                                                </button>
                                            </th>
                                        ))
                                    )}
                                    <th style={{ width: "88px", fontSize: "12px" }}>Acciones</th>
                                </tr>
                            </thead>


                            {/* Table Body */}
                            <tbody>
                                {Array.isArray(data?.items) && !(firstRecordIndex === undefined) && data.items.map((item, index) => {
                                    const recordNumber = firstRecordIndex + index;

                                    return (
                                        <tr
                                            id={`${item.id}`}
                                            key={index}
                                            className={`${
                                                selectedRow === index ? 'bg-gray-300 hover:bg-gray-300' : 'hover:bg-gray-200'
                                            } hover:bg-gray-200`}
                                            onClick={() => handleRowClick(index)} // Actualiza la fila seleccionada
                                        >
                                            <td>{recordNumber}</td>

                                            {currentMergedColumns ? (
                                                // Si currentMergedColumns no es null, recorrer currentMergedColumns
                                                currentMergedColumns.map((mergedColumn, colIndex) => {
                                                    const { fields: mergedFields } = mergedColumn; // Extraer los campos combinados
                                                    let displayValue;

                                                    if (mergedFields.length > 1) {
                                                        // Si tiene más de un campo, mostrar los valores con diferentes estilos
                                                        displayValue = (
                                                            <div>
                                                                {mergedFields.map((field, fieldIndex) => {
                                                                    let fieldValue;
                                                                    if (field.includes('.')) {
                                                                        const [objectName, attributeName] = field.split('.');
                                                                        fieldValue = item[objectName]?.[attributeName];
                                                                    } else {
                                                                        fieldValue = item[field.trim()];
                                                                    }
                                                                    const formattedValue = getDisplayValue(fieldValue, field);

                                                                    // Aplicar diferentes estilos según el índice del campo
                                                                    if (fieldIndex === 0) {
                                                                        return <div key={fieldIndex} className="font-bold"><span className='text-blue-500'>{item.id}</span> {formattedValue}</div>;
                                                                    } else if (fieldIndex === 1) {
                                                                        return <div key={fieldIndex} className="text-xs opacity-70">{formattedValue}</div>;
                                                                    } else if (fieldIndex === 2) {
                                                                        return <span key={fieldIndex} className="badge badge-ghost badge-sm">{formattedValue}</span>;
                                                                    }
                                                                    return null; // Por si hay más campos, ignorar otros valores
                                                                })}
                                                            </div>
                                                        );
                                                    } else {
                                                        // Si solo tiene un campo, aplicar la lógica normal
                                                        const field = mergedFields[0].trim();
                                                        const fieldValue = item[field];
                                                        displayValue = getDisplayValue(fieldValue, field);
                                                    }

                                                    // Establecer la alineación del texto según el tipo de campo
                                                    let textAlignCell = "left";
                                                    if (typeof displayValue === 'number') {
                                                        textAlignCell = "right"; // Los números se alinean a la derecha
                                                    } else if (mergedFields[0].trim() === "enabled" || mergedFields[0].trim().startsWith("status")) {
                                                        textAlignCell = "center"; // Los íconos para "enabled" se alinean al centro
                                                    }

                                                    return (
                                                        <td key={colIndex} style={{ textAlign: textAlignCell }}>
                                                            {displayValue}
                                                        </td>
                                                    );
                                                })
                                            ) : (
                                                // Caso normal: si currentMergedColumns es null o estamos en móvil, usar los campos actuales
                                                currentFields.split(',').map((field, fieldIndex) => {
                                                    const fieldValue = item[field.trim()];
                                                    const displayValue = getDisplayValue(fieldValue, field.trim());

                                                    // Establecer la alineación del texto según el tipo de campo
                                                    let textAlignCell = "left";
                                                    if (typeof displayValue === 'number') {
                                                        textAlignCell = "right"; // Los números se alinean a la derecha
                                                    } else if (field.trim() === "enabled" || field.trim().startsWith("status")) {
                                                        textAlignCell = "center"; // Los íconos para "enabled" se alinean al centro
                                                    }

                                                    return (
                                                        <td key={fieldIndex} style={{ textAlign: textAlignCell }}>
                                                            {displayValue}
                                                        </td>
                                                    );
                                                })
                                            )}

                                            <td>
                                                {icons.map((iconItem, idx) => {
                                                    const { icon: IconComponent, message, switch_icon: SwitchIcon, switch_message: switchMessage, field } = iconItem;
                                                    const isSwitchEnabled = field && item[field] === 0;
                                                    const RenderIcon = isSwitchEnabled ? SwitchIcon : IconComponent;
                                                    const renderMessage = isSwitchEnabled ? switchMessage : message;
                                                    const iconColorClass = isSwitchEnabled ? 'text-red-500' : 'text-black';

                                                    return (
                                                        <button
                                                
                                                        key={idx}
                                                            className="btn btn-square btn-ghost btn-xs"
                                                            title={renderMessage}
                                                            onClick={() => handleIconAction(iconItem, item.id, item[field])}
                                                        >
                                                            <RenderIcon className={`w-4 h-4 ${iconColorClass}`} />
                                                        </button>
                                                    );
                                                })}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>

                            {/* Table Footer */}
                            <tfoot>
                                <tr>
                                    <th colSpan="9">
                                        <div className="join">
                                            <button className="join-item btn btn-xs btn-ghost">
                                                <HiOutlineMagnifyingGlass className="w-4" />{!isMobile ?  "Buscar" : ""}
                                            </button>
                                            <div className="dropdown dropdown-top join-item">
                                                <button className="join-item btn btn-xs btn-ghost">{firstRecordIndex} - {lastRecordIndex} de {totalRecords}</button>
                                                <ul className="dropdown-content menu bg-base-100 rounded-box w-40 p-2 shadow">
                                                    <li><button onClick={() => goToFirstPage()}>Primera página</button></li>
                                                    <li><button onClick={() => goToLastPage()}>Última página</button></li>
                                                </ul>
                                            </div>
                                            <button className="join-item btn btn-xs btn-ghost" onClick={goToPreviousPage} disabled={currentPage <= 1}>
                                                <ArrowLeftIcon className="w-4" />
                                            </button>
                                            <button className="join-item btn btn-xs btn-ghost" onClick={goToNextPage} disabled={currentPage >= totalPages}>
                                                <ArrowRightIcon className="w-4" />
                                            </button>
                                            <div className="dropdown dropdown-top join-item">
                                                <button className="join-item btn btn-xs btn-ghost">Límite: {limit}</button>
                                                <ul className="dropdown-content menu bg-base-100 rounded-box w-40 p-2 shadow">
                                                    <li><button onClick={() => handleLimitChange(50)}>50</button></li>
                                                    <li><button onClick={() => handleLimitChange(100)}>100</button></li>
                                                    <li><button onClick={() => handleLimitChange(200)}>200</button></li>
                                                    <li><button onClick={() => handleLimitChange(500)}>500</button></li>
                                                    <li><button onClick={() => handleLimitChange("Todos")}>Todos</button></li>
                                                </ul>
                                            </div>
                                            <button className="join-item btn btn-xs btn-ghost">
                                                <PlusIcon className="w-4" />{!isMobile ?  "Agregar" : ""}
                                            </button>
                                            <div className="dropdown dropdown-top dropdown-end join-item">
                                            <button className="join-item btn btn-xs btn-ghost">
                                                <HiOutlineFunnel className="w-4" />{!isMobile ?  empresa : ""}
                                            </button>
                                                <ul className="dropdown-content menu bg-base-100 rounded-box w-40 p-2 shadow">
                                                    <li><button onClick={() => handleEmpresaChange("lawebdelcolchon.es")}>lawebdelcolchon.es</button></li>
                                                    <li><button onClick={() => handleEmpresaChange("ergonatur.es")}>ergonatur.es</button></li>
                                                    <li><button onClick={() => handleEmpresaChange("mueblescantero.es")}>mueblescantero.es</button></li>
                                                    <li><button onClick={() => handleEmpresaChange("dibermodel.es")}>dibermodel.es</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Tab Section */}
                    {(widthPanel !== "" ? (
                        <div className={AnchoPaneles} style={{ maxHeight: "82vh" }}>
                            <div role="tablist" className="tabs tabs-bordered" style={{ marginTop: "3px" }}>
                                {panels.map((panel, index) => (
                                    <React.Fragment key={index}>
                                        <input
                                            type="radio"
                                            name="panels"
                                            role="tab"
                                            className="tab"
                                            aria-label={panel.title}
                                            id={`tab-${index}`}
                                            defaultChecked={index === 0}
                                            style={{ fontSize: "12px" }}
                                        />
                                        <div 
                                            role="tabpanel" 
                                            className="tab-content p-1 w-full h-full"
                                            style={{ overflowY: "auto", height: "calc(82vh - 2rem)" }} // Ajusta la altura según sea necesario
                                        >
                                            {panel.fields.length > 0 ? (
                                                panel.fields.map((field, idx) => {
                                                    // Verificar visibilidad
                                                    if (!isVisible(field)) return null;

                                                    // Determinar si está habilitado
                                                    const isFieldEnabled = isEnabled(field);

                                                    return (
                                                        <div key={idx}>
                                                            {field.type === "input" && (
                                                                <InputText
                                                                    inputType={field.inputType}
                                                                    labelTitle={field.labelTitle}
                                                                    labelStyle={field.labelStyle}
                                                                    containerStyle={field.containerStyle}
                                                                    placeholder={field.placeholder}
                                                                    defaultValue={field.value}
                                                                    updateType={field.name}
                                                                    updateFormValue={(newValue) =>
                                                                        updateFormValue(field.name, newValue)
                                                                    }
                                                                    labelPosition={field.position}
                                                                    size={field.size}
                                                                    border={field.border}
                                                                    disabled={!isFieldEnabled}
                                                                />
                                                            )}
                                                            {field.type === "file" && (
                                                                <InputFile
                                                                    inputType={field.inputType}
                                                                    labelTitle={field.labelTitle}
                                                                    defaultValue={field.value}
                                                                    updateType={field.name}
                                                                    updateFormValue={(newValue) =>
                                                                        updateFormValue(field.name, newValue)
                                                                    }
                                                                    labelPosition={field.position}
                                                                    size={field.size}
                                                                    border={field.border}
                                                                    disabled={!isFieldEnabled}
                                                                />
                                                            )}
                                                            {field.type === "select" && (
                                                                <SelectBox
                                                                    labelTitle={field.labelTitle}
                                                                    labelStyle={field.labelStyle}
                                                                    containerStyle={field.containerStyle}
                                                                    placeholder="Selecciona una opción"
                                                                    defaultValue={field.value}
                                                                    options={field.options}
                                                                    updateType={field.name}
                                                                    updateFormValue={(data) =>
                                                                        updateFormValue(data.updateType, data.value)
                                                                    }
                                                                    labelPosition={field.position}
                                                                    size={field.size}
                                                                    border={field.border}
                                                                    disabled={!isFieldEnabled}
                                                                />
                                                            )}
                                                            {field.type === "toggle" && (
                                                                <ToogleInput
                                                                    labelTitle={field.labelTitle}
                                                                    placeholder={field.placeholder}
                                                                    defaultValue={field.value}
                                                                    updateType={field.name}
                                                                    updateFormValue={(data) =>
                                                                        updateFormValue(data.updateType, data.value)
                                                                    }
                                                                    labelPosition={field.position}
                                                                    size={field.size}
                                                                />
                                                            )}
                                                            {field.type === "checkbox" && (
                                                                <CheckBox
                                                                    labelTitle={field.labelTitle}
                                                                    defaultValue={field.value}
                                                                    updateType={field.name}
                                                                    updateFormValue={(data) =>
                                                                        updateFormValue(data.updateType, data.value)
                                                                    }
                                                                    labelPosition={field.position}
                                                                    size={field.size}
                                                                />
                                                            )}
                                                            {field.type === "textinputarea" && (
                                                                <TextAreaInput
                                                                    labelTitle={field.labelTitle}
                                                                    defaultValue={field.value}
                                                                    placeholder={field.placeholder}
                                                                    updateType={field.name}
                                                                    updateFormValue={(data) =>
                                                                        updateFormValue(data.updateType, data.value)
                                                                    }
                                                                    labelPosition={field.position}
                                                                    size={field.size}
                                                                    border={field.border}
                                                                    disabled={!isFieldEnabled}
                                                                />
                                                            )}
                                                            {field.type === "divider" && (
                                                                <Divider
                                                                    type={field.dividerType}
                                                                    text={field.text}
                                                                    containerStyle={field.containerStyle}
                                                                />
                                                            )}
                                                            {field.type === "datatable" && (
                                                                <DataTable
                                                                    
                                                                />
                                                            )}
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <p>Contenido por definir</p>
                                            )}
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    ) : "")}
                </div>
            </TitleCard>
        );
    }
}

export default EntityList;
