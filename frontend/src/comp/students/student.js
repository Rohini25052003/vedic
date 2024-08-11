import axios from "axios"
import { api } from "../actions/api"
import { useEffect, useState } from "react"
import {
    Table,
    Thead,
    Tbody,
    
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import './student.css'
export const StudentData = () => {
    const [data, setData] = useState([])

    const featchData = async () => {
        await axios.post(api + "/students")
            .then((res) => {
                setData(res?.data)
            })
            .catch((e) => console.log(e))
    }

    useEffect(() => {
        featchData()
    }, [])

    return (
        <>
            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption>Bootcamp students data</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Email</Th>
                            <Th>Name</Th>
                            {/* <Th>Register</Th> */}
                            <Th>Password</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data?.map((val) => (
                                <Tr>
                                    <Td>{val.Email}</Td>
                                    {/* <Td>{val.Reg}</Td> */}
                                    <Td>{val.Name}</Td>
                                    <Td>{val.Pass}</Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}