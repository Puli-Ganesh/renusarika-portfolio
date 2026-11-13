<script setup lang="ts">
import { ref } from 'vue';
import { identity } from '../data/portfolio';
import SectionLabel from '../components/SectionLabel.vue';
import SmartPhoto from '../components/SmartPhoto.vue';
import ResumeLink from '../components/ResumeLink.vue';
import ArrowIcon from '../components/ArrowIcon.vue';
import SceneFrame from '../components/SceneFrame.vue';
const copyStatus = ref('');
async function copyEmail() {
  try {
    if (!navigator.clipboard) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(identity.email);
    copyStatus.value = 'Email copied';
  } catch {
    copyStatus.value = 'Copy is unavailable here. Select the email address below to copy it.';
  }
}
</script>
<template>
  <section id="contact" class="contact-section section-wrap" aria-labelledby="contact-title" tabindex="-1"><SectionLabel number="07" text="THE NEXT CONVERSATION" /><div class="contact-grid"><div class="contact-copy content-plane"><p class="eyebrow">FROM AN IDEA TO A CONVERSATION.</p><h2 id="contact-title">Let's build<br>what comes<br><em>next.</em><svg class="contact-star" aria-hidden="true" viewBox="0 0 80 80" width="70" height="70" fill="none"><path d="M40 4v72M4 40h72M14 14l52 52M14 66l52-52" stroke="currentColor" stroke-width="4" /></svg></h2><p>Open to conversations about AI/ML learning, projects, and internship opportunities.</p><a class="button primary" :href="`mailto:${identity.email}`">Email Renusarika <ArrowIcon /></a><div class="contact-addresses"><a :href="`mailto:${identity.email}`">{{ identity.email }}</a><a :href="identity.phoneHref">{{ identity.phone }}</a></div><div class="contact-secondary"><button class="text-link" type="button" @click="copyEmail">{{ copyStatus === 'Email copied' ? 'Email copied ✓' : 'Copy email' }} <span aria-hidden="true">⧉</span></button><ResumeLink /></div><p class="copy-status" role="status">{{ copyStatus }}</p></div><div class="contact-art"><SceneFrame kind="contact" /><div class="contact-portrait"><SmartPhoto role="contact" /></div><p class="contact-photo-caption">HUMAN FIRST.<br>CURIOUS, ALWAYS.</p></div></div></section>
</template>
