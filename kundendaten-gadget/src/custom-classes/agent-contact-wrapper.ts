import type { MerkurBoosterData, MerkurBoosterLinkData } from '@/custom-types/customer-data'
import { StoredData } from '@/storage/stored-data'
import type { Service } from '@wxcc-desktop/sdk-types'

export class AgentContactWrapper {
  public get queueName(): string {
    return this._contact.data.interaction.callProcessingDetails.virtualTeamName
  }

  public get routingType(): string | undefined {
    return this._contact.data.interaction.callProcessingDetails.ROUTING_TYPE
  }

  // public get conversationUuid(): string {
  //   return (
  //     this._contact.data.interaction.callAssociatedData?.HTTP_Identify_conversationUUID?.toString() ??
  //     ''
  //   )
  // }

  private _conversationUuid: string = ''
  public get conversationUuid(): string {
    return this._conversationUuid
  }

  public get fromAddress(): string {
    const participants = this._contact.data.interaction.participants

    for (const key of Object.keys(participants)) {
      if (key !== this._contact.data.agentId) {
        return key
      }
    }

    return ''
  }

  public get mediaType(): 'telephony' | 'email' | 'task' | 'unknown' {
    if (
      ['telephony', 'email'].find(
        (val) => val === this._contact.data.interaction.mediaType.toLowerCase(),
      )
    )
      return this._contact.data.interaction.mediaType as 'telephony' | 'email' | 'task'

    return 'unknown'
  }

  public get state(): string {
    return this._contact.data.interaction.state // 'new' / 'connected' / 'wrapup'
  }

  public get jsonPayload(): string {
    return JSON.stringify({
      channel: this._contact.data.interaction.mediaType,
      department: this.queueName,
      agent: StoredData.crmLoginId,
      model: this._contact.data.interaction.mediaChannel,
    })
  }

  public get interactionId(): string {
    return this._contact.data.interactionId
  }

  public get conversationTypeNumber(): number {
    if (this.mediaType === 'telephony') {
      return 0
    } else if (this.mediaType === 'email') {
      return 1
    } else if (this.mediaType === 'task') {
      return 3
    }

    // indicating error
    return -1
  }

  public get callLabel(): string {
    let returnValue = this.fromAddress || ''

    const cString = this.customerString

    if (returnValue && cString) {
      returnValue += ' '
    }

    if (cString) {
      returnValue += cString
    }

    return returnValue
  }

  public get mailLabel(): string {
    return this.customerString
  }

  public get customerString(): string {
    let customerToUse: MerkurBoosterData | null = null

    if (this.selectedCustomer !== null) {
      customerToUse = this.selectedCustomer
    } else if (this.customers.size === 1) {
      const customersWithFirstZipCode = this.customers.get([...this.customers.keys()][0])

      if (customersWithFirstZipCode?.length === 1) customerToUse = customersWithFirstZipCode[0]
    }

    if (!customerToUse) {
      return ''
    }

    const customerNumber = customerToUse.contract_number
    const customerName = customerToUse.customer_name

    let returnValue = customerNumber || ''

    if (customerNumber && customerName) {
      returnValue += ' '
    }

    if (customerName) {
      returnValue += customerName
    }

    return returnValue
  }

  public get singleHitCustomer(): MerkurBoosterData | null {
    const keys = [...this.customers.keys()]

    if (keys.length !== 1 || this.customers.get(keys[0])!.length !== 1) {
      return null
    }

    return this.customers.get(keys[0])![0]
  }

  public get hasSingleHit(): boolean {
    return this.singleHitCustomer !== null
  }

  public get eventType(): string {
    return this._contact.data.type
  }

  //#region enriched data
  public customers: Map<string, MerkurBoosterData[]> = new Map<string, MerkurBoosterData[]>()
  public selectedCustomer: MerkurBoosterData | null = null
  public areCaseLinksLoading: boolean = false
  public caseLinks: MerkurBoosterLinkData[] = []
  // type
  // id
  // conversationType
  // isCustomerAssigned
  // isLoadingCaseLinks
  // isTransferred: boolean
  // isConsulted: boolean
  //#endregion enriched data

  constructor(private _contact: Service.Aqm.Contact.AgentContact) {}

  public addCustomers(newEntries: Map<string, MerkurBoosterData[]>): void {
    console.error('assigning customers', newEntries)

    newEntries.forEach((value: MerkurBoosterData[], key: string) => {
      if (this.customers.has(key)) {
        const foundCustomers = this.customers.get(key)

        if (!foundCustomers?.concat) {
          console.error('customers has key but no concat', foundCustomers)
        }

        this.customers.set(key, foundCustomers!.concat(value))
      } else {
        this.customers.set(key, value)
      }
    })
  }

  // ONLY FOR TEST, needs to be removed
  public setConversationUuid(value: string): void {
    if (this._contact.data.interaction.callAssociatedData) {
      this._contact.data.interaction.callAssociatedData.HTTP_Identify_conversationUUID = {
        displayName: 'HTTP_Identify_conversationUUID',
        name: 'HTTP_Identify_conversationUUID',
        type: 'STRING',
        secureKeyId: '',
        secureKeyVersion: 0,
        isSecure: false,
        agentEditable: false,
        agentViewable: true,
        value: value,
      }
    }

    this._conversationUuid = value

    console.error('set to', this._conversationUuid)
  }
}
