import { createContext, Dispatch, SetStateAction, useState } from "react"
import { useAccount } from "wagmi"
import { client } from "../../configs/axios/axiosConfig"
import { MyTicketsDTO } from "../../dtos/ticket/ticket.dto"
import useAsyncEffect from "../../hooks/useAsyncEffect"

interface MyTicketsContextStruct {
  myTickets: MyTicketsDTO | undefined
  setMyTickets: Dispatch<SetStateAction<MyTicketsDTO | undefined>>
  filteredMyTickets: MyTicketsDTO | undefined
  setFilteredMyTickets: Dispatch<SetStateAction<MyTicketsDTO | undefined>>
  searchMyTickets: (searchTerm: string) => MyTicketsDTO
  getUserTickets: (address: `0x${string}`) => Promise<MyTicketsDTO | undefined>
}

export const MyTicketsContext = createContext({} as MyTicketsContextStruct)

const MyTicketsContextProvider = ({ ...props }) => {
  const { address } = useAccount()
  const [myTickets, setMyTickets] = useState<MyTicketsDTO | undefined>(
    undefined
  )
  const [filteredMyTickets, setFilteredMyTickets] = useState<
    MyTicketsDTO | undefined
  >()

  useAsyncEffect(async () => {
    if (!getUserTickets || !address) return
    await getUserTickets(address)
  }, [address])

  const searchMyTickets = (searchTerm: string): MyTicketsDTO => {
    if (!myTickets)
      return {
        myTickets: [],
        myTicketListing: []
      }

    const _filteredMyTickets = { ...myTickets }

    // find the index of myTickets where the ticket matches the search query
    const matchingMyTicketsIndices = myTickets.myTickets.map(
      (ticket, index) => {
        const match = ticket.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
        if (match) return index
      }
    )

    // find the index of myTicketListing where the ticket matches the search query
    const matchingMyTicketListingIndices = myTickets.myTicketListing.map(
      (ticket, index) => {
        const match = ticket.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
        if (match) return index
      }
    )

    const filteredResult = {
      myTickets: (matchingMyTicketsIndices as number[])
        .map((i: number) => _filteredMyTickets.myTickets[i])
        .filter((ticket) => ticket !== undefined),
      myTicketListing: (matchingMyTicketListingIndices as number[])
        .map((i: number) => _filteredMyTickets.myTicketListing[i])
        .filter((ticket) => ticket !== undefined)
    }

    setFilteredMyTickets(filteredResult)
    return filteredResult
  }

  const getUserTickets = async (walletAddress: `0x${string}`) => {
    try {
      const _tickets = await client.get<MyTicketsDTO>(
        `/ticket/user/${walletAddress}`
      )
      setMyTickets(_tickets.data)
      setFilteredMyTickets(_tickets.data)
      return _tickets.data
    } catch (error) {
      setMyTickets(undefined)
      setFilteredMyTickets(undefined)
      return undefined
    }
  }

  const values: MyTicketsContextStruct = {
    myTickets,
    setMyTickets,
    filteredMyTickets,
    setFilteredMyTickets,
    searchMyTickets,
    getUserTickets
  }

  return <MyTicketsContext.Provider value={values} {...props} />
}

export default MyTicketsContextProvider
