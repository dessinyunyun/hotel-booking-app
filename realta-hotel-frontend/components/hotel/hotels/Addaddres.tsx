import React from "react"
import {
  doRequestGetProvinces,
  doRequestGetCity,
  doRequestGetDistrict,
  doAddAddress,
} from "@/redux/HOTELS/action/actionAddAddress"
import { useDispatch, useSelector } from "react-redux"
function Addaddres(props: any) {
  const dispatch = useDispatch()

  let { provinces, locations } = useSelector(
    (state: any) => state.addAddressReducers
  )

  const FormRef = React.useRef(null)

  const textSearchRef = React.useRef<HTMLUListElement>(null)

  const [showProv, setShowProv] = React.useState(false)
  const [showCity, setshowCity] = React.useState(false)
  const [showDistrict, setshowDistrict] = React.useState(false)

  const [prov, setProv] = React.useState(provinces)
  const [city, setcity] = React.useState(locations)
  const [district, setdistrict] = React.useState(locations)
  const [getCityTrigger, setgetCityTrigger] = React.useState(false)
  const [getDistrictTrigger, setgetDistrictTrigger] = React.useState(false)

  const [location, setlocation] = React.useState({
    prov_name: "",
    prov_id: "",
    city_name: "",
    id_city: "",
    id_district: "",
    district_name: "",
  })

  const [newAddress, setNewAddress] = React.useState({
    addr_line1: "",
    addr_line2: "",
    addr_postal_code: "",
    addr_district_id: "",
  })

  console.log(location)
  console.log(locations)

  React.useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        textSearchRef.current &&
        !textSearchRef.current.contains(event.target)
      ) {
        setShowProv(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [textSearchRef, prov])

  React.useEffect(() => {
    dispatch(doRequestGetProvinces())
  }, [])

  React.useEffect(() => {
    console.log(location)
    dispatch(doRequestGetCity(location))
  }, [getCityTrigger])

  React.useEffect(() => {
    console.log(location)
    dispatch(doRequestGetCity(location))
  }, [getDistrictTrigger])

  React.useEffect(() => {
    console.log(location)
    dispatch(doRequestGetDistrict(location))
  }, [getDistrictTrigger])

  const handleLocation = (e: any) => {
    setlocation(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const handleProv = (pr: any) => {
    console.log(pr)
    setlocation((prev: any) => {
      return {
        ...prev,
        prov_id: pr.prov_id,
        prov_name: pr.prov_name,
      }
    })

    setgetCityTrigger(!getCityTrigger)
    setShowProv(false)
    console.log(location)
  }

  const handlecity = (ct: any) => {
    console.log(ct)
    setlocation((prev: any) => {
      return {
        ...prev,
        city_id: ct.id_city,
        city_name: ct.city_name,
      }
    })
    setgetDistrictTrigger(!getDistrictTrigger)
    setshowCity(false)
  }

  const handleDistrict = (dt: any) => {
    console.log(dt)
    setlocation((prev: any) => {
      return {
        ...prev,
        district_id: dt.id_district,
        district_name: dt.district_name,
      }
    })

    setNewAddress((prev: any) => {
      return {
        ...prev,
        addr_district_id: dt.id_district,
      }
    })

    setshowDistrict(false)
  }

  const searchProvince = (e: any) => {
    const prov = provinces.filter((item: any) =>
      item.prov_name.toLowerCase().includes(e.target.value.toLowerCase())
    )
    handleLocation(e)
    setProv(prov)
    setShowProv(true)
  }
  const searchCity = (e: any) => {
    const city = locations?.filter((item: any) =>
      item.city_name.toLowerCase().includes(e.target.value.toLowerCase())
    )
    handleLocation(e)
    setcity(city)
    setshowCity(true)
  }

  const searchDistrict = (e: any) => {
    const district = locations?.filter((item: any) =>
      item.district_name.toLowerCase().includes(e.target.value.toLowerCase())
    )
    handleLocation(e)
    setdistrict(district)
    setshowDistrict(true)
  }

  const handleNewAddress = (e: any) => {
    setNewAddress((prev: any) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const submitAddAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(doAddAddress(newAddress))
    props.setShowaAddAddress(false)
  }

  console.log(newAddress)

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-black/30  outline-none focus:outline-none">
        <div className="relative  my-6 mx-auto w-3/6">
          <form onSubmit={submitAddAddress} ref={FormRef}>
            {/*content*/}
            <div
              className={`border-0  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none`}
            >
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-xl font-bold">Add Address</h3>
              </div>
              {/*body*/}
              <div className="relative p-6 ">
                <div className="prov-city-district  mb-6 ">
                  <div className="primary w-full flex justify-between gap-1 items-start">
                    <div className="provinsi w-full">
                      <label
                        htmlFor="provinsi"
                        className="block text-sm font-semibold text-textPrimary dark:text-white"
                      >
                        Provinsi
                      </label>{" "}
                      <input
                        autoComplete="off"
                        className="h-12 px-3 shadow-sm focus:bg-white sm:text-sm resize-none bg-gray-50 border placeholder:italic placeholder:text-slate-400 border-gray-300 text-textPrimary text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bgPrimary  dark:focus:border-bgPrimary  focus:outline-none focus:border-bgPrimary  focus:ring-bgPrimary  focus:ring-1"
                        value={location.prov_name}
                        // ref={searchInputRef}
                        name="prov_name"
                        onChange={searchProvince}
                        placeholder="province ..."
                        id="provinsi"
                      />
                      {showProv && prov?.length > 0 && (
                        <div className="flex items-start absolute z-10">
                          <div className="space-x-1/6"></div>
                          <ul
                            ref={textSearchRef}
                            className="list mt-3 bg-white text-textPrimary rounded-md border w-full"
                          >
                            {prov.length > 0 &&
                              prov.map((pr: any) => (
                                <li
                                  key={pr.prov_id}
                                  className="py-2 px-5 text-sm hover:bg-bgPrimary/10 cursor-pointe cursor-pointer"
                                  onClick={() => handleProv(pr)}
                                >
                                  {pr.prov_name}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="city relative w-full">
                      <label
                        htmlFor="city"
                        className="block text-sm font-semibold text-textPrimary dark:text-white"
                      >
                        City
                      </label>{" "}
                      <input
                        autoComplete="off"
                        className={`h-12  px-3 shadow-sm focus:bg-white sm:text-sm resize-none bg-gray-50 border placeholder:italic placeholder:text-slate-400 border-gray-300 text-textPrimary text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bgPrimary  dark:focus:border-bgPrimary  focus:outline-none focus:border-bgPrimary  focus:ring-bgPrimary  focus:ring-1 
               ${
                 location.prov_id.length == 0 &&
                 " disabled:opacity-75 bg-bgPrimary/10"
               }
              `}
                        value={location.city_name}
                        // ref={searchInputRef}
                        name="city_name"
                        onChange={searchCity}
                        placeholder="City ..."
                        id="city"
                      />
                      {showCity && (
                        <div className="flex items-center absolute z-10">
                          <div className="space-x-1/6"></div>
                          <ul
                            ref={textSearchRef}
                            className="list mt-3 bg-white text-textPrimary rounded-md border w-full"
                          >
                            {city.length > 0 &&
                              city.map((pr: any) => (
                                <li
                                  key={pr.city_id}
                                  className="py-2 px-5 text-sm hover:bg-bgPrimary/10 cursor-pointe cursor-pointer"
                                  onClick={() => handlecity(pr)}
                                >
                                  {pr.city_name}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="district relative w-full">
                      <label
                        htmlFor="district"
                        className="block text-sm font-semibold text-textPrimary dark:text-white"
                      >
                        District
                      </label>{" "}
                      <input
                        autoComplete="off"
                        className={`h-12  px-3 shadow-sm focus:bg-white sm:text-sm resize-none bg-gray-50 border placeholder:italic placeholder:text-slate-400 border-gray-300 text-textPrimary text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bgPrimary  dark:focus:border-bgPrimary  focus:outline-none focus:border-bgPrimary  focus:ring-bgPrimary  focus:ring-1 
               ${
                 location.id_city.length == 0 &&
                 " disabled:opacity-75 bg-bgPrimary/10"
               }
              `}
                        value={location.district_name}
                        // ref={searchInputRef}
                        name="district_name"
                        onChange={searchDistrict}
                        placeholder="Kecamatan ..."
                        id="district"
                      />
                      {showDistrict && (
                        <div className="flex items-center absolute z-10">
                          <div className="space-x-1/6"></div>
                          <ul
                            ref={textSearchRef}
                            className="list mt-3 bg-white text-textPrimary rounded-md border w-full"
                          >
                            {district.length > 0 &&
                              district.map((pr: any) => (
                                <li
                                  key={pr.district_id}
                                  className="py-2 px-5 text-sm hover:bg-bgPrimary/10 cursor-pointe cursor-pointer"
                                  onClick={() => handleDistrict(pr)}
                                >
                                  {pr.district_name}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="street-gang-postal  mb-6 ">
                  <div className="primary w-full flex justify-between gap-1 items-start">
                    <div className="street w-full">
                      <label
                        htmlFor="addr_line1"
                        className="block text-sm font-semibold text-textPrimary dark:text-white"
                      >
                        Street, House Number
                      </label>{" "}
                      <input
                        autoComplete="off"
                        className="h-12 px-3 shadow-sm focus:bg-white sm:text-sm resize-none bg-gray-50 border placeholder:italic placeholder:text-slate-400 border-gray-300 text-textPrimary text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bgPrimary  dark:focus:border-bgPrimary  focus:outline-none focus:border-bgPrimary  focus:ring-bgPrimary  focus:ring-1"
                        value={newAddress.addr_line1}
                        // ref={searchInputRef}
                        name="addr_line1"
                        onChange={handleNewAddress}
                        placeholder="exp: Jl. Patimura No xx"
                        id="addr_line1"
                      />
                    </div>
                    <div className="gang relative w-full">
                      <label
                        htmlFor="addr_line2"
                        className="block text-sm font-semibold text-textPrimary dark:text-white"
                      >
                        other details
                      </label>{" "}
                      <input
                        autoComplete="off"
                        className={`h-12  px-3 shadow-sm focus:bg-white sm:text-sm resize-none bg-gray-50 border placeholder:italic placeholder:text-slate-400 border-gray-300 text-textPrimary text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bgPrimary  dark:focus:border-bgPrimary  focus:outline-none focus:border-bgPrimary  focus:ring-bgPrimary  focus:ring-1 
               ${
                 location.prov_id.length == 0 &&
                 " disabled:opacity-75 bg-bgPrimary/10"
               }
              `}
                        value={newAddress.addr_line2}
                        // ref={searchInputRef}
                        name="addr_line2"
                        onChange={handleNewAddress}
                        placeholder="exp: Gang anggrek ..."
                        id="addr_line2"
                      />
                    </div>
                    <div className="addr_postal_code relative w-full">
                      <label
                        htmlFor="addr_postal_code"
                        className="block text-sm font-semibold text-textPrimary dark:text-white"
                      >
                        Postal Code
                      </label>{" "}
                      <input
                        autoComplete="off"
                        className={`h-12  px-3 shadow-sm focus:bg-white sm:text-sm resize-none bg-gray-50 border placeholder:italic placeholder:text-slate-400 border-gray-300 text-textPrimary text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bgPrimary  dark:focus:border-bgPrimary  focus:outline-none focus:border-bgPrimary  focus:ring-bgPrimary  focus:ring-1 
               ${
                 location.id_city.length == 0 &&
                 " disabled:opacity-75 bg-bgPrimary/10"
               }
              `}
                        value={newAddress.addr_postal_code}
                        // ref={searchInputRef}
                        name="addr_postal_code"
                        onChange={handleNewAddress}
                        placeholder="exp: 93114 ..."
                        id="addr_postal_code"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-normal uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => props.setShowaAddAddress(false)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className=" bg-bgPrimary/80   hover:bg-bgPrimary text-white active:bg-emerald-600 font-normal rounded-xl uppercase text-sm px-5 py-3  shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Add Address
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Addaddres
