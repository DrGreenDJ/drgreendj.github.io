<template>
  <div class="container">
    <div v-if="initialized">
      <!-- <task-grid></task-grid> -->

      <div>
        <label>
          Debug values, showSearch: {{ showSearch }}, contactIncoming: {{ contactIncoming }},
          current exists: {{ StoredData.currentAgentContact !== null }}, customers size:
          {{ StoredData.currentAgentContact?.customers.size }}
        </label>
      </div>

      <!-- TODO: if the dropdown is empty it shows a black artificat!-->
      <!-- TODO: put width:100% for form-group and select into css -->
      <!-- TODO: extract dropdown into separate component -->
      <div class="row justify-content-center mt-1 mb-1">
        <div class="col-2 dropdown" style="display: flex; justify-content: center">
          <div class="form-group" style="width: 100%">
            <label for="callDropdown" :style="{ fontWeight: calls.length > 0 ? 'bold' : 'unset' }"
              >Anrufe ({{ calls.length }})</label
            >
            <select
              v-model="selectedCallId"
              class="form-control"
              id="callDropdown"
              style="width: 100%"
              @change="changeCurrent($event)"
            >
              <option v-for="item in calls" :value="item.interactionId" :key="item.interactionId">
                {{ item.callLabel }}
              </option>
            </select>
          </div>
        </div>

        <div class="col-2 dropdown" style="display: flex; justify-content: center">
          <div class="form-group" style="width: 100%">
            <label :style="{ fontWeight: emails.length > 0 ? 'bold' : 'unset' }" for="emailDropdown"
              >E-Mails ({{ emails.length }})</label
            >
            <select
              v-model="selectedEmailId"
              class="form-control"
              id="emailDropdown"
              style="width: 100%"
              @change="changeCurrent($event)"
            >
              <option v-for="item in emails" :value="item.interactionId" :key="item.interactionId">
                {{ item.mailLabel }}
              </option>
            </select>
          </div>
        </div>

        <div class="col-2 dropdown" style="display: flex; justify-content: center">
          <div class="col-12 mt-1 mb-1">
            <div
              style="top: 50%; transform: translateY(-35%); margin: 0; position: absolute"
              class="btn btn-sm btn-secondary btn-block p-2"
              @click="resetCurrent"
              v-if="StoredData.currentAgentContact"
            >
              Auswahl aufheben
            </div>
          </div>
        </div>
      </div>

      <div
        class="row justify-content-center mt-3 mb-3"
        v-if="!contactIncoming && StoredData.agentEmailAddress"
      >
        <div class="col-12 text-center">
          <iframe
            class="mt-4"
            name="kundendateniframe"
            id="kundendateniframe"
            width="90%"
            height="775px"
            :src="getIdleCrmUrl()"
          >
          </iframe>
        </div>
      </div>

      <div class="row justify-content-center" v-if="contactIncoming">
        <div class="col-2">
          <div class="col-12 mb-3 mt-4 align-middle text-center">
            <span>Ist die Kundenauswahl korrekt?</span>
          </div>

          <div class="col-12 mt-1 mb-1">
            <div
              v-if="pendingCustomerConfirmation"
              class="btn btn-sm btn-success btn-block p-2"
              @click="assignSingleHit"
            >
              Ja
            </div>
          </div>

          <div class="col-12 mt-1 mb-1">
            <div
              v-if="pendingCustomerConfirmation || StoredData.currentAgentContact?.selectedCustomer"
              class="btn btn-sm btn-danger btn-block p-2"
              @click="activateSearch()"
            >
              Nein
            </div>
          </div>

          <div class="col-12 mt-1 mb-1">
            <div
              v-if="showSearch"
              class="btn btn-sm btn-secondary btn-block p-2"
              @click="assignNewCustomer"
            >
              Neukunde,kein Treffer
            </div>
          </div>

          <div
            class="col-12 mb-3 align-middle text-center"
            v-show="StoredData.currentAgentContact?.areCaseLinksLoading"
          >
            <span>Links werden geladen</span>
          </div>

          <div class="ml-2 mr-2 mt-3 mb-3">
            <div class="row justify-content-center">
              <div
                v-for="(link, index) in StoredData.currentAgentContact?.caseLinks"
                :key="index"
                class="col-12 text-center"
                style="word-break: break-all"
              >
                <a :href="link.link" target="_blank">{{ link.link_desc }}</a>
              </div>
            </div>
          </div>
        </div>

        <div class="col-10" v-if="StoredData.currentAgentContact !== null">
          <CustomerTable
            v-show="showSearch"
            :conversation-uuid="StoredData.currentAgentContact.conversationUuid"
          ></CustomerTable>

          <!-- <iframe
            class="mt-4"
            v-if="!showSearch && contactIncoming"
            name="kundendateniframe"
            id="kundendateniframe"
            width="90%"
            height="600px"
            :src="getCrmUrl"
          > -->

          <label v-if="!showSearch">Active frame url: {{ getCrmUrl() }}</label>

          <!-- </iframe> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AgentContactWrapper } from '@/custom-classes/agent-contact-wrapper'
