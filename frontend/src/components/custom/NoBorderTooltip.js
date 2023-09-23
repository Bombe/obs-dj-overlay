import {Tooltip, withStyles} from '@material-ui/core'

const NoBorderTooltip = withStyles(() => ({
    tooltip: {
        maxWidth: '500px',
        backgroundColor: 'inherit',
        border: 'none',
    },
}))(Tooltip)

export {NoBorderTooltip as default}
