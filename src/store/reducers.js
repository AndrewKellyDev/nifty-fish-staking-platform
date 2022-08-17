import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

import application from './application/reducer'

const store = configureStore({
  reducer: {
    application,
  },
})

setupListeners(store.dispatch)

export default store
