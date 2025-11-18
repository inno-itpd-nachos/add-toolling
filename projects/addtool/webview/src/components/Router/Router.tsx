import { useStore } from "store"
import { protector } from "utils/protector"
import UmlComponentPage from "modules/UmlComponent/pages/UmlComponentPage/UmlComponentPage"
import TableAddPage from "modules/TableAdd/pages/TableAddPage/TableAddPage"


export const Router = () => {
  const currentTab = useStore(store => store.currentTab)

  switch(currentTab) {
    case 'uml_component':
      return <UmlComponentPage />
    case 'table_add':
      return <TableAddPage />
    default:
      protector(currentTab)
      return null
  }
}