import { MerkurRequestHandler } from '@/handlers/merkur-request-handler'
import { StoredData } from '@/storage/stored-data'
import { computed, onUnmounted, ref, watch } from 'vue'
import CustomerTable from './CustomerTable.vue'

const calls = ref<AgentContactWrapper[]>([])
const emails = ref<AgentContactWrapper[]>([])

const initialized = computed(() => StoredData.isInitialized)

const contactIncoming = ref<boolean>(false)
const pendingCustomerConfirmation = ref<boolean>(false)

const showSearch = ref<boolean>(false)

const selectedCallId = ref<string | null>('')
const selectedEmailId = ref<string | null>('')
const displaySearch = ref<boolean>(false)

watch(selectedCallId, () => {
  if (
    selectedCallId.value &&
    selectedCallId.value !== StoredData.currentAgentContact?.interactionId
  ) {
    StoredData.setCurrentAgentContact(selectedCallId.value)
  }
})

function changeCurrent(event: Event): void {
  const interactionId = (event.target as HTMLElement).nodeValue

  if (interactionId) {
    StoredData.setCurrentAgentContact(interactionId)
  }
}

function resetCurrent(): void {
  StoredData.clearCurrent()
}

function getIdleCrmUrl(): string {
  const url = `${StoredData.crmUrl}customer_view_finesse_ob.php?userID=${StoredData.crmLoginId}&navUser=${StoredData.crmLoginId}`
  console.debug('getIdleCrmUrl', url)

  return url
}

function getCrmUrl(): string {
  const workItemUuid =
    StoredData.currentAgentContact?.mediaType === 'task'
      ? StoredData.currentAgentContact.interactionId
      : ''

  const url =
    `${StoredData.crmUrl}customer_view_finesse.php?debID=${StoredData.currentAgentContact?.selectedCustomer?.contract_number}` +
    `&userID=${StoredData.crmLoginId}&navUser=${StoredData.crmLoginId}` +
    `&conversationUuid=${StoredData.currentAgentContact?.conversationUuid}&workItemUuid=${workItemUuid}`

  console.debug('getCrmUrl', url)

  return url
}

function assignSingleHit(): void {
  if (!StoredData.currentAgentContact?.hasSingleHit) {
    console.error('Unable to assign single hit')

    return
  }

  MerkurRequestHandler.assignContact(
    StoredData.currentAgentContact,
    StoredData.currentAgentContact.singleHitCustomer!,
  )
}

function assignNewCustomer(): void {
  if (!StoredData.currentAgentContact) {
    console.error('Unable to assign without current agent contact')
  }

  MerkurRequestHandler.assignNewContact(StoredData.currentAgentContact!)
}

function activateSearch(): void {
  displaySearch.value = true

  console.error('search activated', displaySearch.value)
}

function processContactChange(): void {
  calls.value = StoredData.calls
  emails.value = StoredData.mails
}

function processCurrentChange(): void {
  if (!StoredData.currentAgentContact) {
    selectedCallId.value = null
    selectedEmailId.value = null
  } else {
    if (StoredData.currentAgentContact.mediaType === 'email') {
      selectedCallId.value = null
      selectedEmailId.value = StoredData.currentAgentContact.interactionId
    } else {
      selectedEmailId.value = null
      selectedCallId.value = StoredData.currentAgentContact.interactionId
    }
  }

  showSearch.value =
    displaySearch.value ||
    (StoredData.currentAgentContact !== null && !StoredData.currentAgentContact.hasSingleHit)

  contactIncoming.value =
    StoredData.currentAgentContact != null &&
    StoredData.currentAgentContact.selectedCustomer == null

  pendingCustomerConfirmation.value =
    StoredData.currentAgentContact?.selectedCustomer === null &&
    StoredData.currentAgentContact?.hasSingleHit
}

StoredData.addEventHandler('home', processContactChange, true)
StoredData.addEventHandler('home', processCurrentChange, false)

onUnmounted(() => {
  StoredData.removeEventHandler('home', true)
  StoredData.removeEventHandler('home', false)
})
</script>
