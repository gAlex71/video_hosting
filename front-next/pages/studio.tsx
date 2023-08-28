import React from 'react'
import { NextPageAuth } from '@/providers/private-route.interface'
import Studio from '@/components/pages/studio/Studio'

const StudioPage: NextPageAuth = () => {
  return <Studio />
}

StudioPage.isOnlyUser = true

export default StudioPage