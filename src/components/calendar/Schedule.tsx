import clsx from "clsx";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

interface ScheduleProps {
  title: string;
  startDate: string;
  endDate?: string;
  description: any;
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
}: ScheduleProps) {
  const { t } = useTranslation();
  return (
    <div className="flow-root mt-16">
      <div className="-my-4 divide-y divide-gray-700">
        <div className={clsx(description && "pb-10")}>
          <div className="flex flex-row items-center justify-between py-4 gap-6">
            <div className="flex items-center gap-6">
              <p className="sm:pl-10 text-lg font-normal text-gray-500 shrink-0">
                {format(new Date(startDate), "HH:mm")}
                {endDate && ` - ${format(new Date(endDate), "HH:mm")}`}
              </p>
              <h3 className="text-lg font-semibold text-primary">
                <button onClick={onClick} className="cursor-pointer">
                  {title}
                </button>
              </h3>
            </div>
            <button
              onClick={onClick}
              className="px-4 py-2 cursor-pointer bg-primary rounded-lg text-white"
            >
              {t("details")}
            </button>
          </div>
          {description}
        </div>
        {!isLast && <div></div>}
      </div>
    </div>
  );
}

export default Schedule;
