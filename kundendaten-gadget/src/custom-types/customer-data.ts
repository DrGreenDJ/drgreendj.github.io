export type MerkurBoosterData = {
  contract_number: string
  signin: string
  postofficebox: string
  email_addresses: string[]
  phone_numbers: string[]
  domain: string
  activity_id: string
  id: number
  phone_no: string
  email: string
  debitor_no: string
  customer_name: string
  customer_birth_date: string
  customer_password: string
  contract_address: string
  invoice_address: string
  state: string
  verified_email: string
  verified_phone: string
  smartcard_number: string
  modified_date: string
}

export type MerkurBoosterLinkData = {
  link: string
  link_desc: string
}

export type CustomerSearchResult = {
  code: number
  description: string
  hit_count: number
  business: boolean
  vip: boolean
  ruzu: boolean
  incident_id: number
  priority: number
  notifiable: boolean
  case_links: MerkurBoosterLinkData[]
  conversation_uid: string
  data: object
}

export type CustomerSearchResultWithParsedData = CustomerSearchResult & {
  parsedData: MerkurBoosterData[]
}
