# upstream diff 3.44.0 → 3.51.0

Changed items: 76

> [!WARNING]
> Possible breaking changes:
> - removed exports in index: TablePagination, TablePaginationLayout, TablePaginationProps, TableRowsPerPageSelect, TableRowsPerPageSelectProps
> - removed props in index:CreatorCard: description, actions
> - changed prop types in index:CreatorCard: name
> - removed props in index:CreatorCardProps: description, actions
> - changed prop types in index:CreatorCardProps: name
> - changed prop types in index:DialogContent: size
> - changed prop types in index:DialogContentProps: size

## added exports (index): +35
+ BookmarkIcon
+ BookmarkIconProps
+ DialogContentSize
+ DocumentIcon
+ DocumentIconProps
+ EmptyStateTitleAs
+ EpisodesIcon
+ EpisodesIconProps
+ MediaPlayChip
+ MediaPlayChipProps
+ ShortsIcon
+ ShortsIconProps
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

## changed props/types: 26
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
### index:DrawerVariant
### index:DropdownMenuItem
+ prop trailingAction
### index:DropdownMenuItemProps
+ prop trailingAction
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
### charts:ChartCard
+ prop fullHeight
### charts:ChartCardProps
+ prop fullHeight
### animated-icons:AnimatedIconProps
+ prop spin

## tokens: +4 −0 ~0
+ --color-surface-table-row
+ --typography-body-default-16px-regular-font-weight
+ --typography-body-small-14px-regular-font-weight
+ --typography-description-12px-regular-font-weight

## icons: +4 −0
+ BookmarkIcon
+ DocumentIcon
+ EpisodesIcon
+ ShortsIcon

