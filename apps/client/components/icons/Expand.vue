<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <g
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="2"
    >
      <path
        stroke-dasharray="10"
        stroke-dashoffset="10"
        d="M17 9L20 12L17 15"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.6s"
          dur="0.2s"
          values="10;0"
        />
      </path>
      <path
        stroke-dasharray="16"
        stroke-dashoffset="16"
        d="M5 5H19"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.2s"
          values="16;0"
        />
      </path>
      <path
        stroke-dasharray="12"
        stroke-dashoffset="12"
        d="M5 12H14"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.2s"
          dur="0.2s"
          values="12;0"
        />
      </path>
      <path
        stroke-dasharray="16"
        stroke-dashoffset="16"
        d="M5 19H19"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.4s"
          dur="0.2s"
          values="16;0"
        />
      </path>
    </g>
  </svg>
</template>

<script setup lang="ts"></script>
