import { piniaIndexedDBPlugin } from './plugins/persistence'

const pinia = createPinia()
pinia.use(piniaIndexedDBPlugin)

export default pinia
