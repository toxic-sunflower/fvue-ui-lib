# Dialog

<script setup>
import { ref } from 'vue'
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter, DialogTrigger, DialogClose } from 'fvue-ui-lib'
const open = ref(false)
</script>

<div class="demo-row">
  <Dialog v-model:open="open">
    <DialogTrigger>
      <Button>Open dialog</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Team roles</DialogTitle>
        <DialogDescription>Assign roles to team members.</DialogDescription>
      </DialogHeader>
      <DialogBody>Dialog body text goes here.</DialogBody>
      <DialogFooter>
        <DialogClose>
          <Button variant="secondary">Cancel</Button>
        </DialogClose>
        <Button>Save</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</div>

Dialog renders through a portal to `document.body`; on mobile it becomes a bottom sheet.
