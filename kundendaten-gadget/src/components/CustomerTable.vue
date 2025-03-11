<template>
  <div class="ml-2 mr-2 mt-3 mb-3">
    <div class="row">
      <div class="col-12 mt-3">
        <div class="input-group mb-3">
          <input
            v-model="search"
            type="text"
            class="form-control"
            placeholder="Suche"
            aria-label="Suche"
            aria-describedby="basic-addon2"
          />
          <div class="input-group-append">
            <span class="input-group-text" id="basic-addon2">Suche</span>
          </div>
        </div>
        <span>{{ search }}</span>
      </div>
      <div class="col-lg-12">
        <table class="table" style="overflow-y: scroll">
          <thead>
            <tr>
              <th style="width: 125px">PLZ</th>
              <th>Kundendaten</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="zipCode of [...customerSearchResult.keys()]" :key="zipCode">
              <td>{{ zipCode }}</td>
              <td>
                <table class="table center table-striped table-inverse" style="overflow-y: scroll">
                  <thead>
                    <tr>
                      <th>Kundennummer</th>
                      <th>Name</th>
                      <th>Vertragsadresse</th>
                      <th>Rechnungsadresse</th>
                      <th>Kunde wählen</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="customer in customerSearchResult.get(zipCode)" :key="customer.id">
                      <td>{{ customer.debitor_no }}</td>
                      <td>{{ customer.customer_name }}</td>
                      <td>{{ customer.contract_address }}</td>
                      <td>{{ customer.invoice_address }}</td>
                      <td>
                        <div class="btn btn-sm btn-success" @click="selectCustomer(customer)">
                          Auswählen
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { MerkurBoosterData } from '../custom-types/customer-data.ts'
import { StoredData } from '@/storage/stored-data.ts'
import { MerkurRequestHandler } from '@/handlers/merkur-request-handler.ts'

const props = defineProps<{
  conversationUuid: string | undefined
}>()

const customerSearchResult = ref<Map<string, MerkurBoosterData[]>>(
  new Map<string, MerkurBoosterData[]>(),
)
const search = ref<string>('')

watch(search, () => {
  if (search.value.length < 3) {
    return
  }

  MerkurRequestHandler.searchCustomerAsync(search.value).then(
    (value: Map<string, MerkurBoosterData[]>) => {
      customerSearchResult.value = value

      console.error('search result from merkur', customerSearchResult.value)
    },
  )
})

function selectCustomer(customer: MerkurBoosterData): void {
  console.error('selectCustomer', customer)

  if (!props.conversationUuid) {
    console.error('Unable to select customer without conversationUuid')

    return
  }

  const agentContact = StoredData.getAgentContactViaConversationUuid(props.conversationUuid)

  if (!agentContact) {
    console.error('No agentContact found!', props.conversationUuid)
    return
  }

  MerkurRequestHandler.postCustomerData(
    customer,
    agentContact.queueName,
    agentContact.fromAddress,
    props.conversationUuid,
    agentContact.mediaType === 'telephony',
  )

  StoredData.setSelectedCustomer(agentContact.interactionId, customer)
}

onMounted(() => {
  if (StoredData.currentAgentContact !== null) {
    console.error('setting customer result', StoredData.currentAgentContact.customers)

    customerSearchResult.value = StoredData.currentAgentContact.customers

    console.error('search result from contact', customerSearchResult.value)
  }
})
</script>
