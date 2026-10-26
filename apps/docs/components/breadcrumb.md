# Breadcrumb

<script setup>
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from 'fvue-ui-lib'
</script>

<Breadcrumb>
  <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem><BreadcrumbLink href="#">Library</BreadcrumbLink></BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem><BreadcrumbPage>Data</BreadcrumbPage></BreadcrumbItem>
</Breadcrumb>
