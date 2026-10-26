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
