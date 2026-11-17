<script setup lang="ts">
defineProps<{ separation: number; active: number }>();
const layers = [4, 3, 2, 1, 0];
const topColors = ['#c6c4b8', '#a5ad9c', '#677c63', '#aaa99b', '#b9b5a6'];
</script>
<template>
  <svg class="pipeline-fallback" viewBox="0 0 740 650" aria-hidden="true">
    <defs>
      <filter id="layer-shadow" x="-50%" y="-50%" width="200%" height="250%"><feDropShadow dx="10" dy="18" stdDeviation="12" flood-color="#070c08" flood-opacity=".3" /></filter>
      <radialGradient id="floor-shadow"><stop stop-color="#111712" stop-opacity=".65"/><stop offset="1" stop-color="#111712" stop-opacity="0"/></radialGradient>
    </defs>
    <ellipse cx="373" cy="560" rx="230" ry="70" fill="url(#floor-shadow)" />
    <g v-for="i in layers" :key="i" :data-layer="i" :transform="`translate(${370+(2-i)*separation*12},${325+(i-2)*(21+separation*77)})`" filter="url(#layer-shadow)">
      <path d="M-180 0 5 80 185 3 185 20 5 99 -180 18Z" fill="#747b6a" />
      <path d="M5 80 185 3 185 20 5 99Z" fill="#525c4e" />
      <path d="M-180 0 -5 -77 185 3 5 80Z" :fill="topColors[i]" :stroke="active === i ? '#e1e7d4' : '#c5c5b280'" stroke-width="1.2" />
      <path d="M-160 0 -5 -65 163 3 5 67Z" fill="none" stroke="#e4e3cd" stroke-opacity=".22" />
      <g v-if="i === 0" fill="#e3e0cf" stroke="#8e9581" stroke-width="1">
        <path v-for="n in 9" :key="n" :transform="`translate(${((n-1)%3)*43-Math.floor((n-1)/3)*43},${Math.floor((n-1)/3)*19+((n-1)%3)*18-46})`" d="M-32 0 0 -13 32 0 0 13Z" />
      </g>
      <g v-if="i === 1" fill="none" stroke="#e2e5d6" stroke-width="4" stroke-linejoin="round">
        <path d="M-110 -5 -16 -45 41 -21 -54 20Z M-62 18 32 -22 89 2 -6 43Z M-15 40 79 0 136 24 42 64Z"/>
      </g>
      <g v-if="i === 2">
        <path d="M-73 -3 0 -35 78 0 3 32 3 44 -73 9Z" fill="#374137"/><path d="M-73 -3 0 -35 78 0 3 32Z" fill="#a5b095" stroke="#c4cdb5"/>
        <path d="M-54 -3 0 -25 58 0 3 22Z" fill="#89977b"/>
        <g stroke="#d4d7c1" fill="none" stroke-width="1.6"><path d="M-80 -24 -113 -10 -140 -21 M-77 25 -115 9 -147 22 M-11 -43 -35 -53 -69 -39 M73 -25 105 -10 132 -22 M80 24 111 11 145 26 M13 45 36 55 67 42" /></g>
      </g>
      <g v-if="i === 3" fill="none" stroke="#d9ddcb" stroke-width="4">
        <path d="M-110 2 -65 -17 -40 -6 -10 -19 33 -1 71 -17 112 0" />
        <path d="M-97 17 -40 41 37 8 101 36" stroke-width="2" opacity=".5"/>
      </g>
      <g v-if="i === 4">
        <g v-for="n in 3" :key="n" :transform="`translate(${(n-2)*67},${(n-2)*28})`"><path d="M-39 0 6 -19 41 -4 41 12 -4 31 -39 16Z" fill="#66705c"/><path d="M-39 0 6 -19 41 -4 -4 15Z" fill="#d0cdbd" stroke="#e5e2d4"/><path d="M-28 4 -1 16 29 3" fill="none" stroke="#8d9a7a" stroke-width="3"/></g>
      </g>
      <circle cx="-152" cy="1" r="3" fill="#626b59"/><circle cx="157" cy="3" r="3" fill="#626b59"/>
    </g>
  </svg>
</template>
