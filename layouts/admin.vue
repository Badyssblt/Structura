<script setup lang="ts">

import {SidebarInset, SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "~/components/ui/breadcrumb";
import AppSidebar from "~/components/AppSidebar.vue";
import {Separator} from "~/components/ui/separator";

const route = useRoute()
const breadcrumb = computed(() => route.meta.breadcrumbs || [])



</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger class="-ml-1" />
        <Separator
            orientation="vertical"
            class="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <template v-for="(item, index) in breadcrumb" :key="index">
              <BreadcrumbItem v-if="index !== breadcrumb.length - 1">
                <BreadcrumbLink :href="item.path">{{ item.label }}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator v-if="index !== breadcrumb.length - 1" />
              <BreadcrumbItem v-else>
                <BreadcrumbPage>{{ item.label }}</BreadcrumbPage>
              </BreadcrumbItem>
            </template>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div class="p-4">
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<style scoped>

</style>