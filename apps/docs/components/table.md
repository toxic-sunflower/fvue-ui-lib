# Table

<script setup>
import { Table, TableBody, TableCard, TableCell, TableHead, TableHeader, TableRow, TableToolbar } from 'fvue-ui-lib'
const rows = [
  { name: 'Ada', plan: 'Pro' },
  { name: 'Bob', plan: 'Free' },
]
</script>

<TableCard>
  <TableToolbar>Earnings</TableToolbar>
  <Table>
    <TableHeader>
      <TableHead>Name</TableHead>
      <TableHead>Plan</TableHead>
    </TableHeader>
    <TableBody>
      <TableRow v-for="r in rows" :key="r.name">
        <TableCell>{{ r.name }}</TableCell>
        <TableCell>{{ r.plan }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableCard>
