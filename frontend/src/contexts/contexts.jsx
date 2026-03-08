import { createContext, useState } from "react";

// Distance context and wrapper provider
export const DistanceContext = createContext();
export const DistanceProvider = ({ children }) => {
    const [distance, setDistance] = useState(20)
    return (
        <DistanceContext.Provider value={{ distance, setDistance }}>
            {children}
        </DistanceContext.Provider>
    )
}

// Price context and price provider
export const PriceContext = createContext();
export const PriceProvider = ({ children }) => {
    const [price, setPrice] = useState(50)
    return (
        <PriceContext.Provider value={{ price, setPrice }}>
            {children}
        </PriceContext.Provider>
    )
}

// Type context and type provider
export const TypeContext = createContext();
export const TypeProvider = ({ children }) => {
    const [type, setType] = useState()
    return (
        <TypeContext.Provider value={{ type, setType }}>
            {children}
        </TypeContext.Provider>
    )
}
