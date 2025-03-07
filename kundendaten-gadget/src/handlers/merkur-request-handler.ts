import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

import { StoredData } from '@/storage/stored-data'
import type { AgentContactWrapper } from '@/custom-classes/agent-contact-wrapper'
import type { CustomerSearchResult, MerkurBoosterData } from '@/custom-types/customer-data'

export class MerkurRequestHandler {
  private static _apiKey: string = ''
  private static _apiUrl = 'https://contactcenter.atliwest.local/rest/v1/merkurbooster'
  private static get _apiConfigForGet(): AxiosRequestConfig {
    return {
      headers: {
        'X-API-KEY': this._apiKey,
      },
    }
  }
  private static get _apiConfig(): AxiosRequestConfig {
    const requestConfig = this._apiConfigForGet

    requestConfig.responseType = 'json'

    if (requestConfig.headers) {
      requestConfig.headers['Accept'] = 'application/json'
      requestConfig.headers['Content-Type'] = 'application/json'
    }

    return requestConfig
  }

  public static setApiKey(value: string): void {
    this._apiKey = value
  }

  public static putActive(contact: AgentContactWrapper): void {
    axios
      .put(
        `${this._apiUrl}/event/conversation/${contact.conversationUuid}/active`,
        contact.jsonPayload,
        this._apiConfig,
      )
      .then((result: AxiosResponse<CustomerSearchResult>) => {
        const parsedCustomerMap = this._getMerkurBoosterMapFromSearchResult(result.data)

        contact.addCustomers(parsedCustomerMap)
      })
  }

  public static searchCustomer(searchValue: string): Map<string, MerkurBoosterData[]> {
    const amendedCustomerDict = new Map<string, MerkurBoosterData[]>()

    axios
      .get(`${this._apiUrl}/customer/search/all/${searchValue}?limit=20`, this._apiConfigForGet)
      .then((result: AxiosResponse<CustomerSearchResult>) => {
        console.error('customer search result', result.data)

        return this._getMerkurBoosterMapFromSearchResult(result.data)
      })
      .catch((reason) => {
        console.error('Error while searching for customers', reason)
      })

    return amendedCustomerDict
  }

  public static postCustomerData(
    customer: MerkurBoosterData,
    queueName: string,
    fromAddress: string,
    conversationUuid: string,
  ): void {
    StoredData.isLoading = true

    const data = JSON.stringify({
      channel: 'voice',
      department: queueName,
      agent: StoredData.agentEmailAddress,
      model: 'DefaultModel',
    })

    axios
      .post(
        `${this._apiUrl}/event/conversation/${conversationUuid}/customer/${customer.debitor_no}/assigntype/CONVERSATION_PHONE/assignidentifier/${fromAddress}/assign`,
        data,
        this._apiConfig,
      )
      .then((response: AxiosResponse<CustomerSearchResult>) => {
        console.log(response)

        StoredData.caseLinks = response.data.case_links
      })
      .catch((reason) => {
        console.error('Error during assign', reason)
      })
      .finally(() => {
        StoredData.isLoading = false
      })
  }

  public static assignContact(
    agentContact: AgentContactWrapper,
    customer: MerkurBoosterData,
  ): void {
    agentContact.areCaseLinksLoading = true
    agentContact.selectedCustomer = customer

    const url = ''

    axios
      .post(url, agentContact.jsonPayload, this._apiConfig)
      .then((response: AxiosResponse<CustomerSearchResult>) => {
        StoredData.caseLinks = response.data.case_links
      })
      .catch((reason: unknown) => {
        console.error('assignContact', reason)
      })
      .finally(() => {
        agentContact.areCaseLinksLoading = false
      })
  }

  public static assignNewContact(agentContact: AgentContactWrapper): void {
    agentContact.areCaseLinksLoading = true

    const url = `${this._apiUrl}/event/conversation/${agentContact.conversationUuid}/newcustomer`

    axios
      .post(url, agentContact.jsonPayload, this._apiConfig)
      .then((response: AxiosResponse<CustomerSearchResult>) => {
        const custData = this._getMerkurBoosterMapFromSearchResult(response.data)

        agentContact.addCustomers(custData)

        if (agentContact.hasSingleHit) {
          // has to be the case, actually
          agentContact.selectedCustomer = agentContact.singleHitCustomer
        }
      })
      .finally(() => {
        agentContact.areCaseLinksLoading = false
      })
  }

  public static finishContact(agentContact: AgentContactWrapper): void {
    const methodName = 'finishContact'

    const data = {
      channel: agentContact.mediaType,
      department: 'Vermittlung',
      agent: StoredData.agentEmailAddress,
      model: 'DefaultModel',
    }

    axios
      .put(
        `${this._apiUrl}/event/conversation/${agentContact.conversationUuid}/finish` +
          `?customernumber=${agentContact.selectedCustomer?.contract_number ?? ''}` +
          `&conversationtype=${agentContact.conversationTypeNumber}`,
        data,
      )
      .then((response: AxiosResponse<unknown>) => console.log(methodName, response))
      .catch((reason: unknown) => console.error(methodName, reason))
  }

  private static _getMerkurBoosterMapFromSearchResult(
    searchResult: CustomerSearchResult,
  ): Map<string, MerkurBoosterData[]> {
    const amendedCustomerDict = new Map<string, MerkurBoosterData[]>()

    try {
      const custData = searchResult.data

      Object.keys(custData).forEach((zipCode: string) => {
        if (custData.hasOwnProperty(zipCode)) {
          const key = (zipCode ?? '').length === 0 ? 'Ohne TO-Zuweisung' : zipCode

          amendedCustomerDict.set(key, custData[zipCode])
        }
      })
    } catch (ex) {
      console.error('Error while parsing CustomerSearchResult', ex)
    }

    return amendedCustomerDict
  }
}
