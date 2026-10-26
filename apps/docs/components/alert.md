# Alert

<script setup>
import { Alert } from 'fvue-ui-lib'
</script>

<div style="display: flex; flex-direction: column; gap: 8px; max-width: 480px;">
  <Alert variant="info" title="Heads up">This is an informational message.</Alert>
  <Alert variant="success" title="Done">Saved successfully.</Alert>
  <Alert variant="warning" title="Careful">Check this before continuing.</Alert>
  <Alert variant="error" title="Failed" closable>Something went wrong.</Alert>
</div>
