# upstream diff 3.44.0 → 3.46.0

Changed items: 26

> [!WARNING]
> Possible breaking changes:
> - removed exports in index: TablePagination, TablePaginationLayout, TablePaginationProps, TableRowsPerPageSelect, TableRowsPerPageSelectProps
> - removed props in index:CreatorCard: description, actions
> - changed prop types in index:CreatorCard: name
> - removed props in index:CreatorCardProps: description, actions
> - changed prop types in index:CreatorCardProps: name

## added exports (index): +12
+ BookmarkIcon
+ BookmarkIconProps
+ TableCardPagination
+ TableCardPaginationProps
+ TableMediaTile
+ TableMediaTileProps
+ TableToolbarAction
+ TableToolbarActionProps
+ TableToolbarButton
+ TableToolbarButtonProps
+ TableToolbarSearch
+ TableToolbarSearchProps

## removed exports (index): −5
− TablePagination
− TablePaginationLayout
− TablePaginationProps
− TableRowsPerPageSelect
− TableRowsPerPageSelectProps

## changed props/types: 7
### index:CreatorCard
+ prop pill
+ prop verified
+ prop verifiedLabel
+ prop tagline
+ prop content
+ prop action
− prop description
− prop actions
~ prop name: `string` → `React_2.ReactNode`
### index:CreatorCardProps
+ prop pill
+ prop verified
+ prop verifiedLabel
+ prop tagline
+ prop content
+ prop action
− prop description
− prop actions
~ prop name: `string` → `React_2.ReactNode`
### index:TableCell
+ prop nowrap
### index:TableCellProps
+ prop nowrap
### index:TableMediaThumbnailSize
### index:TableToolbar
+ prop search
### index:TableToolbarProps
+ prop search

## tokens: +1 −0 ~0
+ --color-surface-table-row

## icons: +1 −0
+ BookmarkIcon

