import {render} from '@testing-library/react'

import WithOverlayService from '../../../contexts/overlayService'
import WithTrack from '../../../contexts/track'
import {AdminSection} from './AdminSection'

describe('The admin section', () => {

    it('should render', () => {
        render(<WithTrack><WithOverlayService><AdminSection/></WithOverlayService></WithTrack>)
    })

})
