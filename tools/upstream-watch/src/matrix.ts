import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Snapshot } from './snapshot'

const here = dirname(fileURLToPath(import.meta.url))
const toolRoot = resolve(here, '..')
const repoRoot = resolve(toolRoot, '../..')

export const PORT_BASELINE = '3.43.0'

const ROOTS = [
  'AiButton', 'Button', 'ButtonIconGroup', 'ButtonStack', 'FloatingActionButton', 'IconButton', 'Link', 'SubscribeButton', 'SwitchButton',
  'Autocomplete', 'Checkbox', 'DatePicker', 'InlineEdit', 'PasswordField', 'PhoneField', 'Radio', 'RadioGroup', 'SearchField', 'Select', 'Slider', 'Switch', 'SwitchField', 'SwitchToggle', 'TextArea', 'TextField',
  'Dialog', 'Drawer', 'DropdownMenu', 'Tooltip',
  'BottomNavigation', 'Breadcrumb', 'MobileStepper', 'PageSelector', 'Pagination', 'SegmentedControl', 'Stepper', 'Tabs',
  'Accordion', 'AnimatedNumber', 'Chip', 'Count', 'CyclingText', 'Demographics', 'Pill', 'RatingSummary', 'Table', 'TrendPill',
  'AiDisclosureBadge', 'AiDisclosureLabel', 'Alert', 'Badge', 'Banner', 'CriticalBanner', 'EmptyState', 'InfoBox', 'Loader', 'ProgressBar', 'Skeleton', 'Snackbar', 'Toast',
  'Card', 'Divider',
  'AudioPlayer', 'AudioRecordButton', 'AudioUpload', 'MediaStatusIndicator', 'VoiceNote',
  'Avatar', 'ChatEmbed', 'ChatInput', 'ChatMessage', 'CreatorCard', 'CreatorCover', 'CreatorTile', 'FanFollowerCount', 'LiveStatus', 'OnlineBlinkingIcon', 'ProfileOnlineStatus', 'ProfileStatus', 'ReviewCard', 'UserDisplayName', 'UserHandle', 'UserItem',
  'Chart', 'CountryFlag',
]

interface MappingEntry {
  port: string
  file: string
  status: 'done' | 'stub' | 'missing'
}

export function buildMatrix(snapshotVersion?: string): void {
  const snaps = readdirSync(resolve(toolRoot, 'snapshots')).filter((f) => f.endsWith('.json') && !f.startsWith('diff-')).sort()
  const ver = snapshotVersion ?? snaps[snaps.length - 1]?.replace('.json', '')
  if (!ver) throw new Error('no snapshots found')
  const snap: Snapshot = JSON.parse(readFileSync(resolve(toolRoot, `snapshots/${ver}.json`), 'utf8'))
  const mapping: Record<string, MappingEntry> = JSON.parse(readFileSync(resolve(toolRoot, 'mapping.json'), 'utf8'))
  const allExports = new Set(Object.values(snap.entrypoints).flatMap((list) => list.map((e) => e.name)))

  const rows = ROOTS.map((name) => {
    const inUpstream = allExports.has(name) || (name === 'Chart' ? allExports.has('ChartContainer') : false) || (name === 'CountryFlag' ? allExports.has('CountryFlag') : false)
    const m = mapping[name]
    const fileOk = m ? existsSync(resolve(repoRoot, 'packages/ui', m.file)) : false
    const status = !inUpstream ? 'removed-upstream' : m && fileOk ? m.status : 'missing'
    return { original: name, port: m?.port ?? '—', status, lag: status === 'done' ? PORT_BASELINE : '—' }
  })

  const done = rows.filter((r) => r.status === 'done').length
  const matrix = { version: ver, portBaseline: PORT_BASELINE, done, total: rows.length, rows }
  writeFileSync(resolve(toolRoot, 'matrix.json'), JSON.stringify(matrix, null, 2))
  const md = [
    `# correspondence matrix (upstream ${ver} → port baseline ${PORT_BASELINE})`,
    '',
    `Done: **${done}/${rows.length}** root components. Icons: ${snap.icons.static.length} static / ${snap.icons.animated.length} animated (Stage 4). Flags: ${snap.flags.length} (Stage 4).`,
    '',
    '| Original | Port | Status | Lag |',
    '|---|---|---|---|',
    ...rows.map((r) => `| ${r.original} | ${r.port} | ${r.status} | ${r.lag} |`),
    '',
  ].join('\n')
  writeFileSync(resolve(toolRoot, 'matrix.md'), md)
  console.log(`matrix: ${done}/${rows.length} done (upstream ${ver})`)
}
