<template>
  <div>
    <!-- Modal -->
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <p>{{ message }}</p>
        <div class="modal-footer">
          <button class="btn" @click="closeModal">Close</button>
          <button v-if="actionButtonText" class="btn" @click="handleAction">{{ actionButtonText }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'GlobalModal',
  setup() {
    const isVisible = ref(false);
    const message = ref('');
    const actionButtonText = ref('');
    const actionCallback = ref(null);

    const showModal = (msg, actionText = '', actionFunc = null) => {
      message.value = msg;
      actionButtonText.value = actionText;
      actionCallback.value = actionFunc;
      isVisible.value = true;
    };

    const closeModal = () => {
      isVisible.value = false;
      actionButtonText.value = ''; // Reset action button
    };

    const handleAction = () => {
      if (actionCallback.value) {
        actionCallback.value();
      }
      closeModal(); // Close modal after action
    };

    return {
      isVisible,
      message,
      actionButtonText,
      showModal,
      closeModal,
      handleAction,
    };
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it overlays above other content */
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px; /* Or any width you want */
}

.modal-title {
  margin-bottom: 10px;
}

.btn {
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff; /* Primary button color */
  color: white;
}

.btn:hover {
  background-color: #0056b3; /* Darker shade on hover */
}
</style>
