import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

import { StoredData } from '@/storage/stored-data'
import type { AgentContactWrapper } from '@/custom-classes/agent-contact-wrapper'
import type {
  CustomerSearchResult,
  CustomerSetActiveResult,
  MerkurBoosterData,
} from '@/custom-types/customer-data'

export class MerkurRequestHandler {
  private static _apiKey: string = ''
  private static _apiUrl = 'https://contactcenter-test.atliwest.local/rest/v1/merkurbooster'
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
    console.error('putActive', contact)

    axios
      .put(
        `${this._apiUrl}/event/conversation/${contact.conversationUuid}/active`,
        contact.jsonPayload,
        this._apiConfig,
      )
      .then((result: AxiosResponse<CustomerSetActiveResult>) => {
        const noZipCodeMap = new Map<string, MerkurBoosterData[]>()

        noZipCodeMap.set('', result.data.data)

        console.error('setting customer map without zip code', noZipCodeMap)

        contact.addCustomers(noZipCodeMap)
      })
  }

  public static async searchCustomerAsync(
    searchValue: string,
  ): Promise<Map<string, MerkurBoosterData[]>> {
    const getResult = axios.get(
      `${this._apiUrl}/customer/search/all/${searchValue}?limit=20`,
      this._apiConfigForGet,
    ) as Promise<AxiosResponse<CustomerSearchResult>>

    return getResult.then((result: AxiosResponse<CustomerSearchResult>) =>
      this._getMerkurBoosterMapFromSearchResult(result.data),
    )
  }

  public static postCustomerData(
    customer: MerkurBoosterData,
    queueName: string,
    fromAddress: string,
    conversationUuid: string,
    isCall: boolean,
  ): void {
    StoredData.isLoading = true

    const data = JSON.stringify({
      channel: 'voice',
      department: queueName,
      agent: StoredData.agentEmailAddress,
      model: 'DefaultModel',
    })

    const assignType = isCall ? '' : 'CONVERSATION_PHONE'

    axios
      .post(
        `${this._apiUrl}/event/conversation/${conversationUuid}/customer/${customer.debitor_no}/assigntype/${assignType}/assignidentifier/${fromAddress}/assign`,
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
      .then((response) => console.error('new customer response', response.data))
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
        this._apiConfig,
      )
      .then((response: AxiosResponse<unknown>) => console.log(methodName, response))
      .catch((reason: unknown) => console.error(methodName, reason))
  }

  public static setConversationUUid(agentContact: AgentContactWrapper): void {
    let url = '/customer/'

    if (agentContact.mediaType === 'email') {
      url += 'email'
    } else {
      url += 'phone'
    }

    url += '/' + agentContact.fromAddress + '/identify'

    axios
      .get(this._apiUrl + url, this._apiConfigForGet)
      .then((value: AxiosResponse<CustomerSearchResult>) => {
        agentContact.setConversationUuid(value.data.conversation_uid)
      })
  }

  private static _getMerkurBoosterMapFromSearchResult(
    searchResult: CustomerSearchResult,
  ): Map<string, MerkurBoosterData[]> {
    const amendedCustomerDict = new Map<string, MerkurBoosterData[]>()

    try {
      const custData = searchResult.data as Record<string, unknown>

      console.error('custData', custData)

      Object.keys(custData).forEach((zipCode: string) => {
        const key = (zipCode ?? '').length === 0 ? 'Ohne TO-Zuweisung' : zipCode

        amendedCustomerDict.set(key, custData[zipCode] as MerkurBoosterData[])
      })
    } catch (ex) {
      console.error('Error while parsing CustomerSearchResult', ex)
    }

    console.error('returning', amendedCustomerDict)

    return amendedCustomerDict
  }
}
