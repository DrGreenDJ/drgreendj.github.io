import type { Service } from '@wxcc-desktop/sdk-types'

import { AgentContactWrapper } from '@/custom-classes/agent-contact-wrapper'
import type { MerkurBoosterData, MerkurBoosterLinkData } from '@/custom-types/customer-data'
import { MerkurRequestHandler } from '@/handlers/merkur-request-handler'

export class StoredData {
  public static agentEmailAddress: string = ''
  public static agentLoginId: string = ''
  public static get crmUrl(): string {
    return 'https://knowledge.atliwest.local/stoermeldungen_noc/'
  }

  public static get crmLoginId(): string {
    return this.agentEmailAddress.split('@')[0].toUpperCase()
  }

  private static _eventHandlersCallsChanged = new Map<string, () => void>()
  private static _eventHandlersCurrentChanged = new Map<string, () => void>()

  //#region event handlers
  public static addEventHandler(
    key: string,
    callback: () => void,
    isForCallsChanged: boolean,
  ): void {
    if (isForCallsChanged) {
      this._eventHandlersCallsChanged.set(key, callback)
    } else {
      this._eventHandlersCurrentChanged.set(key, callback)
    }

    callback.call(null)
  }

  public static removeEventHandler(key: string, isForCallsChanged: boolean): void {
    if (isForCallsChanged) {
      this._eventHandlersCallsChanged.delete(key)
    } else {
      this._eventHandlersCurrentChanged.delete(key)
    }
  }
  //#endregion event handlers

  //#region contacts / interaction
  private static _agentContacts: AgentContactWrapper[] = []
  private static _currentAgentContact: AgentContactWrapper | null = null

  public static get currentAgentContact(): AgentContactWrapper | null {
    return this._currentAgentContact
  }

  public static get calls(): AgentContactWrapper[] {
    console.error('calls accessed', this._agentContacts)

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
    console.error('agent contacts add', this._agentContacts)

    const newContact = new AgentContactWrapper(contact)

    MerkurRequestHandler.setConversationUUid(newContact)

    this._agentContacts.push(newContact)

    this._emitChange(true)
    this._emitChange(false)

    console.error('returning newContact', newContact)

    return newContact
  }

  public static removeAgentContact(interactionId: string): boolean {
    console.error('removing contact', interactionId)

    const foundContactIdx = this._agentContacts.findIndex(
      (contact: AgentContactWrapper) => contact.interactionId === interactionId,
    )

    if (foundContactIdx > -1) {
      if (
        this._agentContacts[foundContactIdx].interactionId ===
        this._currentAgentContact?.interactionId
      ) {
        this.clearCurrent()
      }

      this._agentContacts.splice(foundContactIdx)

      console.error('agent contacts remove', this._agentContacts)

      this._emitChange(true)

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

    MerkurRequestHandler.putActive(foundContact)

    this._emitChange(false)
  }

  public static clearCurrent(): void {
    this._currentAgentContact = null
    this._emitChange(false)
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

  private static _emitChange(isForCallsChanged: boolean): void {
    // let changes persist
    setTimeout(() => {
      const dictToCheck = isForCallsChanged
        ? this._eventHandlersCallsChanged
        : this._eventHandlersCurrentChanged

      const keys = [...dictToCheck.keys()]

      keys.forEach((key: string) => dictToCheck.get(key)?.call(null))
    }, 200)
  }
}
