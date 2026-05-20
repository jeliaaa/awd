import { useTranslation } from "react-i18next";

function Donation() {
    const { t } = useTranslation();

    return (
        <div>
            {t('donate')}
        </div>
    )
}

export default Donation
