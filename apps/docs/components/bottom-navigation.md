# BottomNavigation

<script setup>
import { ref } from 'vue'
import { BottomNavigation, BottomNavigationAction } from 'fvue-ui-lib'
const v = ref('home')
const items = [
  { value: 'home', label: 'Home' },
  { value: 'search', label: 'Search' },
]
</script>

<BottomNavigation>
  <BottomNavigationAction v-model="v" v-slot="{ active, select }">
    <div class="demo-row">
      <button
        v-for="i in items"
        :key="i.value"
        type="button"
        class="fvue-btn fvue-btn--32"
        :class="active === i.value ? 'fvue-btn--primary' : 'fvue-btn--tertiary'"
        :aria-current="active === i.value ? 'page' : undefined"
        @click="select(i.value)"
      >
        {{ i.label }}
      </button>
    </div>
  </BottomNavigationAction>
</BottomNavigation>

<p>Active: {{ v }}</p>
