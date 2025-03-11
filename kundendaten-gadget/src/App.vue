<template>
  <main>
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    />
    <link rel="stylesheet" href="https://drgreendj.github.io/style.css" />

    <HomeComponent></HomeComponent>
  </main>
</template>

<script setup lang="ts">
const props = defineProps<{
  agent?: unknown
  apiKey?: string
}>()

import { Desktop } from '@wxcc-desktop/sdk'
import type { Service } from '@wxcc-desktop/sdk-types'
import { StoredData } from './storage/stored-data'
import { MerkurRequestHandler } from './handlers/merkur-request-handler'
import HomeComponent from './components/HomeComponent.vue'
import { ContactEventHandler } from './handlers/contact-event-handler'

if (!StoredData.isInitialized) {
  console.error('Initializing gadget')

  if (props.apiKey) {
    MerkurRequestHandler.setApiKey(props.apiKey)
  } else {
    console.error('Unable to request customer data without apiKey!')
  }

  try {
    Desktop.config.init({ widgetName: 'kundendaten-gadget', widgetProvider: 'NTS' })
  } catch (ex) {
    console.error('NTS DEBUG: Init not working', ex)
  }

  _setupEventListeners()

  StoredData.isInitialized = true
}

function _setupEventListeners(): void {
  Desktop.agentContact.addEventListener(
    'eAgentOfferContact',
    (contact: Service.Aqm.Contact.AgentContact) => {
      console.error('eAgentOfferContact', contact)

      try {
        ContactEventHandler.handleContactOffered(contact)
      } catch (ex) {
        console.error('Error while setting caller data', ex)
      }
    },
  )

  Desktop.agentContact.addEventListener(
    'eAgentContactAssigned',
    (contact: Service.Aqm.Contact.AgentContact) => {
      console.error('eAgentContactAssigned', contact)

      try {
        ContactEventHandler.handleContactAdded(contact)
      } catch (ex) {
        console.error('Error while processing AgentContactAssigned', ex)
      }
    },
  )

  Desktop.agentContact.addEventListener(
    'eAgentContactEnded',
    (contact: Service.Aqm.Contact.AgentContact) => {
      console.error('NTS DEBUG: AgentContact eAgentContactEnded: ', contact)
      ContactEventHandler.handleContactRemoved(contact)
    },
  )

  // for already existing contacts when page is loaded
  Desktop.agentContact.addEventListener(
    'eAgentContact',
    (contact: Service.Aqm.Contact.AgentContact) => {
      try {
        ContactEventHandler.handleContact(contact)
      } catch (ex) {
        console.error('Error while setting current items', ex)
      }
    },
  )

  Desktop.agentStateInfo.addEventListener('updated', (data) => {
    console.error('agentStateInfo updated', data)
  })

  const eventsToSubscribe: (
    | 'eAgentOfferConsult'
    | 'eAgentConsulting'
    | 'eAgentConsultCreated'
    | 'eAgentConsultConferenced'
    | 'eAgentContactAssigned'
    | 'eAgentContact'
    | 'eAgentConsultFailed'
    | 'eAgentConsultEndFailed'
  )[] = [
    'eAgentOfferConsult',
    'eAgentConsulting',
    'eAgentConsultCreated',
    'eAgentConsultConferenced',
    'eAgentContactAssigned',
    'eAgentConsultFailed',
    'eAgentConsultEndFailed',
  ]

  eventsToSubscribe.forEach((eventName) => {
    console.error('adding listener', eventName)

    try {
      Desktop.agentContact.addEventListener(
        eventName,
        (contact: Service.Aqm.Contact.AgentContact) => {
          try {
            console.error('event fired', eventName)
            console.error(eventName, contact)
          } catch {}
        },
      )
    } catch (ex) {
      console.error('Error while adding listener for ' + eventName, ex)
    }
  })
}
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

/**
 * Default attributes for gadget body.
 */
main {
  background: none transparent;
  padding: 0px;
  height: 100%;
}

td {
  white-space: normal !important;
  word-wrap: break-word;
}

table {
  table-layout: fixed;
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}

.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 6px solid black;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: black transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.btn-success {
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
  font-size: xx-large;
}

.btn-success:hover {
  color: #fff;
  background-color: #218838;
  border-color: #1e7e34;
}
</style>
