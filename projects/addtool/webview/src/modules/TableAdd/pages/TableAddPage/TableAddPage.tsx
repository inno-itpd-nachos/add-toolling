import { useMemo, useEffect } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table'
import { v4 as uuidv4 } from 'uuid'
import { useStore } from 'store'
import { PromptModal } from 'components/modals/PromptModal'

interface TableRow {
  attributeId: string
  attributeName: string
}

const ADD_COMPONENT_MODAL_ID = 'add-component-modal'
const ADD_ATTRIBUTE_MODAL_ID = 'add-attribute-modal'

function TableAddPage() {
  const componentsRecord = useStore((state) => state.components)
  const attributesRecord = useStore((state) => state.attributes)
  const addComponent = useStore((state) => state.addComponent)
  const addAttribute = useStore((state) => state.addAttribute)
  const deleteComponent = useStore((state) => state.deleteComponent)
  const deleteAttribute = useStore((state) => state.deleteAttribute)
  const setCellValue = useStore((state) => state.setCellValue)
  const registerModal = useStore((state) => state.registerModal)
  const unregisterModal = useStore((state) => state.unregisterModal)
  const openModal = useStore((state) => state.openModal)

  // Register modals on mount
  useEffect(() => {
    registerModal(ADD_COMPONENT_MODAL_ID)
    registerModal(ADD_ATTRIBUTE_MODAL_ID)

    return () => {
      unregisterModal(ADD_COMPONENT_MODAL_ID)
      unregisterModal(ADD_ATTRIBUTE_MODAL_ID)
    }
  }, [registerModal, unregisterModal])

  // Convert Records to arrays for rendering
  const components = useMemo(() => {
    return Object.entries(componentsRecord).map(([id, name]) => ({ id, name }))
  }, [componentsRecord])

  const attributes = useMemo(() => {
    return Object.entries(attributesRecord).map(([id, name]) => ({ id, name }))
  }, [attributesRecord])

  const columnHelper = createColumnHelper<TableRow>()

  const columns = useMemo(() => {
    const cols: ColumnDef<TableRow>[] = [
      columnHelper.display({
        id: 'attribute-name',
        header: 'Attribute',
        cell: (info) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{info.row.original.attributeName}</span>
            <button
              onClick={() => deleteAttribute(info.row.original.attributeId)}
              style={{
                padding: '2px 6px',
                fontSize: '12px',
                cursor: 'pointer',
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
              }}
            >
              ×
            </button>
          </div>
        ),
        size: 200,
      }),
    ]

    // Add a column for each component
    components.forEach((component) => {
      cols.push(
        columnHelper.display({
          id: component.id,
          header: () => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{component.name}</span>
              <button
                onClick={() => deleteComponent(component.id)}
                style={{
                  padding: '2px 6px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                }}
              >
                ×
              </button>
            </div>
          ),
          cell: (info) => {
            const attributeId = info.row.original.attributeId

            return (
              <input
                type="number"
                onChange={(e) => {
                  const newValue = parseFloat(e.target.value)
                  if (!isNaN(newValue)) {
                    setCellValue(component.id, attributeId, newValue)
                  } else if (e.target.value === '') {
                    setCellValue(component.id, attributeId, 0)
                  }
                }}
                style={{
                  width: '100%',
                  padding: '4px 8px',
                  border: '1px solid #ccc',
                  borderRadius: '3px',
                }}
              />
            )
          },
          size: 150,
        })
      )
    })

    return cols
  }, [components, columnHelper, deleteComponent, deleteAttribute, setCellValue])

  const data = useMemo<TableRow[]>(() => {
    return attributes.map((attribute) => ({
      attributeId: attribute.id,
      attributeName: attribute.name,
    }))
  }, [attributes])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleAddComponent = () => {
    openModal(ADD_COMPONENT_MODAL_ID)
  }

  const handleAddAttribute = () => {
    openModal(ADD_ATTRIBUTE_MODAL_ID)
  }

  const handleComponentConfirm = (name: string) => {
    const id = uuidv4()
    addComponent(id, name)
  }

  const handleAttributeConfirm = (name: string) => {
    const id = uuidv4()
    addAttribute(id, name)
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button
          onClick={handleAddComponent}
          style={{
            padding: '8px 16px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          + Column (Component)
        </button>
        <button
          onClick={handleAddAttribute}
          style={{
            padding: '8px 16px',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          + Row (Attribute)
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            borderCollapse: 'collapse',
            width: '100%',
            border: '1px solid #ddd',
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      padding: '12px',
                      textAlign: 'left',
                      borderBottom: '2px solid #ddd',
                      background: '#f8f9fa2b',
                      fontWeight: 'bold',
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    padding: '20px',
                    textAlign: 'center',
                    color: '#666',
                  }}
                >
                  No data. Add components and attributes to get started.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={{
                        padding: '12px',
                        borderBottom: '1px solid #ddd',
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <PromptModal
        modalId={ADD_COMPONENT_MODAL_ID}
        title="Add Component"
        placeholder="Enter component name"
        onConfirm={handleComponentConfirm}
      />

      <PromptModal
        modalId={ADD_ATTRIBUTE_MODAL_ID}
        title="Add Attribute"
        placeholder="Enter attribute name"
        onConfirm={handleAttributeConfirm}
      />
    </div>
  )
}

export default TableAddPage
