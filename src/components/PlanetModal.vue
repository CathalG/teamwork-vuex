<template>
        <div class="modal-background">
            <div class="modal">
            <slot>
            </slot>
            <div class="close-modal" @click="close">x</div>
            </div>
        </div>
</template>

<script>
  export default {
    name: 'PlanetModal',
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<style>

.modal p {
    margin: 5px 0;
}

.modal-background{
  transition: all 0.2s ease-in-out;
  opacity: 0;
  pointer-events: none;
}

.modal-background.visible{
  opacity: 1;
  pointer-events: all;
}


.close-modal{
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    font-weight: 600;
    padding: 10px 15px;
    font-size: 18px;
}

.close-modal:hover{
  color: #ff1cb3;
}

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }

  .modal-background {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    /* min-height: 300px; */
    min-width: 300px;
    border-radius: 3px;
    box-shadow: none;
    padding: 20px 20px 40px 20px;
    position: relative;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
</style>