/*
 *   File: team.tsx 
 *
 *   Purpose: displays our team members
 *
 */ 

import '../style.css'

export default function Team() {

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our leadership</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">Meet our dedicated team of leaders who drive our company forward with passion, expertise, and vision. With a diverse range of backgrounds and experiences, our leadership brings a wealth of knowledge and innovation to guide our organization towards success. From strategic planning to operational excellence, each member of our leadership team is committed to fostering a culture of collaboration, integrity, and growth. Get to know the faces behind our company and discover the driving force behind our continued achievement.</p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          <li>
            <div className="flex items-center gap-x-6">
              <img className="h-16 w-16 rounded-full" src="https://ih1.redbubble.net/image.4005397076.9499/flat,750x,075,f-pad,750x1000,f8f8f8.jpg" alt="" />
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">Valentino Abram</h3>
                <p className="text-sm font-semibold leading-6 text-indigo-600">Co-Founder / CEO</p>
              </div>
            </div>

            <div className="flex items-center gap-x-6">
              <img className="h-16 w-16 rounded-full" src="https://ih1.redbubble.net/image.4005397076.9499/flat,750x,075,f-pad,750x1000,f8f8f8.jpg" alt="" />
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">Archuser 2341</h3>
                <p className="text-sm font-semibold leading-6 text-indigo-600">Co-Founder / CEO</p>
              </div>
            </div>
            
            <div className="flex items-center gap-x-6">
              <img className="h-16 w-16 rounded-full" src="https://ih1.redbubble.net/image.4005397076.9499/flat,750x,075,f-pad,750x1000,f8f8f8.jpg" alt="" />
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">Chat-GPT</h3>
                <p className="text-sm font-semibold leading-6 text-indigo-600">Tech Lead</p>
              </div>
            </div>

          </li>

        </ul>
      </div>
    </div>
  );

}
