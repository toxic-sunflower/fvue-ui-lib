# upstream diff 3.44.0 → 3.50.0

Changed items: 59

> [!WARNING]
> Possible breaking changes:
> - removed exports in index: TablePagination, TablePaginationLayout, TablePaginationProps, TableRowsPerPageSelect, TableRowsPerPageSelectProps
> - removed props in index:CreatorCard: description, actions
> - changed prop types in index:CreatorCard: name
> - removed props in index:CreatorCardProps: description, actions
> - changed prop types in index:CreatorCardProps: name
> - changed prop types in index:DialogContent: size
> - changed prop types in index:DialogContentProps: size

## added exports (index): +29
+ BookmarkIcon
+ BookmarkIconProps
+ DialogContentSize
+ EmptyStateTitleAs
+ MediaPlayChip
+ MediaPlayChipProps
+ SkeletonRadius
+ SpinnerIconProps
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

## changed props/types: 21
### index:BaseIconProps
+ prop spin
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
### index:DialogContent
~ prop size: `"sm" | "md" | "lg"` → `DialogContentSize`
### index:DialogContentProps
~ prop size: `"sm" | "md" | "lg"` → `DialogContentSize`
### index:EmptyState
+ prop titleAs
### index:EmptyStateProps
+ prop titleAs
### index:IconButtonVariant
### index:LinkSize
### index:LinkVariant
### index:Skeleton
+ prop radius
### index:SkeletonProps
+ prop radius
### index:SpinnerIcon
+ prop size
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
### animated-icons:AnimatedIconProps
+ prop spin

## tokens: +1 −0 ~0
+ --color-surface-table-row

## icons: +1 −0
+ BookmarkIcon

