import { lazy } from 'react'

const Layout = lazy(() => import('./Layout/Layout'))
const NewNoteForm = lazy(() => import('./NewNoteForm/NewNoteForm'))

const MasonryGrid = lazy(() => import('./MasonryGrid/MasonryGrid'))

export { Layout, NewNoteForm, MasonryGrid }
