<template>
  <div
    class="Slots columns mt-2"
  >
    <ul
      class="Slots__List"
      v-if="HasSlots"
    >
      <li
        v-for="(slot, index) in SlotsByDay"
        :key="index"
        class="Slots__List__Item"
        :class="{
          'unavailable': slot.isTaken,
          'current': slot.isCurrent,
          'selected': slot.isSelected
        }"
      >
        <time
          :datetime="slot.dateStart.format(DATE.FULL_FORMAT)"
          v-if="slot.isTaken || slot.isCurrent"
          class="Slots__Time"
        >
          {{ slot.dateStart.format('HH:mm') }}
        </time>
        <a
          @click="chooseSlot($event, slot)"
          v-else
          class="Slots__Time"
        >
          <time
            :datetime="slot.dateStart.format(DATE.FULL_FORMAT)"
          >
            {{ slot.dateStart.format('HH:mm') }}
          </time>
        </a>
      </li>
      <template
        v-if="HasSlots"
      >
        <li
          v-if="!showMore"
        >
          <p
            @click="showMore = true"
            class="Slots__More"
          >
          Show more</p>
        </li>
        <li
          v-if="showMore"
        >
          <p
            @click="showMore = false"
            class="Slots__More"
          >
          Show less</p>
        </li>
      </template>
    </ul>
    <p
      class="Slots__Empty is-flex"
      v-else
    >
      Not available
    </p>
  </div>
</template>

<script>
import DATE from '@/constants/date.config.js'

export default {
  props: {
    day: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showMore: false,
      minShowMore: 10
    }
  },
  computed: {
    HasSlots () {
      return this.$store.getters.getSlotsByDay(this.day).length > 0
    },
    SlotsByDay () {
      const slots = this.$store.getters.getSlotsByDay(this.day)
      return this.showMore ? slots : slots.slice(0, this.minShowMore)
    }
  },
  created () {
    this.DATE = DATE
  },
  methods: {
    chooseSlot (event, slot) {
      event.preventDefault()
      this.$store.dispatch('selectAppointment', slot)
      document.getElementById('main').scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<style lang="scss" scoped>

$unavailable-color: #c4c4c4;
$current-color: orange;
$available-color: green;

.Slots {
  flex-direction: column;
  height: 100%;
  &__Time {
    display: block;
    padding: 3px 0;
  }
  &__More {
    text-decoration: underline;
    font-size: 0.5rem;
    cursor: pointer;
  }
  &__Empty {
    font-size: 0.8rem;
    opacity: 0.5;
    justify-content: center;
    flex-direction: row;
  }
  &__List {
    &__Item {
      font-size: 0.8rem;
      width: 100%;
      margin: 3px 0;
      > * {
        border-radius: 8px;
      }
      .unavailable, .current {
        text-decoration: line-through;
        cursor: not-allowed;
      }
      &.unavailable {
        time {
          color: $unavailable-color;
          border: 1px dashed $unavailable-color;
        }
      }
      &.current {
        time {
          background-color: $current-color;
          border: 1px solid $current-color;
        }
      }
      &:hover {
        a {
          text-decoration: underline;
        }
      }
      a {
        background-color: $available-color;
        border: 1px solid $available-color;
        color: #fff;
        &.selected {
          background-color: red;
        }
      }
    }

  }
}
</style>
