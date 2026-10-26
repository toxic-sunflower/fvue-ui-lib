# Tabs

<script setup>
import { ref } from 'vue'
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'fvue-ui-lib'
const v = ref('a')
</script>

<Tabs v-model="v">
  <TabsList>
    <TabsTrigger value="a">Tab A</TabsTrigger>
    <TabsTrigger value="b">Tab B</TabsTrigger>
  </TabsList>
  <TabsContent value="a">Content A</TabsContent>
  <TabsContent value="b">Content B</TabsContent>
</Tabs>

## Pill

<Tabs defaultValue="a">
  <TabsList variant="pill">
    <TabsTrigger value="a">One</TabsTrigger>
    <TabsTrigger value="b">Two</TabsTrigger>
  </TabsList>
  <TabsContent value="a">First</TabsContent>
  <TabsContent value="b">Second</TabsContent>
</Tabs>

<div class="demo-dark dark">
  <Tabs defaultValue="a">
    <TabsList>
      <TabsTrigger value="a">Tab A</TabsTrigger>
      <TabsTrigger value="b">Tab B</TabsTrigger>
    </TabsList>
    <TabsContent value="a">Content A</TabsContent>
    <TabsContent value="b">Content B</TabsContent>
  </Tabs>
</div>
