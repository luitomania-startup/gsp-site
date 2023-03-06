import { Column } from "react-table";
interface UserDetails {
    id: string;
    constituency: string;
    candidateName: string;
    phone: string;
    symbol: string;
    photo: string;
  }
export let COLUMNS : Column<UserDetails>[]= [
    {
        Header:"id",
        accessor:"id" as keyof UserDetails
    },
    {
        Header:"Constituency",
        accessor:"constituency"  as keyof UserDetails
    },
    {
        Header:"CandidateName",
        accessor:"candidateName"  as keyof UserDetails
    },
    {
        Header:"Phone",
        accessor:"phone"  as keyof UserDetails
    },
    {
        Header:"Symbol",
        accessor:"symbol"  as keyof UserDetails,
        Cell: (tableProps:any) => (
            <div><img src={tableProps.row.original.symbol} />{tableProps.row.original.PlayerName}</div>
          )
    },
    {
        Header:"Photo", 
        accessor:"photo"  as keyof UserDetails,
        Cell: (tableProps:any) => (
            <div><img src={tableProps.row.original.photo} />{tableProps.row.original.PlayerName}</div>
          )
    },
]