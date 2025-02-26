// src/pages/Products.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../features/common/headerSlice';
import EntityList from '../../features/api/Entity';

import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import EyeIcon from '@heroicons/react/24/outline/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/outline/EyeSlashIcon';

import { GrClone } from "react-icons/gr";
import { PiNotePencil } from "react-icons/pi";

import { HiOutlineNoSymbol } from "react-icons/hi2";

const ImagenesItems = [
    { type: "input", inputType:"text", labelTitle:"", name: "", placeholder: "La primera imágen se utilizará por defecto (PRINCIPAL)", value: "", position: "left", size: "sm", border: "bordered"}, //mensaje de notificaciones del estado de las imagenes
    { type: "divider", inputType:"text", name: "", placeholder: "Linea", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "input", inputType:"text", labelTitle:"", name: "", placeholder: "Adjuntar archivos", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "input", inputType:"text", labelTitle:"", name: "", placeholder: "Posicion", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "input", inputType:"text", labelTitle:"", name: "", placeholder: "Añadir imágen", value: "", position: "left", size: "sm", border: "bordered"},  
];

const DetallesItems = [
    { type: "select", name: "level", labelTitle: "Estado", value: "", position: "left", size: "sm", border: "bordered", options: [
        { name: "Visible", value: "" }, 
        { name: "Escaparate", value: "" }, 
        { name: "Exposicion", value: "" },
      ]
    },
    { type: "input", inputType:"text", labelTitle:"Nombre", name: "", placeholder: "Nombre", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "input", inputType:"text", labelTitle:"Codigo", name: "", placeholder: "Codigo", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "input", inputType:"text", labelTitle:"Unidades", name: "", placeholder: "Unidades", value: "", position: "left", size: "sm", border: "bordered"}, 
    { type: "input", inputType:"text", labelTitle:"Disponibilidad", name: "", placeholder: "Disponibilidad", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "select", name: "level", labelTitle: "Categoria", value: "", position: "left", size: "sm", border: "bordered", options: [
        { name: "Cabeceros", value: "" }, 
        { name: "Colchones", value: "" }, 
        { name: "Camas", value: "" }, 
        { name: "Somieres", value: "" }
      ]
    },
    { type: "input", inputType:"text", labelTitle:"Precio", name: "", placeholder: "Precio", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "input", inputType:"text", labelTitle:"Precio de Oferta", name: "", placeholder: "Precio de Oferta", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "input", inputType:"text", labelTitle:"Disponibles de Oferta", name: "", placeholder: "Disponibles de Oferta", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "select", name: "level", labelTitle: "Precio tipo", value: "", position: "left", size: "sm", border: "bordered", options: [
        { name: "Impuesto Incluido", value: "" }, 
        { name: "Impuesto no incluido", value: "" }, 
      ]
    },
    { type: "toggle", name: "", labelTitle: "Impuesto incluido", value: true, position: "left", size: "sm"},
    { type: "input", inputType:"text", labelTitle:"Impuestos (%)", name: "", placeholder: "Impuestos (%)", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "divider", dividerType: "horizontal", text: "", containerStyle: "my-1", visible_on: "is_company"},
    { type: "input", inputType:"text", labelTitle:"Comentarios", name: "", placeholder: "Comentarios", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "select", name: "level", labelTitle: "Marcar como", value: "", position: "left", size: "sm", border: "bordered", options: [
        { name: "Normal", value: "" }, 
        { name: "Destacado", value: "" }, 
        { name: "Mas vendido", value: "" },
        { name: "Sin Estock", value: "" },
        { name: "Super Precio", value: "" }    
      ]
    },
    { type: "divider", dividerType: "horizontal", text: "SEO", containerStyle: "my-1"},
    { type: "input", inputType:"text", labelTitle:"Descripción", name: "", placeholder: "Descripción", value: "", position: "left", size: "sm", border: "bordered"}, //cambiar a editor para descripcion del contenido del producto
    { type: "input", inputType:"text", labelTitle:"Titulo de la Pagina", name: "", placeholder: "Titulo de la Pagina", value: "", position: "left", size: "sm", border: "bordered"}, 
    { type: "input", inputType:"text", labelTitle:"Meta Keywords", name: "", placeholder: "", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "input", inputType:"text", labelTitle:"Meta descripción", name: "", placeholder: "", value: "", position: "left", size: "sm", border: "bordered"},

    { type: "divider", dividerType: "horizontal", text: "Historia de procesos", containerStyle: "my-1"},

];


