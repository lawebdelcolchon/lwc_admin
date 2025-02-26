// src/contexts/EmpresaContext.js
import { createContext, useContext, useState } from 'react';

const EmpresaContext = createContext();

export const EmpresaProvider = ({ children }) => {
  const [empresa, setEmpresa] = useState("lawebdelcolchon.es");

  return (
    <EmpresaContext.Provider value={{ empresa, setEmpresa }}>
      {children}
    </EmpresaContext.Provider>
  );
};

// Hook para usar el contexto de forma más cómoda
export const useEmpresa = () => useContext(EmpresaContext);