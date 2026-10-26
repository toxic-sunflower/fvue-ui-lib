# Accordion

<script setup>
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'fvue-ui-lib'
</script>

<Accordion type="single" collapsible defaultValue="a">
  <AccordionItem value="a">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="b">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>Content 2</AccordionContent>
  </AccordionItem>
</Accordion>
