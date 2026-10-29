# upstream diff 3.44.0 → 3.45.0

Changed items: 2

> [!WARNING]
> Possible breaking changes:
> - removed props in index:CreatorCard: description, actions
> - changed prop types in index:CreatorCard: name
> - removed props in index:CreatorCardProps: description, actions
> - changed prop types in index:CreatorCardProps: name

## changed props/types: 2
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

