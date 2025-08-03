import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ContactUs = () => {
    // useEffect(() => {
    //     // Fix marker icon issue with Leaflet
    //     delete L.Icon.Default.prototype._getIconUrl;
    //     L.Icon.Default.mergeOptions({
    //         iconRetinaUrl:
    //             "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    //         iconUrl:
    //             "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    //         shadowUrl:
    //             "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    //     });
    // }, []);

    return (
        <div className="flex flex-col items-center p-4 md:p-16 w-full">
            {/* Header */}
            <div className="w-full text-center py-6">
                <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
            </div>

            {/* Form and Info */}
            <div className="w-full px-15 grid md:grid-cols-2 gap-6 bg-white py-6 rounded-xl shadow-md">
                {/* Contact Form */}
                <form className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="p-3 border rounded-md"
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="p-3 border rounded-md"
                    />
                    <textarea
                        placeholder="Your Message"
                        className="p-3 border rounded-md resize-none"
                    />
                    <button className="bg-primary/90 cursor-pointer text-white py-2 px-4 rounded hover:bg-primary">
                        Send Message
                    </button>
                </form>

                {/* Contact Information */}
                <div className="flex flex-col justify-center gap-4">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 underline">Email</h2>
                        <p className="text-gray-600">contact@example.com</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 underline">Phone</h2>
                        <p className="text-gray-600">+1 (123) 456-7890</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 underline">Address</h2>
                        <p className="text-gray-600">123 Main Street, Your City, Country</p>
                    </div>
                </div>
            </div>

            {/* Map */}
            <div className="w-full mt-8 h-64 md:h-96 rounded-xl z-2 overflow-hidden">
                <MapContainer
                    center={[41.6434, 41.6367]} // Example: Batumi
                    zoom={15}
                    scrollWheelZoom={false}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[41.6434, 41.6367]}>
                        <Popup>We are here!</Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default ContactUs;
