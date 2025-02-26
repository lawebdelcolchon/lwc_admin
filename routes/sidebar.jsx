/** Icons are imported separatly to reduce build time */
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'
import ClipboardIcon from '@heroicons/react/24/outline/ClipboardIcon'
import ClipboardDocumentIcon from '@heroicons/react/24/outline/ClipboardDocumentIcon'
import ClipboardDocumentCheckIcon from '@heroicons/react/24/outline/ClipboardDocumentCheckIcon'
import ClipboardDocumentListIcon from '@heroicons/react/24/outline/ClipboardDocumentListIcon'
import CurrencyEuroIcon from '@heroicons/react/24/outline/CurrencyEuroIcon'
import ReceiptRefundIcon from '@heroicons/react/24/outline/ReceiptRefundIcon'
import ReceiptPercentIcon from '@heroicons/react/24/outline/ReceiptPercentIcon'
import ArchiveBoxXMarkIcon from '@heroicons/react/24/outline/ArchiveBoxXMarkIcon'
import TagIcon from '@heroicons/react/24/outline/TagIcon'
import PaperClipIcon from '@heroicons/react/24/outline/PaperClipIcon'
import BuildingLibraryIcon from '@heroicons/react/24/outline/BuildingLibraryIcon'
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import BuildingStorefrontIcon from '@heroicons/react/24/outline/BuildingStorefrontIcon'
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiOutlineTruck } from "react-icons/hi2";
import { HiOutlinePhone } from "react-icons/hi2";
import { FaAmazon } from "react-icons/fa";
import { SiCarrefour } from "react-icons/si";
import { LiaAmazonPay } from "react-icons/lia";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoExitOutline } from "react-icons/io5";
import { GrClearOption } from "react-icons/gr";
import { LuArchiveRestore } from "react-icons/lu";
import { LiaShippingFastSolid } from "react-icons/lia";
import { BsTruckFront } from "react-icons/bs";
import { TbHomeMove } from "react-icons/tb";
import { TbCategory2 } from "react-icons/tb";

