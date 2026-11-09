# upstream diff 3.44.0 → 3.49.0

Changed items: 48

> [!WARNING]
> Possible breaking changes:
> - removed exports in index: TablePagination, TablePaginationLayout, TablePaginationProps, TableRowsPerPageSelect, TableRowsPerPageSelectProps
> - removed props in index:CreatorCard: description, actions
> - changed prop types in index:CreatorCard: name
> - removed props in index:CreatorCardProps: description, actions
> - changed prop types in index:CreatorCardProps: name

## added exports (index): +26
+ BookmarkIcon
+ BookmarkIconProps
+ EmptyStateTitleAs
+ MediaPlayChip
+ MediaPlayChipProps
+ TableCardPagination
+ TableCardPaginationProps
+ TableMediaTile
+ TableMediaTileProps
+ TableRowButton
+ TableRowButtonProps
+ TableToolbarAction
+ TableToolbarActionProps
+ TableToolbarButton
+ TableToolbarButtonProps
+ TableToolbarSearch
+ TableToolbarSearchProps
+ TableTruncatedText
+ TableTruncatedTextProps
+ TabsListSkeleton
+ TabsListSkeletonProps
+ UndoAlertPrompt
+ UndoAlertPromptProps
+ UndoAlertPromptType
+ UserItemPadding
+ formatPlayChipDuration

## added exports (charts): +2
+ ChartGrid
+ ChartGridProps

## removed exports (index): −5
− TablePagination
− TablePaginationLayout
− TablePaginationProps
− TableRowsPerPageSelect
− TableRowsPerPageSelectProps

## changed props/types: 13
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
### index:EmptyState
+ prop titleAs
### index:EmptyStateProps
+ prop titleAs
### index:LinkSize
### index:LinkVariant
### index:TableCell
+ prop nowrap
### index:TableCellProps
+ prop nowrap
### index:TableMediaThumbnailSize
### index:TableToolbar
+ prop search
### index:TableToolbarProps
+ prop search
### index:UserItem
+ prop padding
### index:UserItemProps
+ prop padding

## tokens: +1 −0 ~0
+ --color-surface-table-row

## icons: +1 −0
+ BookmarkIcon

