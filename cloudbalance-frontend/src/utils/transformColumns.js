// transformColumns.js
import { flexRender } from "@tanstack/react-table";

export const transformToTanstackColumns = (config) => {
  return config.map((col) => ({
    accessorKey: col.field,
    header: col.name,
    cell: (info) => flexRender(info.column.columnDef.cell, info),
  }));
};
