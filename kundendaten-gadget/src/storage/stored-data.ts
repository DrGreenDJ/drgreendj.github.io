import type { Service } from '@wxcc-desktop/sdk-types'

import { AgentContactWrapper } from '@/custom-classes/agent-contact-wrapper'
import type { MerkurBoosterData, MerkurBoosterLinkData } from '@/custom-types/customer-data'

export class StoredData {
  public static agentEmailAddress: string = ''
  public static agentLoginId: string = ''
  public static get crmUrl(): string {
    return 'https://knowledge.atliwest.local/stoermeldungen_noc/'
  }

  //#region contacts / interaction
  private static _agentContacts: AgentContactWrapper[] = []
  private static _currentAgentContact: AgentContactWrapper | null = null

  public static get currentAgentContact(): AgentContactWrapper | null {
    return this._currentAgentContact
  }

  public static get calls(): AgentContactWrapper[] {
    return this._agentContacts.filter(
      (aContact: AgentContactWrapper) => aContact.mediaType === 'telephony',
    )
  }

  public static get mails(): AgentContactWrapper[] {
    return this._agentContacts.filter(
      (aContact: AgentContactWrapper) => aContact.mediaType === 'email',
    )
  }

  public static addAgentContact(contact: Service.Aqm.Contact.AgentContact): AgentContactWrapper {
    const newContact = new AgentContactWrapper(contact)

    this._currentAgentContact = newContact

    this._agentContacts.push(newContact)

    return newContact
  }

  public static removeAgentContact(interactionId: string): boolean {
    const foundContactIdx = this._agentContacts.findIndex(
      (contact: AgentContactWrapper) => contact.interactionId === interactionId,
    )

    if (foundContactIdx > -1) {
      this._agentContacts.splice(foundContactIdx)

      return true
    }

    return false
  }

  public static getAgentContactViaInteractionId(
    interactionId: string,
  ): AgentContactWrapper | undefined {
    return this._agentContacts.find(
      (aContact: AgentContactWrapper) => aContact.interactionId === interactionId,
    )
  }

  public static getAgentContactViaConversationUuid(
    conversationUuid: string,
  ): AgentContactWrapper | undefined {
    return this._agentContacts.find(
      (aContact: AgentContactWrapper) => aContact.conversationUuid === conversationUuid,
    )
  }

  public static setCurrentAgentContact(interactionId: string): void {
    const foundContact = this.getAgentContactViaInteractionId(interactionId)

    if (!foundContact) {
      console.error(`Unable to set current, no agent contact found for id "${interactionId}"`)

      return
    }

    this._currentAgentContact = foundContact
  }

  public static clearCurrent(): void {
    this._currentAgentContact = null
  }

  public static setSelectedCustomer(interactionId: string, customer: MerkurBoosterData): void {
    const foundContact = this.getAgentContactViaInteractionId(interactionId)

    if (!foundContact) {
      console.error(
        `Unable to set selected customer, no agent contact found for id "${interactionId}"`,
      )

      return
    }

    foundContact.selectedCustomer = customer
  }
  //#endregion contacts / interaction

  public static isInitialized: boolean = false
  public static caseLinks: MerkurBoosterLinkData[] = []
  public static isLoading: boolean = false
}
