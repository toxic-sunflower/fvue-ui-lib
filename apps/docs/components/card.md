# Card

<script setup>
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'fvue-ui-lib'
</script>

## Example

<div style="max-width: 360px;">
  <Card>
    <CardHeader>
      <CardTitle>Insights</CardTitle>
      <CardDescription>Last 30 days</CardDescription>
    </CardHeader>
    <CardContent>Revenue is up 12%.</CardContent>
    <CardFooter>
      <Button size="32">View all</Button>
    </CardFooter>
  </Card>
</div>

## Slots

`Card` also accepts `header`, `title`, `description`, `content` (default) and `footer` slots.
`title` renders as a styled heading, `description` as styled helper text — no `id` needed anywhere:

<div style="max-width: 360px;">
  <Card>
    <template #title>Insights</template>
    <template #description>Last 30 days</template>
    Revenue is up 12%.
  </Card>
</div>
