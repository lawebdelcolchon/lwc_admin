// src/routes/index.js

import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Suppliers = lazy(() => import('../pages/protected/Suppliers'));
const Clients = lazy(() => import('../pages/protected/Clients'));
const AffiliatesAccounts = lazy(() => import('../pages/protected/AffiliatesAccounts'));
const Carriers = lazy(() => import('../pages/protected/Carriers'));
const Contacts = lazy(() => import('../pages/protected/Contacts'));
const AttrTag = lazy(() => import('../pages/protected/AttrTag'));
const Products = lazy(() => import('../pages/protected/Products'));
const Orders = lazy(() => import('../pages/protected/PedidosClientes/Orders'));
const Invoices = lazy(() => import('../pages/protected/PedidosClientes/Invoices'));
const OrdersReturn = lazy(() => import('../pages/protected/PedidosClientes/OrdersReturn'));
const InvoicesReturn = lazy(() => import('../pages/protected/PedidosClientes/InvoicesReturn'));
const OrdersCancelled = lazy(() => import('../pages/protected/PedidosClientes/OrdersCanceled'));
const OrdersBudgets = lazy(() => import('../pages/protected/PedidosClientes/OrdersBudgets'));
const OrdersPending = lazy(() => import('../pages/protected/PedidosClientes/OrdersPending'));
const ListAmazon = lazy(() => import('../pages/protected/PedidosClientes/ListAmazon'));
const AmazonInvoices = lazy(() => import('../pages/protected/Marketplaces/ControlIAmazon'));
const AmazonOrders = lazy(() => import('../pages/protected/Marketplaces/ControlOAmazon'));
const CarrefourInvoices = lazy(() => import('../pages/protected/Marketplaces/ControlICarrefour'));
const CarrefourOrders = lazy(() => import('../pages/protected/Marketplaces/ControlOCarrefour'));
const Ordering = lazy(() => import('../pages/protected/PedidosProveedores/Ordering'));
const OrderingReturn = lazy(() => import('../pages/protected/PedidosProveedores/OrderingReturn'));
const OrderingReplacements = lazy(() => import('../pages/protected/PedidosProveedores/OrderingReplacements'));
const OrderingOutputs = lazy(() => import('../pages/protected/PedidosProveedores/OrderingOutputs'));
const Categories = lazy(() => import('../pages/protected/Categories'));

const routes = [
  {
    path: '/dashboard', 
    component: Dashboard, 
  },
  {
    path: '/suppliers',
    component: Suppliers,
  },
  {
    path: '/clients',
    component: Clients,
  },
  {
    path: '/affiliates_accounts',
    component: AffiliatesAccounts, 
  },
  {
    path: '/carriers',
    component: Carriers, 
  },
  {
    path: '/contacts',
    component: Contacts, 
  },
  {
    path: '/attr_tags',
    component: AttrTag, 
  },
  {
    path: '/products',
    component: Products, 
  },
  {
    path: '/orders',
    component: Orders, 
  },
  {
    path: '/invoices',
    component: Invoices, 
  },
  {
    path: '/orders_return',
    component: OrdersReturn, 
  },
  {
    path: '/invoices_return',
    component: InvoicesReturn, 
  },
  {
    path: '/orders_canceled',
    component: OrdersCancelled, 
  },
  {
    path: '/orders_budgets',
    component: OrdersBudgets, 
  },
  {
    path: '/orders_pending',
    component: OrdersPending, 
  },
  {
    path: '/list_amazon',
    component: ListAmazon, 
  },
  {
    path: '/amazon_invoices',
    component: AmazonInvoices, 
  },
  {
    path: '/amazon_orders',
    component: AmazonOrders, 
  },
  {
    path: '/carrefour_invoices',
    component: CarrefourInvoices, 
  },
  {
    path: '/carrefour_orders',
    component: CarrefourOrders, 
  },
  {
    path: '/ordering',
    component: Ordering, 
  },
  {
    path: '/ordering_return',
    component: OrderingReturn, 
  },
  {
    path: '/ordering_replacements',
    component: OrderingReplacements, 
  },
  {
    path: '/ordering_outputs',
    component: OrderingOutputs, 
  },
  {
    path: '/categories',
    component: Categories, 
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes

