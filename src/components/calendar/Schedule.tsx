import clsx from "clsx";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

interface ScheduleProps {
  title: string;
  startDate: string;
  endDate?: string;
  description: string | undefined;
  color: string | undefined;
  isLast?: boolean;
  onClick: () => void;
}

function Schedule({
  title,
  startDate,
  endDate,
  description,
  isLast,
  onClick,
  color
}: ScheduleProps) {
  const { t } = useTranslation();
  return (
    <div className="flow-root mt-16">
      <div className="-my-4 divide-y divide-gray-700">
        <div className={clsx(description && "pb-10")}>
          <div className="flex flex-row flex-wrap items-center justify-between py-4 gap-6">
            <div className="flex flex-wrap items-center gap-6">
              <p className="sm:pl-10 text-lg font-normal shrink-0" style={{color:`${color}`}}>
                {format(new Date(startDate), "yyyy-MM-dd")}
                {endDate && ` >  ${format(new Date(endDate), "yyyy-MM-dd")}`}
              </p>
              <h3 className={`text-lg font-semibold`} style={{color:`${color}`}}>
                <button onClick={onClick} className="cursor-pointer">
                  {title}
                </button>
              </h3>
            </div>
            <button
              onClick={onClick}
              style={{backgroundColor:`${color}`}}
              className="px-4 py-2 cursor-pointer rounded-lg text-white"
            >
              {t("details")}
            </button>
          </div>
          {description && description}
        </div>
        {!isLast && <div></div>}
      </div>
    </div>
  );
}

export default Schedule;
