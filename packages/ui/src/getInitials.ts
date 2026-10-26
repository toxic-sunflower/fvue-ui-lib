export function getInitials(name: string, max = 2): string {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, max)
    .join('')
    .toUpperCase()
}
