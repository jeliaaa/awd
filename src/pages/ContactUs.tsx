import { useEffect, useState, type FormEvent } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useTranslation } from "react-i18next";
import "leaflet/dist/leaflet.css";
import { useApiStore } from "../store/apiStore";

const ContactUs = () => {
    const { t } = useTranslation();
    const { sendEmail, resMessage, fetchContactInfo, contactInfo } = useApiStore();

    // State for form values
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchContactInfo();
    }, [fetchContactInfo]);

    // Gather values and handle submit
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        sendEmail(name, email, message).then(() => alert(resMessage)).catch(() => alert("დაფიქსირდა შეცდომა"));
        setName("");
        setEmail("");
        setMessage("");
    };

    // Safely parse coordinates (fallback to Batumi if missing/invalid)
    const latitude = contactInfo?.location?.latitude
        ? parseFloat(contactInfo.location.latitude)
        : 41.6434;
    const longitude = contactInfo?.location?.longitude
        ? parseFloat(contactInfo.location.longitude)
        : 41.6367;

    return (
        <div className="flex flex-col items-center p-4 md:p-16 w-full">
            {/* Form and Info */}
            <div className="w-full px-15 grid md:grid-cols-2 gap-6 bg-white py-6 rounded-xl shadow-md">
                {/* Contact Form */}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder={t("form.name")}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-3 border rounded-md"
                    />
                    <input
                        type="email"
                        placeholder={t("form.email")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 border rounded-md"
                    />
                    <textarea
                        placeholder={t("form.message")}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="p-3 border rounded-md resize-none"
                    />
                    <button
                        type="submit"
                        className="bg-primary/90 cursor-pointer text-white py-2 px-4 rounded hover:bg-primary"
                    >
                        {t("form.send")}
                    </button>
                </form>

                {/* Contact Information */}
                <div className="flex flex-col justify-center gap-4">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 underline">
                            {t("info.email")}
                        </h2>
                        <p className="text-gray-600">{contactInfo?.email}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 underline">
                            {t("info.phone")}
                        </h2>
                        <p className="text-gray-600">{contactInfo?.phone}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 underline">
                            {t("info.address")}
                        </h2>
                        <p className="text-gray-600">{contactInfo?.location?.name}</p>
                    </div>
                </div>
            </div>

            {/* Map */}
            <div className="w-full mt-8 h-64 md:h-96 rounded-xl z-2 overflow-hidden">
                <MapContainer
                    center={[latitude, longitude]}
                    zoom={15}
                    scrollWheelZoom={false}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[latitude, longitude]}>
                        <Popup>{t("popup")}</Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default ContactUs;