const PedidosItems = [
    { type: "input", inputType:"text", labelTitle:"", name: "", placeholder: "Nombre", value: "", position: "left", size: "sm", border: "bordered"},  
];

const DocumentacionItems = [
    { type: "input", inputType:"text", labelTitle:"", name: "", placeholder: "Nombre", value: "", position: "left", size: "sm", border: "bordered"},  
];

const OpcionesAdicItems = [
    { type: "select", name: "", placeholder: "Opción", value: "", position: "left", size: "sm", border: "bordered", options: [
        { name: "Color Polipiel (Polipiel paratapizar - Ergonatur) (156)", value: "" }, 
        { name: "Color Tejido (Accesorios y Montaje) (161)", value: "" }, 
        { name: "Numero de Cajeados (Numero de Cajeados - Ergonatur) (164)", value: "" },
      ]
    },  
    { type: "select", name: "", placeholder: "Valor de la opción", value: "", position: "left", size: "sm", border: "bordered", options: [
        { name: "2 Cajeados (2708)", value: "" }, 
        { name: "1 Cajeado Derecha (2706)", value: "" }, 
        { name: "1 Cajeado Izquierda (2707)", value: "" },
      ]
    }, 
    { type: "input", inputType:"text", labelTitle:"", name: "", placeholder: "Valor de la opcioón", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "select", name: "level", placeholder: "Proveedor", value: "", position: "left", size: "sm", border: "bordered", options: [
        { name: "Ergonatur Home S.L.", value: "" }, 
        { name: "Textiles Inducam S.L.", value: "" }, 
        { name: "Expafol S.L.", value: "" },
        { name: "Distrigal S.L.", value: "" },
        { name: "Ergonatur Diver", value: "" },
        
      ]
    },
    { type: "input", inputType:"text", labelTitle:"Precio", name: "", placeholder: "Precio", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "input", inputType:"text", labelTitle:"Oferta", name: "", placeholder: "Oferta", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "input", inputType:"text", labelTitle:"Coste", name: "", placeholder: "Coste", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "input", inputType:"text", labelTitle:"Punto", name: "", placeholder: "Punto", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "input", inputType:"text", labelTitle:"Valor", name: "", placeholder: "Valor", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "input", inputType:"text", labelTitle:"Quita", name: "", placeholder: "Quita", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "input", inputType:"text", labelTitle:"Ancho", name: "", placeholder: "Ancho", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "input", inputType:"text", labelTitle:"Largo", name: "", placeholder: "Largo", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "input", inputType:"text", labelTitle:"Alto", name: "", placeholder: "Alto", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "input", inputType:"text", labelTitle:"Peso", name: "", placeholder: "Peso", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "input", inputType:"text", labelTitle:"Bultos", name: "", placeholder: "Bultos", value: "", position: "left", size: "sm", border: "bordered"},
    
    { type: "checkbox", name: "", labelTitle: "PVP IVA", value: true, position: "left", size: "sm"},
    { type: "checkbox", name: "", labelTitle: "PCP IVA", value: true, position: "left", size: "sm"},
    { type: "checkbox", name: "", labelTitle: "LISTADO", value: true, position: "left", size: "sm"},
    { type: "checkbox", name: "", labelTitle: "SELECTOR", value: true, position: "left", size: "sm"},
    { type: "checkbox", name: "", labelTitle: "SIDEBAR", value: true, position: "left", size: "sm"},

];

