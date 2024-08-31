<template>
  <Accordion>
    <AccordionTab v-for="recommendation in recommendations" :key="recommendation.id" :header="recommendation.comments">
      <div class="meta">
        <ul>
          <li v-if="recommendation.link_to_rec_mrap">
            <a class="text-blue-600 visited:text-purple-600" :href="recommendation.link_to_rec_mrap" target="_blank"
              rel="noopener noreferrer">Link to REC MRAP</a>
          </li>
          <li>Created on: {{ format(recommendation.created_at, 'MMMM d, yyyy, h:mm a') }}</li>
          <li v-if="recommendation.date_closed">
            Date Closed: {{ format(recommendation.date_closed, 'MMMM d, yyyy, h:mm a') }}
          </li>
          <li v-if="recommendation.updated_at">
            Updated on:
            {{ format(recommendation.updated_at, 'MMMM d, yyyy, h:mm a') }}
          </li>
          <li v-if="recommendation.latest_approved_completion_date">
            Latest Approved Completion Date:
            {{ format(recommendation.latest_approved_completion_date, 'MMMM d, yyyy, h:mm a') }}
          </li>
          <li v-if="recommendation.how_late">How Late: TODO: What are the points to use?</li>

          <li>
            <Tag :value="`Status: ${recommendation.status}`" severity="contrast" class="m-1" />
            <Tag :value="`Level: ${recommendation.level}`" severity="contrast" class="m-1" />
          </li>
        </ul>
      </div>
      <Divider />
      <p class="m-1">
        <Tag value="EN" severity="secondary" class="mr-2" />
        {{ recommendation.recommendation_EN }} with more text and some lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua.
      </p>
      <Divider />
      <p class="m-1">
        <Tag value="EN" severity="secondary" class="mr-2" /> {{ recommendation.recommendation_FR }}
      </p>
      <Divider v-if="recommendation.additional_text" />
      <p class="m-1" v-if="recommendation.additional_text">
        <Tag value="Additional Text" severity="secondary" class="mr-2" />
        {{ recommendation.additional_text }}
      </p>
    </AccordionTab>
  </Accordion>
</template>

<script lang="ts">
import { type PropType } from 'vue'
import { defineComponent } from 'vue'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Tag from 'primevue/tag'
import Divider from 'primevue/divider'
import { format } from 'date-fns'

type Recommendation = {
  id: number
  comments: string
  recommendation_EN: string
  recommendation_FR: string
  status: string
  created_at: string
  updated_at: string
  date_closed: string
  how_late: string
  latest_approved_completion_date: string
  level: string
  link_to_rec_mrap: string
  project_id: number
  additional_text: string
}

const RecommendationsPanel = defineComponent({
  name: 'RecommendationsPanel',
  props: {
    recommendations: {
      type: Array as PropType<Recommendation[]>,
      required: true
    }
  },
  components: {
    Accordion,
    AccordionTab,
    Tag,
    Divider
  },
  setup() {
    return {
      format
    }
  }
})

export default RecommendationsPanel
</script>

<style lang="scss">
.meta {
  font-size: 12px;

  li {
    margin-bottom: 0.25rem;
  }
}
</style>
