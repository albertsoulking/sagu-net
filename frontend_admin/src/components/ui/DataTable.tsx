import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Button } from './Button'
import { EmptyState } from './EmptyState'

interface DataTableProps<T> {
  data: T[]
  // TanStack columns in one table can legitimately mix string/number/status value types.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[]
  searchPlaceholder?: string
  onSearch?: (value: string) => void
  onRowClick?: (row: T) => void
  isLoading?: boolean
  emptyTitle?: string
  tableClassName?: string
}

export function DataTable<T>({
  data,
  columns,
  searchPlaceholder = 'Search...',
  onSearch,
  onRowClick,
  isLoading,
  emptyTitle,
  tableClassName,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  const handleSearch = (v: string) => {
    setGlobalFilter(v)
    onSearch?.(v)
  }

  if (!isLoading && data.length === 0) {
    return <EmptyState title={emptyTitle} />
  }

  return (
    <span className="block w-full space-y-4">
      <span className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          placeholder={searchPlaceholder}
          value={globalFilter}
          onChange={(e) => handleSearch(e.target.value)}
          className="focus-glow h-10 w-full max-w-xs rounded-xl border border-slate-300 bg-white px-4 text-sm dark:border-slate-600 dark:bg-slate-800 sm:w-64"
        />
        <span className="text-sm text-slate-500">
          {table.getFilteredRowModel().rows.length} records
        </span>
      </span>

      <span className="block overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
        <table className={cn('w-full min-w-[640px] text-left text-sm', tableClassName)}>
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800/50">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="cursor-pointer px-4 py-3 font-medium hover:text-slate-900 dark:hover:text-slate-200"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {columns.map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <span className="block h-4 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                      </td>
                    ))}
                  </tr>
                ))
              : table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => onRowClick?.(row.original)}
                    className={cn(
                      'border-t border-slate-100 transition-colors hover:bg-slate-50/80 dark:border-slate-800 dark:hover:bg-slate-800/50',
                      onRowClick && 'cursor-pointer',
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </span>

      <span className="flex items-center justify-between">
        <span className="text-sm text-slate-500">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <span className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </span>
      </span>
    </span>
  )
}
