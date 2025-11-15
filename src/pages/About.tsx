
import { useEffect } from "react";
import { useApiStore } from "../store/apiStore";
import Loader from "../components/Loader";

const About = () => {
  const { loading, about, members, fetchAbout, fetchMembers } = useApiStore();

  useEffect(() => {
    fetchAbout();
    fetchMembers();
  }, [fetchAbout, fetchMembers])

  const tabs = [
    {
      name: 'მოკლე ინფორმაცია', id: 0, elem: <div className="space-y-6 plain-text">
        <div dangerouslySetInnerHTML={{ __html: about?.content || "" }} />
      </div>
    },
    {
      name: 'გუნდი', id: 1,

      elem: <div className="flex flex-wrap pb-10 gap-6 justify-center" >


        {members.map((member, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg w-80 flex flex-col justify-between transition-shadow duration-300">
            <img src={member.image} alt={member.firstname} className="w-full h-60 object-cover object-center" />
            <div className="p-4 flex-1">
              <h3 className="title font-semibold text-primary">{member.firstname} {member.lastname}</h3>
              <span>{member.position}</span>
            </div>
          </div>
        ))}
      </div >
    }
  ]

  const activeTab = 0
  // const [activeTab, setActiveTab] = useState<number>(0);
  return (
    <div className="bg-background px-6 py-12 space-y-10 w-full h-full">
      {/* <div className="flex justify-center">
        <div className="flex gap-x-3">
          {tabs.map(tab => (
            <button onClick={() => setActiveTab(tab.id)} key={tab.id} className={clsx(
              "title border border-gray-200 rounded-md p-2 cursor-pointer hover:-translate-y-1", tab.id === activeTab ? "bg-primary text-white" : "bg-white text-primary")}>
              {tab.name}
            </button>
          ))}
        </div>
      </div> */}
      <div>
        {loading ? <Loader /> : tabs[activeTab].elem}
      </div>
    </div>
  );
};

export default About;