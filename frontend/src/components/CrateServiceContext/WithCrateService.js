import React, {createContext, useContext} from "react";

import CrateService from "../../services/crate";

const CrateServiceContext = createContext(CrateService)

const WithCrateService = (props) => {

    const crateService = useContext(CrateServiceContext)

    return (
        <CrateServiceContext.Provider value={props.crateService || crateService}>
            {props.children}
        </CrateServiceContext.Provider>
    );
}

export { CrateServiceContext, WithCrateService }
