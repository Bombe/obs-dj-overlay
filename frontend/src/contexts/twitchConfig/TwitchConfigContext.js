import { createContext } from 'react'

import config from '../../utils/config'

const TwitchConfigContext = createContext(config)

const WithTwitchConfig = (props) => {
    const configToProvide = props.twitchConfig || config

    return <TwitchConfigContext.Provider value={configToProvide}>{props.children}</TwitchConfigContext.Provider>
}

export { TwitchConfigContext, WithTwitchConfig }
