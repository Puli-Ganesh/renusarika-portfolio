<script setup lang="ts">
import { ref } from 'vue';
import { navigation } from '../data/portfolio';
import { activeChapter } from '../composables/experienceState';
import ResumeLink from './ResumeLink.vue';
const dialog = ref<HTMLDialogElement>();
const menuButton = ref<HTMLButtonElement>();
const menuOpen = ref(false);
function openMenu() { dialog.value?.showModal(); menuOpen.value = true; }
function closeMenu() { dialog.value?.close(); menuOpen.value = false; menuButton.value?.focus(); }
function onClose() { menuOpen.value = false; menuButton.value?.focus(); }
function isActive(id: string) { return activeChapter.value === id || (id === 'projects' && activeChapter.value === 'pipeline'); }
</script>
<template>
  <header class="site-header">
    <a href="#hero" class="brand" aria-label="Renusarika — back to top"><span class="monogram">R<span>R</span><i></i></span><span class="brand-text">RENU<span>SARIKA</span></span></a>
    <nav class="desktop-navigation" aria-label="Main navigation"><a v-for="link in navigation" :key="link.id" :href="`#${link.id}`" :aria-current="isActive(link.id) ? 'location' : undefined">{{ link.label }}</a></nav>
    <div class="header-actions"><ResumeLink compact /><button ref="menuButton" class="menu-button" type="button" aria-controls="mobile-menu" :aria-expanded="menuOpen" aria-label="Open navigation" @click="openMenu"><span></span><span></span></button></div>
    <dialog id="mobile-menu" ref="dialog" class="mobile-menu" aria-label="Navigation" @close="onClose" @click="($event.target === dialog) && closeMenu()">
      <div class="mobile-menu-inner"><div class="menu-top"><span class="eyebrow">EXPLORE THE PORTFOLIO</span><button type="button" class="close-menu" aria-label="Close navigation" @click="closeMenu">×</button></div><nav aria-label="Mobile navigation"><a v-for="(link,index) in navigation" :key="link.id" :href="`#${link.id}`" @click="closeMenu"><span>0{{ index + 1 }}</span>{{ link.label }}<span>↗</span></a></nav><p>From intelligent decisions<br>to efficient computation.</p></div>
    </dialog>
  </header>
</template>
