import { Clear } from "@mui/icons-material"
import { IconButton, InputAdornment } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { MyTicketsContext } from "../../../contexts/ticket/myTicketsContext"
import ContainedButton from "../../UI/button/ContainedButton"
import ContainerCard from "../../UI/card/ContainerCard"
import { TextFieldWrapper } from "../../UI/textfield/TextFieldWrapper"

function MyTicketsSearch() {
  const { searchMyTickets, myTickets, setFilteredMyTickets } =
    useContext(MyTicketsContext)

  const [searchTerm, setSearchTerm] = useState("")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _searchTerm: string = e.target.value
    setSearchTerm(_searchTerm)
  }

  useEffect(() => {
    setFilteredMyTickets(myTickets)
  }, [searchTerm])

  return (
    <ContainerCard sx={{ display: "flex", gap: 2 }}>
      <TextFieldWrapper
        name="searchTerm"
        label="Search tickets"
        value={searchTerm}
        onChange={handleChange}
        id="searchTerm-input"
        data-testid="searchTerm-input"
        placeholder="searchTerm"
        variant="outlined"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setSearchTerm("")}>
                <Clear />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <ContainedButton
        label="Search"
        variant="contained"
        onClick={() => searchMyTickets(searchTerm)}
      />
    </ContainerCard>
  )
}

export default MyTicketsSearch
