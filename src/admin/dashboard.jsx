import React, { useEffect, useState, useMemo } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { CgSpinner } from "react-icons/cg";
import { db } from "../lib/firebase";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

const customStyles = {
  rows: { style: { minHeight: "55px" } },
  headCells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      backgroundColor: "#B22222",
      color: "white",
      fontSize: "15px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      borderRight: "1px solid #eaeaea",
    },
  },
};

const Export = ({ onExport }) => (
  <button
    className="bg-green-600 text-white rounded px-5 py-1.5 text-sm"
    onClick={onExport}
  >
    Export to Excel
  </button>
);

function Dashboard() {
  const [active, setActive] = useState(true);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const handleActive = () => setActive(!active);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const q = query(collection(db, "leads"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const list = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(list);
        setFilteredData(list);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
    };
    fetchData();
  }, []);

  const downloadExcel = () => {
    const formatted = filteredData.map((row, index) => ({
      ID: index + 1,
      Name: row.name,
      Email: row.email,
      Phone: row.mobile,
      Model: row.model,
      Timestamp: formatTimestamp(row.timestamp),
    }));
    const worksheet = XLSX.utils.json_to_sheet(formatted);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Bharathyundai-leads.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const actionsMemo = useMemo(
    () => <Export onExport={downloadExcel} />,
    [filteredData]
  );

  const columns = [
    {
      name: "ID",
      selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
      width: "70px",
    },
    { name: "Name", selector: (row) => row.name },
    { name: "Email", selector: (row) => row.email },
    { name: "Phone", selector: (row) => row.mobile },
    { name: "Model", selector: (row) => row.model },
    {
      name: "Timestamp",
      selector: (row) => formatTimestamp(row.timestamp),
      sortable: true,
    },
  ];

  function formatTimestamp(timestamp) {
    if (!timestamp?.seconds) return "Invalid date";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("en-CA"); // YYYY-MM-DD
  }

  useEffect(() => {
    const result = data.filter((item) => {
      const ts = item.timestamp?.seconds;
      if (!ts) return false;
      const itemDate = new Date(ts * 1000);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      return (
        (!from || itemDate >= from) &&
        (!to || itemDate <= to) &&
        (item.name?.toLowerCase().includes(search.toLowerCase()) ||
          item.email?.toLowerCase().includes(search.toLowerCase()) ||
          item.mobile?.toLowerCase().includes(search.toLowerCase()))
      );
    });
    setFilteredData(result);
  }, [search, fromDate, toDate, data]);

  return (
    <div className="flex flex-row h-screen">
      <Sidebar active={active} />
      <div className="flex-auto overflow-auto bg-gray-50">
        <Navbar handleActive={handleActive} />
        <div className="mx-5 mt-5">
          {loading ? (
            <div className="text-center">
              <CgSpinner
                className="flex mx-auto animate-spin"
                size={50}
                color="#7e22ce"
              />
            </div>
          ) : (
            <DataTable
              title="All Leads"
              columns={columns}
              data={filteredData}
              pagination
              paginationPerPage={rowsPerPage}
              onChangePage={(page) => setCurrentPage(page)}
              selectableRows
              selectableRowsHighlight
              fixedHeader
              fixedHeaderScrollHeight="100vh"
              customStyles={customStyles}
              highlightOnHover
              subHeader
              actions={actionsMemo}
              subHeaderComponent={
                <div className="flex flex-col items-center gap-4 mb-3 sm:flex-row">
                  <SearchComponent search={search} setSearch={setSearch} />
                  <DateRangeFilter
                    fromDate={fromDate}
                    toDate={toDate}
                    setFromDate={setFromDate}
                    setToDate={setToDate}
                  />
                </div>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

const SearchComponent = ({ search, setSearch }) => (
  <input
    className="px-4 py-2 border-2 rounded focus:outline-none"
    type="text"
    placeholder="Search by name, phone or email"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
);

const DateRangeFilter = ({ fromDate, toDate, setFromDate, setToDate }) => (
  <div className="flex items-center gap-3">
    <div>
      <label className="mr-2 text-sm">From:</label>
      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        className="px-2 py-1 border-2 rounded"
      />
    </div>
    <div>
      <label className="mr-2 text-sm">To:</label>
      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        className="px-2 py-1 border-2 rounded"
      />
    </div>
  </div>
);

export default Dashboard;
