import { Tooltip } from '@mui/material'
import { withStyles } from '@mui/styles'

const NoBorderTooltip = withStyles(() => ({
    tooltip: {
        maxWidth: '500px',
        backgroundColor: 'inherit',
        border: 'none',
    },
}))(Tooltip)

export {NoBorderTooltip as default}
