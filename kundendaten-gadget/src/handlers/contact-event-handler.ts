import { AgentContactWrapper } from '@/custom-classes/agent-contact-wrapper'
import { StoredData } from '@/storage/stored-data'
import type { Service } from '@wxcc-desktop/sdk-types'
import { MerkurRequestHandler } from './merkur-request-handler'

export class ContactEventHandler {
  public handleContact(contact: Service.Aqm.Contact.AgentContact): void {
    console.error('handleContact', contact)

    const agentContact = new AgentContactWrapper(contact)

    if (!agentContact.conversationUuid) {
      console.log('Discarding call because of missing conversation UUID', contact)

      return
    }

    if (agentContact.state === 'new') {
      this._handleContactOffered(contact)
    } else if (agentContact.state === 'connected') {
      this._handleContactAdded(agentContact)
    } else {
      this._handleContactRemoved(contact)
    }
  }

  private _handleContactOffered(contact: Service.Aqm.Contact.AgentContact): void {
    const agentContact = StoredData.addAgentContact(contact)

    agentContact.contactIncoming = true

    MerkurRequestHandler.putActive(agentContact)
  }

  private _handleContactAdded(agentContact: AgentContactWrapper): void {
    StoredData.setAgentContactIsActive(agentContact.interactionId)
  }

  private _handleContactRemoved(contact: Service.Aqm.Contact.AgentContact): void {
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
      if (agentContact.state === 'new') {
        MerkurRequestHandler.finishContact(agentContact)
      }

      StoredData.removeAgentContact(agentContact.conversationUuid)
    } catch (ex) {
      console.error('Error during handleCallRemoved', ex)
    }
  }
}
