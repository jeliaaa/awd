import React from "react";
import { useTranslation } from "react-i18next";

// Replace with the real embed URL from:
// Google Calendar → Settings → (calendar) → Integrate calendar → Embed code (iframe src)
const GOOGLE_CALENDAR_EMBED_URL =
  "https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID%40group.calendar.google.com&ctz=Asia%2FTbilisi";

const GoogleCalendar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full p-4 mb-10">
      <h2 className="title mb-6">{t("google_calendar")}</h2>
      <div className="w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <iframe
          src={GOOGLE_CALENDAR_EMBED_URL}
          title="Google Calendar"
          className="w-full"
          style={{ height: "700px", border: 0 }}
          frameBorder="0"
          scrolling="no"
        />
      </div>
    </div>
  );
};

export default GoogleCalendar;
