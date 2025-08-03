import clsx from "clsx";
import { useState } from "react";

const About = () => {
  const team = [
    { name: 'ნინო ბარამიძე' },
    { name: 'ნათია კაპანაძე' },
    { name: 'თეონა გელაშვილი' },
    { name: 'ნინო კობახიძე' }
  ]

  const tabs = [
    {
      name: 'მოკლე ინფორმაცია', id: 0, elem: <div className="space-y-6 plain-text"> <p>          კოალიცია დამოუკიდებელი ცხოვრებისათვის არის საზოგადოებრივი ორგანიზაცია, რომლის მისიაა ნებისმიერი ადამიანისთვის შეიქმნას თანაბარი პირობები პოტენციალის გამოსავლენად და მოხდეს შეზღუდული შესაძლებლობების მქონე პირების მაქსიმალური ჩართულობა საზოგადოებაში მიმდინარე პოლიტიკურ, ეკონომიკურ, სოციალურ და კულტურულ ცხოვრებაში.        </p><p>  ამისათვის, კოალიცია ცდილობს აამაღლოს საზოგადოების ცნობიერება და მასში დამკვიდრებული ტრადიციული მიდგომები შეზღუდული შესაძლებლობის მქონე პირებისადმი და შეზღუდული შესაძლებლობის მქონე ადამიანების მიმართ ჩაანაცვლოს თანამედროვე მიდგომებით, რაც გულისხმობს: შეიცვალოს საზოგადოების დამოკიდებულება, ფიზიკური გარემო, კანონმდებლობა და არა - შეზღუდული შესაძლებლობის მქონე ცალკეული ადამიანი</p><p>  <b>    კერძოდ, კოალიცია დამოუკიდებელი ცხოვრებისათვის ცდილობს იმ არასამთავრობო ორგანიზაციების მხარდაჭერას და ინსტიტუციურ განვითარებას, რომელთა საქმიანობაც მიმართულია შეზღუდული შესაძლებლობის მქონე პირთა თანაბარი სამოქალაქო უფლებებისა და შესაძლებლობების დაცვასა და მომსახურებაზე  </b></p><p>  კოალიცია საერთაშორისო ნორმებისა და კონვენციების დაყრდნობით, ეროვნულ დონეზე,  ხელს უწყობს კანონმდებლობისა და აღსრულების სახელმწიფო სისტემის სრულქმნას, აგრეთვე, ფიზიკურ გარემოში უნივერსალური დიზაინის დანერგვასა და დამოუკიდებელი ცხოვრების ფილოსოფიის პოპულარიზაციას  კოალიცია დამოუკიდებელი ცხოვრებისათვის აღიარებს თითოეული შეზღუდული შესაძლებლობების მქონე პირის დამოუკიდებელი და ღირსეული თანაცხოვრების უფლებას საზოგადოებაში</p></div>
    },
    {
      name: 'გუნდი', id: 1,

      elem: <div className="flex flex-wrap pb-10 gap-6 justify-center" >


        {team.map((member, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg w-80 flex flex-col justify-between transition-shadow duration-300">
            <img src={`https://picsum.photos/200`} alt={member.name} className="w-full h-60 object-cover object-top" />
            <div className="p-4 flex-1">
              <h3 className="title font-semibold text-primary">{member.name}</h3>
            </div>
          </div>
        ))}
      </div >
    }
  ]

  const [activeTab, setActiveTab] = useState<number>(0);
  return (
    <div className="bg-background px-6 py-12 space-y-10 w-full h-full">
      <nav className="flex justify-center">
        <ul className="flex gap-x-3">
          {tabs.map(tab => (
            <li onClick={() => setActiveTab(tab.id)} key={tab.id} className={clsx(
              "title border border-gray-200 rounded-md p-2 cursor-pointer hover:-translate-y-1", tab.id === activeTab ? "bg-primary text-white" : "bg-white text-primary")}>
              {tab.name}
            </li>
          ))}
        </ul>
      </nav>
      <div>
        {tabs[activeTab].elem}
      </div>
    </div>
  );
};

export default About;