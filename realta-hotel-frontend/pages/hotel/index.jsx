import React from "react"

import { useDispatch, useSelector } from "react-redux"
import {
  doRequestGetHotels,
  doRequestGetHotelsByName,
} from "../../redux/HOTELS/action/actionHotels"
import { Search, ThreeDots } from "@/components/icons/index"
import RatingStars from "@/functions/ratingStarsFunction"
import moment from "moment"
import ModalEditAdd from "../../components/hotel/hotels/ModalAddHotels"
import ModalEditEdit from "../../components/hotel/hotels/ModalEditHotels"
import Link from "next/link"
import { useRouter } from "next/router"
import ModalSwitchStatus from "../../components/hotel/SwitchSatusHotels"
import Addaddres from "../../components/hotel/hotels/Addaddres"

export default function Hotel() {
  const [showModalAdd, setShowModalAdd] = React.useState(false)
  const [showModalEdit, setShowModalEdit] = React.useState(false)
  const [showModalSwitchStatus, setShowModalSwitchStatus] =
    React.useState(false)
  const [hotelChoseEdit, setHotelChoseEdit] = React.useState("")
  const [search, setSearch] = React.useState("")
  const [options, setOptions] = React.useState(null)
  const menuOptions = React.useRef(null)

  let { hotels, status, totalPagination, refresh, page_size, total } =
    useSelector(state => state.hotelsReducers)
  const dispatch = useDispatch()
  const [showaAddAddress, setShowaAddAddress] = React.useState(false)
  const [paginationLocation, setPagination] = React.useState(1)

  const handleSearching = e => {
    const payload = {
      paginationLocation: paginationLocation,
      search: e.target.value,
    }
    setSearch(e.target.value)
    if (search.length > 2) {
      dispatch(doRequestGetHotelsByName(payload))
    } else {
      setPagination(1)
    }
  }

  const router = useRouter()

  console.log(search.length)
  React.useEffect(() => {
    if (search.length > 0) {
      const payload = {
        paginationLocation: paginationLocation,
        search,
      }

      dispatch(doRequestGetHotelsByName(payload))
    } else {
      dispatch(doRequestGetHotels(paginationLocation))
    }
  }, [paginationLocation, refresh, router.pathname])

  React.useEffect(() => {
    function handleClickOutsideOptionsMenu(event) {
      if (menuOptions.current && !menuOptions.current.contains(event.target)) {
        setOptions(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutsideOptionsMenu)

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideOptionsMenu)
    }
  }, [menuOptions])

  // React.useEffect(() => {}, [refresh])
  // console.log(totalPagination)
  return (
    <div className="container px-4 pt-10 ">
      {showModalAdd && (
        <ModalEditAdd
          setShowModalAdd={setShowModalAdd}
          setShowaAddAddress={setShowaAddAddress}
        />
      )}
      {showModalEdit && (
        <ModalEditEdit
          hotelChoseEdit={hotelChoseEdit}
          setShowModalEdit={setShowModalEdit}
        />
      )}
      {showModalSwitchStatus && (
        <ModalSwitchStatus
          hotelChoseEdit={hotelChoseEdit}
          setShowModalSwitchStatus={setShowModalSwitchStatus}
        />
      )}

      {showaAddAddress && <Addaddres setShowaAddAddress={setShowaAddAddress} />}

      <div className="header flex justify-between mb-5">
        <h2 className="text-2xl font-poppins-medium">Hotel</h2>
        <h5 className="text-textSecondary">
          Dashboard /{" "}
          <span className="text-textPurple font-poppins-semibold"> Hotel</span>{" "}
        </h5>
      </div>

      <div className="contain-search-add flex justify-between items-center">
        <div className="search max-w-fit">
          <div className="pt-2 relative mx-auto text-textSecondary">
            <form className="relative flex">
              <button
                type="button"
                className="absolute inset-y-0 left-0 flex items-center justify-center px-3"
                onClick={handleSearching}
              >
                <Search width="20" color={"text-textSecondary"} />
              </button>
              <input
                className="border-2 border-gray-300 bg-white h-10 px-3 pl-10 rounded-lg text-sm focus:outline-none flex-grow"
                type="search"
                name="search"
                placeholder="Search"
                onChange={e => {
                  handleSearching(e)
                }}
              />
            </form>
          </div>
        </div>
        <div className="add-container">
          <button
            className="bg-bgPrimary text-white px-6 py-2 rounded-lg"
            onClick={() => {
              setShowModalAdd(true)
            }}
          >
            + Add
          </button>
        </div>
      </div>
      <div className="info-data mt-5 mb-3">
        <p className="text-textGray">
          Showing 1 to {page_size} of {total ? total : "0"} Result
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-700 md:rounded-lg shadow">
        <table class="w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr className="border-t border-slate-200 text-textGray">
              <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 whitespace-nowrap">
                No
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 whitespace-nowrap">
                Hotel Name
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 whitespace-nowrap">
                Rating Star
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 whitespace-nowrap">
                Modified Date
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 whitespace-nowrap">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-gray-200 divide-y dark:divide-gray-700 dark:bg-gray-900">
            {status !== 400 &&
              hotels?.length > 0 &&
              hotels.map(hotel => (
                <tr className="hover:bg-gray-50 relative" key={hotel.hotel_id}>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                    {hotel.row_number}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                    <Link href={`/hotel/facility/${hotel.hotel_id}`}>
                      {hotel.hotel_name}
                    </Link>
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                    {<RatingStars count={hotel.hotel_rating_star} />}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                    {moment(hotel.hotel_modified_date).format("ll")}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap ">
                    <div onClick={() => setOptions(hotel.hotel_id)}>
                      <ThreeDots />
                    </div>
                  </td>

                  {options == hotel.hotel_id && (
                    <ul
                      ref={menuOptions}
                      className="text-sm text-start menu-options absolute z-10 shadow-lg border w-44 rounded-lg  right-8 top-5 bg-white"
                    >
                      <li
                        className="hover:bg-neutral-100 p-2 px-3 cursor-pointer"
                        onClick={() => {
                          setShowModalEdit(true)
                          setHotelChoseEdit(hotel.hotel_id)
                          setOptions(null)
                        }}
                      >
                        edit
                      </li>
                      <Link href={`/hotel/facility/${hotel.hotel_id}`}>
                        <li className="hover:bg-neutral-100 p-2 px-3 cursor-pointer">
                          Facility
                        </li>
                      </Link>
                      <li
                        className="hover:bg-neutral-100 p-2 px-3 cursor-pointer"
                        onClick={() => {
                          setShowModalSwitchStatus(true)
                          setHotelChoseEdit(hotel.hotel_id)
                          setOptions(null)
                        }}
                      >
                        Switch Status
                      </li>
                    </ul>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex items-center w-full justify-between border border-slate-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <a
              href="#"
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              href="#"
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </a>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md gap-1 shadow-sm"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  onClick={e => {
                    e.preventDefault()
                    paginationLocation > 1
                      ? setPagination(paginationLocation - 1)
                      : ""
                  }}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>

                {Array.from({ length: totalPagination }, (_, index) => {
                  const isActive = index + 1 == paginationLocation

                  const className = isActive
                    ? "relative rounded-sm z-10 inline-flex items-center border border-indigo-600 px-4 py-2 text-sm font-semibold text-textPurple focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    : "relative rounded-sm z-10 inline-flex items-center border  px-4 py-2 text-sm font-semibold text-textSecondary focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "

                  return (
                    <a
                      key={index}
                      href="#"
                      aria-current="page"
                      className={className}
                      onClick={() => setPagination(index + 1)}
                    >
                      {index + 1}
                    </a>
                  )
                })}

                <a
                  href="#"
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  onClick={e => {
                    e.preventDefault()
                    paginationLocation < totalPagination
                      ? setPagination(paginationLocation + 1)
                      : ""
                  }}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
