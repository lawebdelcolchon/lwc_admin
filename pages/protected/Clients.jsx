// src/pages/protected/Clients.js
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import EntityList from '../../features/api/Entity'

import { HiOutlineLockOpen } from "react-icons/hi2";
import { HiOutlineLockClosed } from "react-icons/hi2";
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Clientes"}))
    }, [])

    const icons = [
        {
            icon: HiOutlineLockOpen,
            message: 'Bloquear Cliente',
            switch_icon: HiOutlineLockClosed,
            switch_message: 'Desbloquear Cliente',
            field: "enabled",
            action: 'update', // Acción asociada
            updateValue: (currentValue) => currentValue === 0 ? 1 : 0 // Alternar entre 0 y 1
        },
        { icon: TrashIcon, message: 'Eliminar cliente' },
    ];

    const infoItems = [
      { type: "toggle", name: "is_company", labelTitle: "Es Empresa", value: true, position: "left", size: "sm"},
//      { type: "checkbox", name: "", placeholder: "Es Empresa", value: true, position: "left", size: "sm"},
//      { type: "file", name: "name", labelTitle: "Archivo", value: "",  position: "left", size: "sm", border: "bordered"},
      { type: "input", inputType:"text", labelTitle: "Nombre", name: "name", placeholder: "Nombre", value: "", position: "left", size: "sm", border: "bordered"},
      { type: "input", inputType:"text", labelTitle: "Apellidos", name: "lastname", placeholder: "Apellidos", value: "", position: "left", size: "sm", border: "bordered", not_visible_on: "is_company"},
      { type: "input", inputType:"text", labelTitle: "NIF", name: "tax_code", placeholder: "CIF/NIF", value: "", position: "left", size: "sm", border: "bordered", visible_on: "is_company"},
      { type: "divider", dividerType: "horizontal", text: "", containerStyle: "my-1", visible_on: "is_company"},
      { type: "input", inputType:"email", labelTitle: "mail", name: "email", placeholder: "E-mail", value: "", position: "left", size: "sm", border: "bordered"},
      { type: "input", inputType:"phone", labelTitle: "Teléfono", name: "phone", placeholder: "Teléfono", value: "", position: "left", size: "sm", border: "bordered"},
      { type: "input", inputType:"phone", labelTitle: "Fax", name: "fax", placeholder: "Fax", value: "", position: "left", size: "sm", border: "bordered"},
      { type: "select", name: "road", labelTitle: "Tipo de vía", position: "left", size: "sm", border: "bordered", options:
        [
          { name: "Avenida", value: "Avenida" },
          { name: "Barrio", value: "Barrio" },
          { name: "Calle", value: "Calle" },
          { name: "Camino", value: "Camino" },
          { name: "Carretera", value: "Carretera" },
          { name: "Chalet", value: "Chalet" },
          { name: "Edificio", value: "Edificio" },
          { name: "Parcela", value: "Parcela" },
          { name: "Pasaje", value: "Pasaje" },
          { name: "Plaza", value: "Plaza" },
          { name: "Pol. Ind.", value: "Pol. Ind." },
          { name: "Km.", value: "Km." },
          { name: "Travesía", value: "Travesía" },
          { name: "Urbanización", value: "Urbanización" }
        ] 
      },
      { type: "input", inputType:"text", labelTitle: "Dirección", name: "address", placeholder: "Dirección", value: "", position: "left", size: "sm", border: "bordered"},
      { type: "input", inputType:"numeric", labelTitle: "Código Postal", name: "zipcode", placeholder: "Código Postal", value: "", position: "left", size: "sm", border: "bordered"},
      { type: "select", name: "county", position: "left", size: "sm", border: "bordered", options:
        [
          { name: "Álava", value: "Álava"},
          { name: "Albacete", value: "Albacete"},
          { name: "Alemania", value: "Alemania"},
          { name: "Alicante", value: "Alicante"},
          { name: "Almería", value: "Almería"},
          { name: "Andorra", value: "Andorra"},
          { name: "Asturias", value: "Asturias"},
          { name: "Ávila", value: "Ávila"},
          { name: "Badajoz", value: "Badajoz"},
          { name: "Balears Illes", value: "Balears Illes"},
          { name: "Barcelona", value: "Barcelona"},
          { name: "Burgos", value: "Burgos"},
          { name: "Cáceres", value: "Cáceres"},
          { name: "Cádiz", value: "Cádiz"},
          { name: "Cantabria", value: "Cantabria"},
          { name: "Castellón", value: "Castellón"},
          { name: "Ceuta", value: "Ceuta"},
          { name: "CiudadReal", value: "CiudadReal"},
          { name: "Córdoba", value: "Córdoba"},
          { name: "La Coruña", value: "La Coruña"},
          { name: "Cuenca", value: "Cuenca"},
          { name: "Francia", value: "Francia"},
          { name: "Girona", value: "Girona"},
          { name: "Granada", value: "Granada"},
          { name: "Guadalajara", value: "Guadalajara"},
          { name: "Guipúzcoa", value: "Guipúzcoa"},
          { name: "Huelva", value: "Huelva"},
          { name: "Huesca", value: "Huesca"},
          { name: "Italia", value: "Italia"},
          { name: "Jaén", value: "Jaén"},
          { name: "León", value: "León"},
          { name: "Lleida", value: "Lleida"},
          { name: "Lugo", value: "Lugo"},
          { name: "Madrid", value: "Madrid"},
          { name: "Málaga", value: "Málaga"},
          { name: "Melilla", value: "Melilla"},
          { name: "Murcia", value: "Murcia"},
          { name: "Navarra", value: "Navarra"},
          { name: "Ourense", value: "Ourense"},
          { name: "Palencia", value: "Palencia"},
          { name: "Las Palmas", value: "Las Palmas"},
          { name: "Pontevedra", value: "Pontevedra"},
          { name: "Portugal", value: "Portugal"},
          { name: "ReinoUnido", value: "ReinoUnido"},
          { name: "La Rioja", value: "La Rioja"},
          { name: "Salamanca", value: "Salamanca"},
          { name: "SantaCruz de Tenerife", value: "SantaCruz de Tenerife"},
          { name: "Segovia", value: "Segovia"},
          { name: "Sevilla", value: "Sevilla"},
          { name: "Soria", value: "Soria"},
          { name: "Tarragona", value: "Tarragona"},
          { name: "Teruel", value: "Teruel"},
          { name: "Toledo", value: "Toledo"},
          { name: "Valencia", value: "Valencia"},
          { name: "Valladolid", value: "Valladolid"},
          { name: "Vizcaya", value: "Vizcaya"},
          { name: "Zamora", value: "Zamora"},
          { name: "Zaragoza", value: "Zaragoza"},

        ] 
      },
      { type: "divider", dividerType: "horizontal", text: "", containerStyle: "my-1"},
      { type: "input", inputType: "password", labelTitle: "Contraseña", name: "password", placeholder: "Contraseña", value: "", position: "left", size: "sm", border: "bordered" },
      { type: "input", inputType: "password", labelTitle: "Repetir contraseña", name: "password2", placeholder: "Repetir contraseña", value: "", position: "left", size: "sm", border: "bordered", equalTo: "password" },
      // { type: "select", labelTitle: "Nivel acceso", name: "level", value: "", position: "left", size: "sm", border: "bordered", options: [
      //   { name: "8 - Gestor comercial", value: "" }, 
      //   { name: "0 - Cliente", value: "" }, 
      // ] },
      { type: "toggle", name: "enable", labelTitle: "Habilitar en GestERP", value: true, position: "left", size: "sm" }

    ];
 
    return(
        <EntityList 
            entityName="clients" 
            entityTitles={["Id", "Clientes", "Correo", "Teléfono", "Fecha de registro", "Estado"] }
            entityMinTitles={["Id", "Clientes"] }
            fields="id, name, email, phone, date_client, enabled" 
            fieldsMin="id, name" 
            interval={50} 
            sort="name"
            sortOrder="asc"
            icons={icons}
            mergedColumns={[
              { fields: ["name", "email", "phone"], title: "Cliente" },
              { fields: ["date_client"], title: "Fecha de Registro" },
              { fields: ["enabled"], title: "Estado" }
            ]}
            widthMain = "2/5"
            widthPanel = "3/5"
            panels = {[
              {fields: infoItems, title: "Info"}
            ]}
            
            
        />
    )
}

export default InternalPage