const ProveedoresItems = [
    { type: "select", name: "level", labelTitle: "Proveedor", value: "", position: "left", size: "sm", border: "bordered", options: [
        { name: "Ergonatur Home S.L.", value: "" }, 
        { name: "Textiles Inducam S.L.", value: "" }, 
        { name: "Expafol S.L.", value: "" },
        { name: "Distrigal S.L.", value: "" },
        { name: "Ergonatur Diver", value: "" },
      ]
    },
    { type: "input", inputType:"text", labelTitle:"", name: "", placeholder: "Denominación para producto", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "toggle", name: "", labelTitle: "Principal", value: true, position: "left", size: "sm"},
    { type: "select", name: "level", labelTitle: "Elija un proveedor", value: "", position: "left", size: "sm", border: "bordered", options: [
        { name: "Viorel Florian", value: "" }, 
        { name: "Unitres Maderas S.L.", value: "" }, 
        { name: "Textiles Inducam S.L.", value: "" },
        { name: "Tas Creaciones S.L.", value: "" },
        { name: "Comotex S.L.", value: "" },        
      ]
    },
    { type: "input", inputType:"text", labelTitle:"", name: "", placeholder: "Denominación para producto", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "toggle", name: "", labelTitle: "Asignado", value: true, position: "left", size: "sm"}, 
];

const AtributosItems = [
    { type: "input", inputType:"text", labelTitle:"", name: "", placeholder: "Nombre", value: "", position: "left", size: "sm", border: "bordered"},  
];

const RelacionadoItems = [
    { type: "toggle", name: "is_company", placeholder: "Es Empresa", value: true, position: "left", size: "sm"},
      { type: "checkbox", name: "", placeholder: "Es Empresa", value: true, position: "left", size: "sm"},
      { type: "file", inputType:"file", name: "", placeholder: "Nombre", value: "", position: "left", size: "sm", border: "bordered"},
    { type: "input", inputType:"text", labelTitle:"", name: "", placeholder: "Nombre", value: "", position: "left", size: "sm", border: "bordered"},  
];

const EtiquetasItems = [
      
    { type: "select", name: "level", placeholder: "Pasar Valores", value: "", position: "left", size: "sm", border: "bordered", options: [
        { name: "3-Fondo Baúl 42 cms - Categoria 24", value: "" }, 
        { name: "530-15 Colores y combinaciones - Cabecero Raissa 2.", value: "" }, 
        { name: "552-Caracteristicas - Cabecerp Vasilis 2-9-396", value: "" },
            
      ]
    },

];

function InternalPage(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title : "Productos"}));
    }, [dispatch]);

    const icons = [
        { icon: EyeIcon, message: 'Habilitar producto' },
        { icon: GrClone, message: 'Clonar producto' },
        { icon: TrashIcon, message: 'Eliminar producto' },
    ];

    return(
        <EntityList 
            entityName="products"
            dbName="lawebes"
            entityTitles={["Id", "Productos", "Precio", "Oferta"]}
            entityMinTitles={["Id", "Productos"]}
            fields="id, name, price, offer"
            fieldsMin="id, name"
            interval={50}
            sort="id"
            sortOrder="asc"
            icons={icons}
            widthMain = "2/5"
            widthPanel = "3/5"
            panels = {[
                {fields: DetallesItems, title: "Detalles"},
                {fields: ImagenesItems, title: "Imágenes"},
                {fields: PedidosItems, title: "Pedidos"},
                {fields: DocumentacionItems, title: "Documentación"},
                {fields: ProveedoresItems, title: "Proveedores"},
                {fields: OpcionesAdicItems, title: "Opciones"},
                {fields: EtiquetasItems, title: "Etiquetas"},
                {fields: AtributosItems, title: "Atributos"},
                {fields: RelacionadoItems, title: "Relacionar"},
            ]}

        />
    );
}

export default InternalPage;
