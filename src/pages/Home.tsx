import React from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';


import Image2 from '../assets/images/475298315_639262962106299_2393968445266418199_n.jpg'
import Image4 from '../assets/images/476835168_654603073661288_1960006179725840025_n.jpg'


type HeroBoxProps = {
  heading: string;
  text: string;
  image: string;
  to: string;
};

const statsData = [
  { number: 10, labelKey: 'home.stats.court_cases' },
  { number: 850, labelKey: 'home.stats.beneficiaries' },
  { number: 27, labelKey: 'home.stats.employed_women' },
  { number: 12, labelKey: 'home.stats.started_education' },
  { number: 13, labelKey: 'home.stats.completed_projects' },
];

const HeroBox: React.FC<HeroBoxProps> = ({ heading, text, image, to }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row items-center bg-background rounded-lg shadow-md p-6 gap-6 w-full ">
      <div className="flex flex-col gap-3 md:w-1/2 w-full">
        <p className="title font-bold text-primary">{heading}</p>
        <p className="plain-text text-gray-700">{text}</p>
        <Link to={to} className="w-full md:w-2/3">
          <button className="w-full bg-primary text-background rounded px-4 py-2 hover:bg-primary/90 transition">
            {t('learn_more')}
          </button>
        </Link>
      </div>
      <img src={image} alt={heading} className="md:w-1/2 md:h-auto h-[200px] w-full rounded-lg object-cover" />
    </div>
  );
};

const MainPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full py-8 lg:pb-0 lg:pt-4 space-y-8 bg-primary">
      <div className="flex flex-col gap-6 p-10">
        <div className='flex flex-col lg:flex-row gap-6'>
          <div className="lg:w-1/2 w-full ">
            <Swiper
              modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
              cssMode
              navigation
              pagination={{ clickable: true }}
              slidesPerView={1}
              spaceBetween={20}
              autoplay={{ delay: 5000 }}
              className="rounded-xl overflow-hidden"
            >
              {[Image2, Image4].map((img, idx) => (
                <SwiperSlide key={idx} className="w-full !h-[350px] relative">
                  <Link to={`/services/projects/${idx + 1}`}>
                    <img
                      src={img}
                      alt={`Slide ${idx + 1}`}
                      className="w-full h-full object-cover rounded-xl border-2 border-background"
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="lg:w-1/2 w-full">
            <HeroBox
              to="/news"
              heading={t('home.news_title')}
              text={t('home.news_text')}
              image={'https://picsum.photos/200'}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <HeroBox
            to="/projects"
            heading={t('projects')}
            text={t('home.projects_text')}
            image={'https://picsum.photos/200'}
          />
          <HeroBox
            to="/calendar"
            heading={t('calendar')}
            text={t('home.calendar_text')}
            image={'https://picsum.photos/200'}
          />
        </div>
      </div>


      <div className="w-full mt-12 bg-white">
        <Swiper
          modules={[Autoplay, Mousewheel, Keyboard]}
          cssMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          slidesPerView={4}
          spaceBetween={100}
          className="w-full"
          breakpoints={{
            1440: {
              slidesPerView: 4,
            },
            1000: {
              slidesPerView: 3,
            },
            500: {
              slidesPerView: 2,
            },
            300: {
              slidesPerView: 1,
            },
          }}
        >
          {statsData.map(({ number, labelKey }, index) => (
            <SwiperSlide key={index}>
              <div className="h-[200px] flex flex-col justify-center items-center bg-white">
                <h1 className="title">{number}</h1>
                <h3 className="text-center plain-text">{t(labelKey)}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MainPage;
