import React from 'react';
// import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

type HeroBoxProps = {
  heading: string;
  text: string;
  image: string;
  to: string;
};

const statsData = [
  { number: 120, label: 'კომპანია' },
  { number: 1200, label: 'დასაქმებული' },
  { number: 3521, label: 'მიიღეს რჩევა' },
  { number: 1178, label: 'ორგანიზაცია' },
  { number: 3010, label: 'მაძიებელი' },
];

const HeroBox: React.FC<HeroBoxProps> = ({ heading, text, image, to }) => (
  <div className="flex flex-col md:flex-row items-center bg-background rounded-lg shadow-md p-6 gap-6 w-full">
    <div className="flex flex-col gap-3 md:w-1/2 w-full">
      <p className="title font-bold text-primary">{heading}</p>
      <p className="plain-text text-gray-700">{text}</p>
      <Link to={to} className="w-full md:w-2/3">
        <button className="w-full bg-primary text-background rounded px-4 py-2 hover:bg-primary/90 transition">
          გაიგე მეტი
        </button>
      </Link>
    </div>
    <img src={image} alt={heading} className="md:w-1/2 md:h-auto h-[200px] w-full rounded-lg object-cover" />
  </div>
);

const MainPage: React.FC = () => {
  // const { t } = useTranslation();

  return (
    <div className="w-full py-8 lg:pb-0 lg:pt-4 space-y-8">
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
              {['https://picsum.photos/200/100', 'https://picsum.photos/200/100', 'https://picsum.photos/200/100'].map((img, idx) => (
                <SwiperSlide key={idx} className="w-full h-[350px] relative">
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
              heading={"ახალი ამბები"}
              text="შეგიძლიათ ნახოთ ახალი ამბები ჩვენს ვებ-გვერდზე, იყავით მუდამ საქმის კურსში!"
              image={'https://picsum.photos/200'}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <HeroBox
            to="/projects"
            heading={"პროექტები"}
            text="იხილეთ ჩვენი მიმდინარე და დასრულებული პროექტები, რომლებიც მიზნად ისახავს საზოგადოების განვითარებას."
            image={'https://picsum.photos/200'}
          />
          <HeroBox
            to="/calendar"
            heading={"კალენდარი"}
            text="იხილეთ ჩვენი ღონისძიებების კალენდარი, დაგეგმეთ თქვენი დრო და არ გამოტოვოთ მნიშვნელოვანი მოვლენები."
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
          {statsData.map(({ number, label }, index) => (
            <SwiperSlide key={index}>
              <div className="h-[200px] flex flex-col justify-center items-center bg-white">
                <h1 className="title">{number}</h1>
                <h3 className="text-center plain-text">{label}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MainPage;
