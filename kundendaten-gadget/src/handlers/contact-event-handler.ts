import { AgentContactWrapper } from '@/custom-classes/agent-contact-wrapper'
import { StoredData } from '@/storage/stored-data'
import type { Service } from '@wxcc-desktop/sdk-types'
import { MerkurRequestHandler } from './merkur-request-handler'

export class ContactEventHandler {
  public static handleContact(contact: Service.Aqm.Contact.AgentContact): void {
    console.error('handleContact', contact)

    this._checkMailAddress(contact)

    const agentContact = new AgentContactWrapper(contact)

    if (!agentContact.conversationUuid) {
      // only used for now, as LIWEST needs to set htpps
      // identify happens in stored-data.ts
      // console.log('Discarding call because of missing conversation UUID', contact)
      // return
    }

    if (agentContact.state === 'new' || agentContact.state === 'connected') {
      this.handleContactOffered(contact)

      if (agentContact.state === 'connected' && agentContact.mediaType === 'telephony') {
        console.error('mock pickup', contact)
        this.handleContactAdded(contact)
      }
    } else {
      this.handleContactRemoved(contact)
    }
  }

  public static handleContactOffered(contact: Service.Aqm.Contact.AgentContact): void {
    console.error('handle contact offered')

    this._checkMailAddress(contact)

    StoredData.addAgentContact(contact)
  }

  public static handleContactAdded(contact: Service.Aqm.Contact.AgentContact): void {
    console.error('handle contact added')

    this._checkMailAddress(contact)

    const agentContact = new AgentContactWrapper(contact)

    StoredData.setCurrentAgentContact(agentContact.interactionId)
  }

  public static handleContactRemoved(contact: Service.Aqm.Contact.AgentContact): void {
    console.error('handle contact ended')

    this._checkMailAddress(contact)

    const wrapper = new AgentContactWrapper(contact)

    const agentContact = StoredData.getAgentContactViaInteractionId(contact.data.interactionId)

    if (!agentContact) {
      console.log(
        `Unable to find contact with conversationUuid "${wrapper.conversationUuid}" for removal`,
        contact,
      )

      return
    }

    try {
      if (new AgentContactWrapper(contact).state === 'new') {
        MerkurRequestHandler.finishContact(agentContact)
      }

      StoredData.removeAgentContact(agentContact.interactionId)
    } catch (ex) {
      console.error('Error during handleCallRemoved', ex)
    }
  }

  private static _checkMailAddress(contact: Service.Aqm.Contact.AgentContact): void {
    const cData: Record<string, unknown> = contact.data

    for (const key of Object.keys(cData)) {
      if (key === 'agentEmailId') {
        StoredData.agentEmailAddress = cData[key] as string
      }
    }
  }
}
