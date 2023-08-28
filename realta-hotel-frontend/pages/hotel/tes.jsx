import dynamic from "next/dynamic"
import "leaflet/dist/leaflet.css"

const Map = () => {
  const position = [51.505, -0.09]

  const MapContainer = dynamic(
    () => import("react-leaflet").then(module => module.MapContainer),
    {
      ssr: false,
    }
  )
  const TileLayer = dynamic(
    () => import("react-leaflet").then(module => module.TileLayer),
    {
      ssr: false,
    }
  )
  const Marker = dynamic(
    () => import("react-leaflet").then(module => module.Marker),
    {
      ssr: false,
    }
  )
  const Popup = dynamic(
    () => import("react-leaflet").then(module => module.Popup),
    {
      ssr: false,
    }
  )

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "100vh" }}
      onClick={event => {
        console.log(event.latlng) // Menampilkan latitude dan longitude pada konsol ketika pengguna melakukan klik pada map
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default function Home() {
  return (
    <div>
      <Map />
    </div>
  )
}
