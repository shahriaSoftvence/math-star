import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AllUser() {
    return (
        <Tabs defaultValue="allUser">
            <TabsList className='w-full border-b-2 bg-yellow-100'>
                <TabsTrigger className='font-semibold' value="allUser">All User</TabsTrigger>
                <TabsTrigger className='font-semibold' value="admin">Admin</TabsTrigger>
                <TabsTrigger className='font-semibold' value="subscribed">Subscribed</TabsTrigger>
                <TabsTrigger className='font-semibold' value="user">User</TabsTrigger>
            </TabsList>
            <TabsContent value="allUser">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='font-semibold'>##</TableHead>
                            <TableHead className='font-semibold'>Name</TableHead>
                            <TableHead className='font-semibold'>Email</TableHead>
                            <TableHead className='font-semibold'>Grade</TableHead>
                            <TableHead className='font-semibold'>User Since</TableHead>
                            <TableHead className='font-semibold'>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className=''>
                        {AllUsers.map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell>{index + 1}.</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.grade}</TableCell>
                                <TableCell>{user.userSince}</TableCell>
                                <TableCell
                                    className={`font-semibold ${user.status === "admin"
                                        ? "text-red-600"
                                        : user.status === "subscribed"
                                            ? "text-green-600"
                                            : "text-blue-600"} `}
                                >
                                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TabsContent>



            <TabsContent value="admin">

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='font-semibold'>##</TableHead>
                            <TableHead className='font-semibold'>Name</TableHead>
                            <TableHead className='font-semibold'>Email</TableHead>
                            <TableHead className='font-semibold'>Grade</TableHead>
                            <TableHead className='font-semibold'>User Since</TableHead>
                            <TableHead className='font-semibold'>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className=''>
                        {AllUsers.filter(user => user.status === 'admin').map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell>{index + 1}.</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.grade}</TableCell>
                                <TableCell>{user.userSince}</TableCell>
                                <TableCell className='capitalize text-red-600 font-semibold'>{user.status}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>

            </TabsContent>
            <TabsContent value="subscribed">

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='font-semibold'>##</TableHead>
                            <TableHead className='font-semibold'>Name</TableHead>
                            <TableHead className='font-semibold'>Email</TableHead>
                            <TableHead className='font-semibold'>Grade</TableHead>
                            <TableHead className='font-semibold'>User Since</TableHead>
                            <TableHead className='font-semibold'>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className=''>
                        {AllUsers.filter(user => user.status === 'subscribed').map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell>{index + 1}.</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.grade}</TableCell>
                                <TableCell>{user.userSince}</TableCell>
                                <TableCell className='capitalize text-green-600 font-semibold'>{user.status}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>

            </TabsContent>
            <TabsContent value="user">

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='font-semibold'>##</TableHead>
                            <TableHead className='font-semibold'>Name</TableHead>
                            <TableHead className='font-semibold'>Email</TableHead>
                            <TableHead className='font-semibold'>Grade</TableHead>
                            <TableHead className='font-semibold'>User Since</TableHead>
                            <TableHead className='font-semibold'>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className=''>
                        {AllUsers.filter(user => user.status === 'user').map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell>{index + 1}.</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.grade}</TableCell>
                                <TableCell>{user.userSince}</TableCell>
                                <TableCell className='capitalize text-blue-600 font-semibold'>{user.status}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>

            </TabsContent>
        </Tabs>
    )
}


const AllUsers = [
    { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com", grade: "I", status: "subscribed", userSince: "15 Feb, 2023" },
    { id: 2, name: "Bob Smith", email: "bob.smith@example.com", grade: "II", status: "user", userSince: "03 Nov, 2022" },
    { id: 3, name: "Charlie Brown", email: "charlie.brown@example.com", grade: "III", status: "user", userSince: "21 Aug, 2021" },
    { id: 4, name: "Diana Prince", email: "diana.prince@example.com", grade: "IV", status: "user", userSince: "10 Jun, 2020" },
    { id: 5, name: "Ethan Clark", email: "ethan.clark@example.com", grade: "V", status: "subscribed", userSince: "30 Jan, 2023" },
    { id: 6, name: "Fiona Adams", email: "fiona.adams@example.com", grade: "I", status: "user", userSince: "12 Sep, 2022" },
    { id: 7, name: "George Miller", email: "george.miller@example.com", grade: "II", status: "user", userSince: "05 Dec, 2021" },
    { id: 8, name: "Hannah Scott", email: "hannah.scott@example.com", grade: "III", status: "subscribed", userSince: "18 Jul, 2022" },
    { id: 9, name: "Ian Walker", email: "ian.walker@example.com", grade: "IV", status: "user", userSince: "27 Mar, 2021" },
    { id: 10, name: "Julia Roberts", email: "julia.roberts@example.com", grade: "V", status: "subscribed", userSince: "01 May, 2023" },
    { id: 11, name: "Kevin Lee", email: "kevin.lee@example.com", grade: "I", status: "user", userSince: "14 Apr, 2022" },
    { id: 12, name: "Laura King", email: "laura.king@example.com", grade: "II", status: "admin", userSince: "22 Nov, 2020" }, // Only admin
    { id: 13, name: "Michael Young", email: "michael.young@example.com", grade: "III", status: "user", userSince: "09 Jul, 2021" },
    { id: 14, name: "Nina Green", email: "nina.green@example.com", grade: "IV", status: "subscribed", userSince: "28 Feb, 2022" },
    { id: 15, name: "Oliver Hall", email: "oliver.hall@example.com", grade: "V", status: "user", userSince: "16 Oct, 2021" },
    { id: 16, name: "Paula Allen", email: "paula.allen@example.com", grade: "I", status: "user", userSince: "05 Jan, 2020" },
    { id: 17, name: "Quentin Wright", email: "quentin.wright@example.com", grade: "II", status: "user", userSince: "08 Dec, 2022" },
    { id: 18, name: "Rachel Adams", email: "rachel.adams@example.com", grade: "III", status: "subscribed", userSince: "19 May, 2021" },
    { id: 19, name: "Steven Baker", email: "steven.baker@example.com", grade: "IV", status: "user", userSince: "23 Sep, 2021" },
    { id: 20, name: "Tina Morgan", email: "tina.morgan@example.com", grade: "V", status: "subscribed", userSince: "12 Mar, 2023" },
    { id: 21, name: "Uma Patel", email: "uma.patel@example.com", grade: "I", status: "user", userSince: "07 Jun, 2022" },
    { id: 22, name: "Victor Ross", email: "victor.ross@example.com", grade: "II", status: "user", userSince: "30 Jan, 2021" },
    { id: 23, name: "Wendy Scott", email: "wendy.scott@example.com", grade: "III", status: "user", userSince: "15 Aug, 2020" },
    { id: 24, name: "Xavier King", email: "xavier.king@example.com", grade: "IV", status: "subscribed", userSince: "20 Oct, 2022" },
];