const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [

  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'Dashboard',
  },
  {
    path: '', //no url needed as this has submenu
    icon: <ClipboardIcon className={`${iconClasses} inline` }/>, 
    name: 'Pedidos Clientes', 
    submenu : [
      {
        path: '/app/orders',
        icon: <ClipboardDocumentListIcon className={submenuIconClasses}/>,
        name: 'Pedidos',
      },
      {
        path: '/app/invoices',
        icon: <CurrencyEuroIcon className={submenuIconClasses}/>, 
        name: 'Facturas', 
      },
      {
        path: '/app/orders_return', //url
        icon: <ReceiptRefundIcon className={submenuIconClasses}/>, 
        name: 'Devoluciones', 
      },
      {
        path: '/app/invoices_return', //url
        icon: <ReceiptPercentIcon className={submenuIconClasses}/>, 
        name: 'Rectificaciones', 
      },
      {
        path: '/app/orders_canceled', //url
        icon: <ArchiveBoxXMarkIcon className={submenuIconClasses}/>, 
        name: 'Cancelaciones', 
      },
      {
        path: '/app/orders_budgets', //url
        icon: <HiOutlineDocumentReport className={submenuIconClasses}/>, 
        name: 'Presupuestos', 
      },
      {
        path: '/app/orders_pending', //url
        icon: <ClipboardDocumentCheckIcon className={submenuIconClasses}/>, 
        name: 'Comprobaciones', 
      },
      {
        path: '/app/list_amazon', //url
        icon: <FaAmazon className={submenuIconClasses}/>, 
        name: 'Amazon', 
      },
      {
        path: '/app/blank', //url
        icon: <LiaAmazonPay className={submenuIconClasses}/>, 
        name: 'AMZ Seller Flex', 
      },
    ]
  },
  {
    path: '', //no url needed as this has submenu
    icon: <ClipboardDocumentIcon className={`${iconClasses} inline` }/>, 
    name: 'Pedidos Proveedores', 
    submenu : [
      {
        path: '/app/ordering',
        icon: <ClipboardDocumentListIcon className={submenuIconClasses}/>, 
        name: 'Pedidos', 
      },
      {
        path: '/app/ordering_return', 
        icon: <ReceiptRefundIcon className={submenuIconClasses}/>, 
        name: 'Devoluciones', 
      },
      {
        path: '/app/ordering_replacements', 
        icon: <LuArchiveRestore className={submenuIconClasses}/>, 
        name: 'Reposiciones', 
      },
      {
        path: '/app/ordering_outputs', 
        icon: <IoExitOutline className={submenuIconClasses}/>, 
        name: 'Salidas Almacén', 
      },
      {
        path: '/app/blank', 
        icon: <BuildingLibraryIcon className={submenuIconClasses}/>, 
        name: 'Stock Proveedores', 
      },
      {
        path: '/app/blank', 
        icon: <LiaShippingFastSolid className={submenuIconClasses}/>, 
        name: 'Envíos Prev.', 
      },
      {
        path: '/app/blank', 
        icon: <BsTruckFront className={submenuIconClasses}/>, 
        name: 'Envíos Prev. Usuario', 
      },
      {
        path: '/app/blank', 
        icon: <TbHomeMove className={submenuIconClasses}/>, 
        name: 'Movimientos Stock', 
      },
      {
        path: '/app/blank', 
        icon: <ClipboardDocumentCheckIcon className={submenuIconClasses}/>, 
        name: 'Comprobaciones', 
      },
    ]
  },
  ,
  {
    path: '', //no url needed as this has submenu
    icon: <BuildingStorefrontIcon className={`${iconClasses} inline` }/>, 
    name: 'Marketplaces', 
    submenu : [
      {
        path: '/app/amazon_invoices', 
        icon: <FaAmazon className={submenuIconClasses}/>, 
        name: 'Amazon Transacciones', 
      },
      {
        path: '/app/amazon_orders', 
        icon: <FaAmazon className={submenuIconClasses}/>, 
        name: 'Amazon Movimientos', 
      },
      {
        path: '/app/carrefour_invoices', 
        icon: <SiCarrefour className={submenuIconClasses}/>, 
        name: 'Carrefour Facturas', 
      },
      {
        path: '/app/carrefour_orders', 
        icon: <SiCarrefour className={submenuIconClasses}/>, 
        name: 'Carrefour Movimientos', 
      },

    ]
  },  
  {
    path: '', //no url needed as this has submenu
    icon: <HiOutlineClipboardDocumentList className={`${iconClasses} inline` }/>, 
    name: 'Inventario', 
    submenu : [
      {
        path: '/app/categories', 
        icon: <TbCategory2 className={submenuIconClasses}/>, 
        name: 'Categorías', 
      },
      {
        path: '/app/settings-team', 
        icon: <PaperClipIcon className={submenuIconClasses}/>, 
        name: 'Atributos', 
      },
      {
        path: '/app/settings-team', 
        icon: <GrClearOption className={submenuIconClasses}/>, 
        name: 'Opcionales', 
      },
    ]
  },  
  {
    path: '/app/products', 
    icon: <InboxArrowDownIcon className={iconClasses}/>, 
    name: 'Productos', 
  },
  {
    path: '/app/clients', 
    icon: <HiOutlineUser className={iconClasses}/>,
    name: 'Clientes', 
  },
  {
    path: '/app/suppliers', 
    icon: <HiOutlineUserGroup className={iconClasses}/>, 
    name: 'Proveedores', 
  },
  {
    path: '/app/affiliates_accounts', 
    icon: <HiOutlineUsers className={iconClasses}/>,
    name: 'Afiliados', 
  },
  {
    path: '/app/carriers', 
    icon: <HiOutlineTruck className={iconClasses}/>,
    name: 'Transportistas', 
  },
  {
    path: '/app/contacts', 
    icon: <HiOutlinePhone className={iconClasses}/>,
    name: 'Contactos', 
  },
  {
    path: '/app/attr_tags', 
    icon: <TagIcon className={submenuIconClasses}/>, 
    name: 'Etiquetas', 
  },
]

export default routes


